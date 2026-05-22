# חפ"י WhatsApp Bot

## הגדרה ראשונית

1. **Supabase** — צור פרויקט חדש ב-Supabase והרץ את `supabase-schema.sql`

2. **הגדר credentials:**
   ```bash
   set SUPABASE_URL=https://xxxxx.supabase.co
   set SUPABASE_KEY=your_anon_key
   ```
   או ערוך ישירות ב-`bot-server.js` שורות SUPABASE_URL / SUPABASE_KEY

3. **התקן:**
   ```bash
   npm install
   ```

4. **הפעל:**
   ```bash
   npm start
   ```

5. **סרוק QR** — פתח http://localhost:3100 וסרוק

6. **הגדר קבוצה** — ערוך `config.json`:
   ```json
   {
     "selectedGroup": {
       "id": "120363XXXXXXXX@g.us",
       "name": "קהילת יפו העתיקה"
     }
   }
   ```

## מנגנון הנקודות

- **הצטרפות**: 10 נקודות מיידית + הודעת ברוכ הבא + קוד קופון
- **כל יום**: +1 נקודה (אוטומטי, מחושב בעת מימוש)
- **עזיבה**: נקודות מוקפאות, הודעת פרידה
- **חזרה**: נקודות מופשרות, הצבירה ממשיכה

## טבלאות Supabase

| טבלה | תיאור |
|---|---|
| `jaffa_members` | חברי הקהילה + נקודות |
| `jaffa_attractions` | נקודות אטרקציה ועסקים |
| `jaffa_offers` | הטבות לפי נקודות |
| `jaffa_redemptions` | לוג מימושים |
| `jaffa_settings` | הגדרות מערכת |
