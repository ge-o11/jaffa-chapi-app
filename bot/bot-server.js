'use strict';
const path    = require('path');
const fs      = require('fs');
const QRCode  = require('qrcode');
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const ws      = require('ws');
const { generateCoupon } = require('./coupon');
const { welcomeMessage, returningMemberMessage, farewellMessage } = require('./messages');

const CONFIG_PATH = path.join(__dirname, 'config.json');
const SESSION_DIR = path.join(__dirname, '.wwebjs_auth');

function loadConfig() {
    try { return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8')); }
    catch { return {}; }
}
function saveConfig(data) {
    const current = loadConfig();
    fs.writeFileSync(CONFIG_PATH, JSON.stringify({ ...current, ...data }, null, 2), 'utf8');
}

let cfg = loadConfig();
let selectedGroup    = cfg.selectedGroup || null;
const appUrl         = cfg.appUrl || 'https://jaffa-chapi.co.il';
const CREDITS_JOIN   = cfg.creditsOnJoin || 10;
const CREDITS_PER_DAY = cfg.creditsPerDay || 1;

// ── Supabase ──────────────────────────────────────────────────────────────────
// Replace with your own Supabase project credentials
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'YOUR_ANON_KEY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { realtime: { transport: ws } });

// ── HTTP server for QR display ────────────────────────────────────────────────
const app  = express();
let qrDataUrl = null;
let botStatus = 'initializing';

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="UTF-8"><title>חפ"י — בוט ניהול קהילה</title>
<style>body{font-family:Arial,sans-serif;background:#0D1B2A;color:#E8D5A3;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;margin:0;text-align:center;}
h1{color:#C8A96E;} img{border:4px solid #C8A96E;border-radius:16px;padding:12px;background:#fff;}</style>
</head>
<body>
<h1>🏛️ חפ"י — בוט קהילת יפו העתיקה</h1>
<p>סטטוס: <strong>${botStatus}</strong></p>
${qrDataUrl ? `<p>סרוק את קוד ה-QR בוואצ'אפ:</p><img src="${qrDataUrl}" width="260" />` : '<p>ממתין לחיבור...</p>'}
<p style="opacity:.5;font-size:12px;margin-top:30px">${appUrl}</p>
</body></html>`);
});

app.listen(3100, () => log('HTTP admin panel: http://localhost:3100'));

// ── Logging ───────────────────────────────────────────────────────────────────
function log(msg) { console.log(`[JAFFA-BOT] ${new Date().toLocaleTimeString('he-IL')} ${msg}`); }

// ── Credit calculation ────────────────────────────────────────────────────────
function calcCredits(dateJoined) {
    if (!dateJoined) return CREDITS_JOIN;
    const joined = new Date(dateJoined);
    const now    = new Date();
    const days   = Math.floor((now - joined) / (1000 * 60 * 60 * 24));
    return CREDITS_JOIN + (days * CREDITS_PER_DAY);
}

// ── Supabase helpers ──────────────────────────────────────────────────────────
async function getMember(phone) {
    const { data } = await supabase.from('jaffa_members').select('*').eq('phone', phone).single();
    return data;
}

async function upsertMember(data) {
    const { error } = await supabase.from('jaffa_members').upsert(data, { onConflict: 'phone' });
    if (error) log(`Supabase upsert error: ${error.message}`);
}

async function updateMember(phone, data) {
    const { error } = await supabase.from('jaffa_members').update(data).eq('phone', phone);
    if (error) log(`Supabase update error: ${error.message}`);
}

// ── WhatsApp client ───────────────────────────────────────────────────────────
let waClient = null;
const processedIds = new Set();
let isInitializing = false;
let lastDisconnect = 0;

function clearSession() {
    try {
        if (fs.existsSync(SESSION_DIR)) fs.rmSync(SESSION_DIR, { recursive: true, force: true });
        log('Session cleared');
    } catch (e) { log(`Clear session error: ${e.message}`); }
}

async function destroyClient() {
    if (!waClient) return;
    const c = waClient;
    waClient = null;
    let pid = null;
    try { pid = c.pupBrowser?.process()?.pid || null; } catch (_) {}
    try { await c.destroy(); } catch (_) {}
    if (pid) { try { process.kill(pid, 'SIGKILL'); } catch (_) {} }
    await new Promise(r => setTimeout(r, 2000));
}

function initWhatsApp() {
    if (isInitializing) return;
    isInitializing = true;
    botStatus = 'initializing';

    const { Client, LocalAuth } = require('whatsapp-web.js');
    const puppeteer = require('puppeteer');

    log('Initializing WhatsApp...');

    waClient = new Client({
        authStrategy: new LocalAuth({ clientId: 'jaffa-bot', dataPath: SESSION_DIR }),
        puppeteer: {
            executablePath: puppeteer.executablePath(),
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--no-first-run', '--disable-extensions', '--no-zygote'],
        },
    });

    let readyTimer = null;

    waClient.on('qr', async qr => {
        log('QR code received');
        botStatus = 'qr';
        qrDataUrl = await QRCode.toDataURL(qr, { width: 260, margin: 2 }).catch(() => null);
        log('Open http://localhost:3100 to scan QR');
    });

    waClient.on('loading_screen', pct => { log(`Loading: ${pct}%`); botStatus = `loading_${pct}`; });

    waClient.on('authenticated', () => {
        log('Authenticated ✓');
        botStatus = 'authenticated';
        if (!readyTimer) {
            readyTimer = setTimeout(async () => {
                log('Ready not received — resetting...');
                isInitializing = false;
                await destroyClient(); clearSession();
                setTimeout(initWhatsApp, 3000);
            }, 45000);
        }
    });

    waClient.on('auth_failure', async msg => {
        clearTimeout(readyTimer);
        log(`Auth failure: ${msg}`);
        botStatus = 'auth_failure';
        isInitializing = false;
        await destroyClient(); clearSession();
        setTimeout(initWhatsApp, 3000);
    });

    waClient.on('ready', () => {
        clearTimeout(readyTimer);
        isInitializing = false;
        botStatus = 'ready';
        qrDataUrl = null;
        log(`Ready! Connected as +${waClient.info.wid.user}`);
        if (!selectedGroup) log('⚠️  No group selected — set selectedGroup in config.json');
    });

    waClient.on('disconnected', async reason => {
        clearTimeout(readyTimer);
        log(`Disconnected: ${reason}`);
        botStatus = 'disconnected';
        isInitializing = false;
        const now = Date.now();
        const since = now - lastDisconnect;
        lastDisconnect = now;
        await destroyClient();
        const delay = since < 15000 ? 15000 : 5000;
        log(`Reconnecting in ${delay / 1000}s...`);
        setTimeout(initWhatsApp, delay);
    });

    const JOIN_SUBTYPES  = ['add', 'invite', 'linked_group_join'];
    const LEAVE_SUBTYPES = ['remove', 'leave', 'linked_group_leave'];

    waClient.on('group_join', async notification => {
        const groupId = notification.id.remote;
        if (selectedGroup && groupId !== selectedGroup.id) return;
        const notifId = notification.id._serialized || `join-${Date.now()}`;
        let userIds = notification.recipientIds || [];
        if (!userIds.length) {
            try { userIds = (await notification.getRecipients()).map(c => c.id._serialized); } catch (_) {}
        }
        if (userIds.length) await handleJoin(notifId, groupId, userIds);
    });

    waClient.on('group_leave', async notification => {
        const groupId = notification.id.remote;
        if (selectedGroup && groupId !== selectedGroup.id) return;
        const notifId = notification.id._serialized || `leave-${Date.now()}`;
        let userIds = notification.recipientIds || [];
        if (!userIds.length) {
            try { userIds = (await notification.getRecipients()).map(c => c.id._serialized); } catch (_) {}
        }
        await handleLeave(notifId, groupId, userIds);
    });

    waClient.on('message', async msg => {
        if (msg.type !== 'gp2') return;
        const groupId = msg.id?.remote || msg.from;
        if (selectedGroup && groupId !== selectedGroup.id) return;
        const notifId = msg.id?._serialized || `gp2-${Date.now()}`;
        if (JOIN_SUBTYPES.includes(msg.subtype)) {
            const ids = msg.recipients?.length ? msg.recipients : (msg.author ? [msg.author] : []);
            if (ids.length) await handleJoin(notifId, groupId, ids);
        }
        if (LEAVE_SUBTYPES.includes(msg.subtype)) {
            await handleLeave(notifId, groupId, msg.recipients || (msg.author ? [msg.author] : []));
        }
    });

    waClient.initialize().catch(async err => {
        log(`Initialize error: ${err.message}`);
        isInitializing = false;
        await destroyClient();
        setTimeout(initWhatsApp, 3000);
    });
}

// ── Phone helpers ─────────────────────────────────────────────────────────────
function formatPhone(raw) {
    const d = (raw || '').replace(/\D/g, '');
    if (d.startsWith('972') && d.length >= 11) return '0' + d.slice(3);
    if (d.startsWith('0') && d.length >= 9) return d;
    if (!d.startsWith('0') && d.length === 9) return '0' + d;
    return d;
}

async function resolvePhone(userId) {
    if (userId.endsWith('@c.us')) {
        return { phone: formatPhone(userId.replace('@c.us', '')), sendId: userId };
    }
    if (userId.endsWith('@lid')) {
        for (let i = 1; i <= 3; i++) {
            try {
                const contact = await waClient.getContactById(userId);
                const num = contact.number || contact.id?.user;
                if (num) return { phone: formatPhone(num), sendId: contact.id?._serialized || userId };
            } catch (_) {}
            if (i < 3) await new Promise(r => setTimeout(r, 2000));
        }
    }
    return { phone: `lid_${userId.split('@')[0]}`, sendId: userId };
}

// ── Join handler ──────────────────────────────────────────────────────────────
async function handleJoin(notifId, groupId, userIds) {
    if (processedIds.has(notifId)) return;
    processedIds.add(notifId);
    setTimeout(() => processedIds.delete(notifId), 15000);

    for (const userId of userIds) {
        try {
            const { phone, sendId } = await resolvePhone(userId);
            log(`JOIN: ${phone}`);

            const now     = new Date();
            const dateStr = now.toISOString().split('T')[0];
            const timeStr = now.toTimeString().split(' ')[0];

            const existing = await getMember(phone);

            if (existing && !existing.is_active) {
                // Returning member — reactivate
                const credits = calcCredits(existing.date_joined);
                await updateMember(phone, {
                    is_active: true,
                    rejoin_date: dateStr,
                    credits_frozen: null,
                });
                const msg = returningMemberMessage(existing.name, credits);
                await sendMessage(sendId, msg);
                log(`Returning member reactivated: ${phone} | credits: ${credits}`);
            } else if (!existing) {
                // New member
                const coupon = generateCoupon();
                let name = null;
                try { const c = await waClient.getContactById(sendId); name = c.pushname || null; } catch (_) {}
                await upsertMember({
                    phone,
                    name,
                    coupon,
                    is_active: true,
                    date_joined: dateStr,
                    time_joined: timeStr,
                    joined_at: now.toISOString(),
                    credits_initial: CREDITS_JOIN,
                });
                const msg = welcomeMessage(name, coupon, CREDITS_JOIN);
                await sendMessage(sendId, msg);
                log(`New member: ${phone} | coupon: ${coupon}`);
            } else {
                log(`Already active member: ${phone} — skipping`);
            }
        } catch (e) {
            log(`handleJoin error for ${userId}: ${e.message}`);
        }
    }
}

// ── Leave handler ─────────────────────────────────────────────────────────────
async function handleLeave(notifId, groupId, userIds) {
    if (!Array.isArray(userIds) || !userIds.length) return;
    if (processedIds.has(notifId)) return;
    processedIds.add(notifId);
    setTimeout(() => processedIds.delete(notifId), 15000);

    for (const userId of userIds) {
        try {
            const { phone, sendId } = await resolvePhone(userId);
            log(`LEAVE: ${phone}`);

            const member = await getMember(phone);
            if (!member || !member.is_active) continue;

            const credits = calcCredits(member.date_joined);
            const now = new Date();
            await updateMember(phone, {
                is_active: false,
                left_date: now.toISOString().split('T')[0],
                left_at: now.toISOString(),
                credits_frozen: credits,
            });

            const msg = farewellMessage(member.name, credits);
            await sendMessage(sendId, msg);
            log(`Member left: ${phone} | credits frozen: ${credits}`);
        } catch (e) {
            log(`handleLeave error for ${userId}: ${e.message}`);
        }
    }
}

// ── Send message ──────────────────────────────────────────────────────────────
async function sendMessage(sendId, text) {
    if (!waClient) return;
    try {
        await waClient.sendMessage(sendId, text);
        log(`Message sent to ${sendId}`);
    } catch (e) {
        log(`Send error to ${sendId}: ${e.message}`);
    }
}

// ── Start ─────────────────────────────────────────────────────────────────────
log('Starting Jaffa CHAPI WhatsApp Bot...');
log(`App URL: ${appUrl}`);
log(`Credits on join: ${CREDITS_JOIN} | Credits per day: ${CREDITS_PER_DAY}`);
initWhatsApp();
