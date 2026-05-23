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

// ── Supabase (optional — bot works without it) ────────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';
const HAS_SUPABASE = SUPABASE_URL.startsWith('https://') && SUPABASE_KEY.startsWith('eyJ');

const supabase = HAS_SUPABASE
    ? createClient(SUPABASE_URL, SUPABASE_KEY, { realtime: { transport: ws } })
    : null;

if (!HAS_SUPABASE) {
    console.log('[JAFFA-BOT] ⚠️  Supabase not configured — running in stateless mode (no member persistence)');
}

// ── HTTP server for QR display ────────────────────────────────────────────────
const app  = express();
let qrDataUrl = null;
let botStatus = 'initializing';
let connectedPhone = null;
let groupsList = [];
const activityLog = [];
function pushActivity(text) {
    activityLog.unshift({ time: new Date().toLocaleTimeString('he-IL'), text });
    if (activityLog.length > 20) activityLog.pop();
}

app.get('/status', (req, res) => {
    res.json({
        status: botStatus,
        qr: qrDataUrl,
        phone: connectedPhone,
        groups: groupsList,
        selectedGroup,
        activity: activityLog,
        appUrl,
    });
});

app.get('/select-group/:id', async (req, res) => {
    const group = groupsList.find(g => g.id === req.params.id);
    if (!group) return res.status(404).send('Group not found');
    selectedGroup = group;
    saveConfig({ selectedGroup: group });
    pushActivity(`✓ נבחרה קבוצה: ${group.name}`);
    log(`Selected group: ${group.name} (${group.id})`);
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
<meta charset="UTF-8">
<title>חפ"י — דשבורד הבוט</title>
<style>
  * { box-sizing: border-box; }
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #F5EDD6;
    background-image: linear-gradient(rgba(245,237,214,0.92), rgba(245,237,214,0.92)),
                      url('https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?w=1600&q=50');
    background-attachment: fixed;
    background-size: cover;
    color: #2C1A0E;
    min-height: 100vh;
    margin: 0;
    padding: 24px;
  }
  .wrap { max-width: 720px; margin: 0 auto; }
  .card {
    background: rgba(255,252,245,0.96);
    border: 2px solid rgba(200,169,110,0.4);
    border-radius: 24px;
    padding: 32px;
    margin-bottom: 20px;
    box-shadow: 0 8px 32px rgba(44,26,14,0.12);
    text-align: center;
  }
  h1 { color: #8B5E00; font-size: 28px; margin: 0 0 8px; font-family: 'Georgia', serif; }
  .subtitle { color: #6B4A00; font-size: 14px; opacity: 0.7; margin-bottom: 24px; }
  .badge {
    display: inline-block; padding: 8px 20px; border-radius: 999px;
    font-weight: bold; font-size: 14px; margin: 8px 0;
  }
  .badge.qr { background: rgba(196,98,45,0.15); color: #8B3E00; border: 1px solid #C4622D; }
  .badge.loading { background: rgba(30,107,138,0.15); color: #0A3A56; border: 1px solid #1A6B8A; }
  .badge.auth { background: rgba(232,184,28,0.18); color: #6B4A00; border: 1px solid #C8A96E; animation: pulse 1.5s infinite; }
  .badge.ready { background: rgba(46,125,50,0.15); color: #1B5E20; border: 1px solid #2E7D32; }
  .badge.error { background: rgba(198,40,40,0.12); color: #9F1010; border: 1px solid #C62828; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
  .qr-img { border: 4px solid #C8A96E; border-radius: 20px; padding: 16px; background: white; margin: 16px 0; max-width: 100%; box-shadow: 0 8px 32px rgba(200,169,110,0.3); }
  .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(200,169,110,0.2); text-align: right; }
  .info-row:last-child { border-bottom: none; }
  .info-label { color: #6B4A00; font-size: 14px; }
  .info-value { color: #2C1A0E; font-weight: bold; }
  .group-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 16px; margin: 6px 0; border-radius: 12px;
    background: rgba(200,169,110,0.08); border: 1px solid rgba(200,169,110,0.3);
    transition: all 0.2s;
  }
  .group-item:hover { background: rgba(200,169,110,0.15); }
  .group-item.selected { background: rgba(46,125,50,0.12); border-color: #2E7D32; }
  .group-name { color: #2C1A0E; font-weight: bold; text-align: right; flex: 1; }
  .group-btn {
    background: linear-gradient(135deg, #C8A96E, #B8951A);
    color: white; border: none; padding: 8px 16px; border-radius: 8px;
    cursor: pointer; font-weight: bold; font-size: 13px;
    box-shadow: 0 2px 8px rgba(200,169,110,0.4);
  }
  .group-btn:hover { filter: brightness(1.1); }
  .group-btn.selected { background: #2E7D32; cursor: default; }
  .spinner {
    border: 4px solid rgba(200,169,110,0.2); border-top: 4px solid #C8A96E;
    border-radius: 50%; width: 50px; height: 50px;
    animation: spin 1s linear infinite; margin: 24px auto;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .activity {
    text-align: right; max-height: 240px; overflow-y: auto;
    background: rgba(245,237,214,0.5); border-radius: 12px; padding: 12px;
  }
  .activity-item { padding: 6px 0; border-bottom: 1px solid rgba(200,169,110,0.15); font-size: 13px; }
  .activity-item:last-child { border: none; }
  .activity-time { color: #8B5E00; font-size: 11px; opacity: 0.7; margin-left: 8px; }
  .step { text-align: right; padding: 8px 0; color: #2C1A0E; font-size: 14px; }
  .step.done { color: #2E7D32; }
  .step.current { color: #C4622D; font-weight: bold; }
  .step.pending { opacity: 0.5; }
  .footer { text-align: center; color: #6B4A00; font-size: 11px; opacity: 0.5; margin-top: 24px; }
  h2 { color: #8B5E00; font-size: 20px; margin: 0 0 16px; text-align: right; }
</style>
</head>
<body>
<div class="wrap">
  <div class="card">
    <h1>🏛️ חפ"י — דשבורד הבוט</h1>
    <div class="subtitle">קהילת יפו העתיקה · 0502009350</div>

    <div id="content">
      <div class="spinner"></div>
      <p style="color:#6B4A00">טוען...</p>
    </div>
  </div>
</div>

<script>
async function refresh() {
  try {
    const data = await fetch('/status').then(r => r.json());
    document.getElementById('content').innerHTML = render(data);
  } catch (e) {
    document.getElementById('content').innerHTML = '<div class="badge error">⚠️ הבוט לא זמין — בדוק שהוא רץ</div>';
  }
}

function render(d) {
  const labels = {
    initializing: '🔄 מאתחל',
    qr: '📱 ממתין לסריקה',
    authenticated: '⏳ מאומת — מסיים טעינה...',
    ready: '✅ מחובר ופעיל!',
    disconnected: '❌ מנותק',
    auth_failure: '⚠️ אימות נכשל',
  };
  const cls = d.status === 'ready' ? 'ready'
    : d.status === 'qr' ? 'qr'
    : d.status === 'authenticated' ? 'auth'
    : (d.status || '').startsWith('loading') ? 'loading'
    : (d.status || '').includes('fail') || d.status === 'disconnected' ? 'error'
    : 'loading';

  let html = '<div class="badge ' + cls + '">' + (labels[d.status] || d.status) + '</div>';

  // QR phase
  if (d.qr && d.status !== 'ready') {
    html += '<p style="margin:16px 0;color:#2C1A0E">סרוק עם וואצ\\'אפ בטלפון 0502009350</p>';
    html += '<img class="qr-img" src="' + d.qr + '" width="280" />';
    html += '<div class="step current">📱 פתח את וואצ\\'אפ</div>';
    html += '<div class="step pending">⋮ → מכשירים מקושרים → קישור מכשיר</div>';
    html += '<div class="step pending">סרוק את הקוד שלמעלה</div>';
  }
  // Authenticated phase - waiting for ready
  else if (d.status === 'authenticated' || (d.status || '').startsWith('loading')) {
    html += '<div class="spinner"></div>';
    html += '<p style="color:#2C1A0E;font-size:15px"><b>סריקה הצליחה!</b> ✓</p>';
    html += '<p style="color:#6B4A00;font-size:14px;margin:8px 0">ממתין ש-WhatsApp Web יסיים לטעון...</p>';
    html += '<p style="color:#8B5E00;font-size:12px;opacity:0.7">זה עשוי לקחת 1-3 דקות בהפעלה ראשונה</p>';
    html += '<div style="margin-top:24px;text-align:right">';
    html += '<div class="step done">✓ QR נסרק</div>';
    html += '<div class="step done">✓ אימות בוצע</div>';
    html += '<div class="step current">⏳ טוען נתוני קבוצות וצ\\'אטים...</div>';
    html += '<div class="step pending">○ מוכן לפעולה</div>';
    html += '</div>';
  }
  // Ready phase
  else if (d.status === 'ready') {
    html += '<div style="margin:24px 0;text-align:right">';
    html += '<div class="info-row"><span class="info-label">מספר מחובר</span><span class="info-value">+' + (d.phone || '?') + '</span></div>';
    html += '<div class="info-row"><span class="info-label">סטטוס</span><span class="info-value" style="color:#2E7D32">פעיל</span></div>';
    if (d.selectedGroup) {
      html += '<div class="info-row"><span class="info-label">קבוצה מנוטרת</span><span class="info-value">' + d.selectedGroup.name + '</span></div>';
    }
    html += '</div>';

    if (!d.selectedGroup && d.groups && d.groups.length) {
      html += '<h2 style="margin-top:24px">בחר קבוצה לניטור:</h2>';
      d.groups.forEach(g => {
        html += '<div class="group-item"><span class="group-name">' + g.name + ' (' + g.participants + ' חברים)</span>';
        html += '<a href="/select-group/' + encodeURIComponent(g.id) + '" class="group-btn">בחר</a></div>';
      });
    }

    if (d.activity && d.activity.length) {
      html += '<h2 style="margin-top:24px">פעילות אחרונה</h2><div class="activity">';
      d.activity.forEach(a => {
        html += '<div class="activity-item"><span class="activity-time">' + a.time + '</span>' + a.text + '</div>';
      });
      html += '</div>';
    }
  }
  // Error states
  else if (d.status === 'disconnected' || (d.status || '').includes('fail')) {
    html += '<p style="margin-top:16px;color:#9F1010">הבוט מנותק. ייבחן חיבור מחדש בתוך כמה שניות.</p>';
  }

  html += '<div class="footer">' + (d.appUrl || '') + '</div>';
  return html;
}

refresh();
setInterval(refresh, 2000);
</script>
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

// ── Supabase helpers (no-op if Supabase not configured) ──────────────────────
async function getMember(phone) {
    if (!supabase) return null;
    const { data } = await supabase.from('jaffa_members').select('*').eq('phone', phone).single();
    return data;
}

async function upsertMember(data) {
    if (!supabase) return;
    const { error } = await supabase.from('jaffa_members').upsert(data, { onConflict: 'phone' });
    if (error) log(`Supabase upsert error: ${error.message}`);
}

async function updateMember(phone, data) {
    if (!supabase) return;
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

    log('Initializing WhatsApp...');

    waClient = new Client({
        authStrategy: new LocalAuth({ clientId: 'jaffa-bot', dataPath: SESSION_DIR }),
        puppeteer: {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--no-first-run', '--disable-extensions', '--no-zygote'],
        },
        webVersionCache: {
            type: 'remote',
            remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.3000.1023040093-alpha.html',
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
        log('Authenticated ✓ — waiting for WhatsApp Web to finish loading...');
        botStatus = 'authenticated';
        // Soft warning at 3 minutes — do NOT clear session, just log
        if (!readyTimer) {
            readyTimer = setTimeout(() => {
                log('⚠️  Still no "ready" event after 3 min — connection is slow but session is intact. Be patient.');
            }, 180000);
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

    waClient.on('ready', async () => {
        clearTimeout(readyTimer);
        isInitializing = false;
        botStatus = 'ready';
        qrDataUrl = null;
        connectedPhone = waClient.info.wid.user;
        log(`Ready! Connected as +${connectedPhone}`);
        pushActivity(`✓ הבוט מחובר כ-+${connectedPhone}`);
        // Load groups list for the dashboard
        try {
            const chats = await waClient.getChats();
            groupsList = chats
                .filter(c => c.isGroup)
                .map(c => ({ id: c.id._serialized, name: c.name, participants: c.participants?.length || 0 }))
                .sort((a, b) => b.participants - a.participants);
            log(`Loaded ${groupsList.length} groups`);
            pushActivity(`נטענו ${groupsList.length} קבוצות`);
        } catch (e) { log(`Group load error: ${e.message}`); }
        if (!selectedGroup) log('⚠️  No group selected — choose one from the dashboard');
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

    async function groupNameOf(id) {
        try { const c = await waClient.getChatById(id); return c?.name || id; } catch { return id; }
    }

    waClient.on('group_join', async notification => {
        const groupId = notification.id.remote;
        const gName = await groupNameOf(groupId);
        const inSelected = selectedGroup && groupId === selectedGroup.id;
        log(`📥 group_join in "${gName}" (${groupId})${inSelected ? ' ← MONITORED' : ' ← not monitored'}`);
        pushActivity(`📥 הצטרפות ב-"${gName}"${inSelected ? ' (קבוצה מנוטרת)' : ' (קבוצה אחרת)'}`);
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
        const gName = await groupNameOf(groupId);
        log(`📤 group_leave in "${gName}" (${groupId})`);
        pushActivity(`📤 עזיבה ב-"${gName}"`);
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
        const gName = await groupNameOf(groupId);
        const inSelected = selectedGroup && groupId === selectedGroup.id;
        log(`💬 gp2 [${msg.subtype}] in "${gName}"${inSelected ? ' ← MONITORED' : ''}`);
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
