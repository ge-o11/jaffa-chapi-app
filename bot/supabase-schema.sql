-- Jaffa CHAPI Supabase Schema
-- Run this in your Supabase SQL editor

-- Members table
CREATE TABLE IF NOT EXISTS jaffa_members (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone         TEXT UNIQUE NOT NULL,
  name          TEXT,
  coupon        TEXT UNIQUE,
  is_active     BOOLEAN DEFAULT true,
  date_joined   TEXT,
  time_joined   TEXT,
  joined_at     TIMESTAMPTZ DEFAULT NOW(),
  rejoin_date   TEXT,
  left_date     TEXT,
  left_at       TIMESTAMPTZ,
  credits_initial  INTEGER DEFAULT 10,
  credits_frozen   INTEGER,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Attractions table (for business owners' mini-sites)
CREATE TABLE IF NOT EXISTS jaffa_attractions (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  description   TEXT,
  category      TEXT, -- gallery, restaurant, tour, experience
  address       TEXT,
  phone         TEXT,
  website       TEXT,
  image_urls    TEXT[],
  is_active     BOOLEAN DEFAULT true,
  owner_email   TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Offers/coupons per attraction
CREATE TABLE IF NOT EXISTS jaffa_offers (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  attraction_id   UUID REFERENCES jaffa_attractions(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT,
  credits_required INTEGER NOT NULL,
  discount_type   TEXT, -- percent, fixed, free_item
  discount_value  TEXT,
  valid_until     DATE,
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Redemptions log
CREATE TABLE IF NOT EXISTS jaffa_redemptions (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_phone    TEXT REFERENCES jaffa_members(phone),
  offer_id        UUID REFERENCES jaffa_offers(id),
  attraction_id   UUID REFERENCES jaffa_attractions(id),
  credits_used    INTEGER NOT NULL,
  redeemed_at     TIMESTAMPTZ DEFAULT NOW()
);

-- App settings
CREATE TABLE IF NOT EXISTS jaffa_settings (
  key   TEXT PRIMARY KEY,
  value TEXT
);

INSERT INTO jaffa_settings (key, value) VALUES
  ('admin_password', 'admin123'),
  ('whatsapp_group_id', ''),
  ('app_url', 'https://jaffa-chapi.co.il'),
  ('credits_on_join', '10'),
  ('credits_per_day', '1')
ON CONFLICT (key) DO NOTHING;

-- RLS Policies (disable for now, enable for production)
ALTER TABLE jaffa_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE jaffa_attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE jaffa_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE jaffa_redemptions ENABLE ROW LEVEL SECURITY;

-- Allow anon to read attractions and offers (public info)
CREATE POLICY "Public read attractions" ON jaffa_attractions FOR SELECT USING (true);
CREATE POLICY "Public read offers" ON jaffa_offers FOR SELECT USING (is_active = true);

-- Bot service role can do everything (use service_role key for bot)
