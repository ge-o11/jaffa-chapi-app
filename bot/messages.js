'use strict';

const APP_URL = 'https://jaffa-chapi.co.il';

function welcomeMessage(name, coupon, credits = 10) {
  const displayName = name || 'אורח/ת יקר/ה';
  return `🌟 *ברוכ/ה הבא/ה לקהילת יפו העתיקה!*

שלום ${displayName} 👋

נרשמת בהצלחה לקהילת *חפ"י — חוויות פעילות ביפו העתיקה*.

*🏅 קיבלת ${credits} נקודות קרדיט כמתנת הצטרפות!*

קוד הקהילה האישי שלך:
\`${coupon}\`

*מה תוכל/י לעשות עם הנקודות?*
✦ הנחות בגלריות ומסעדות ביפו
✦ שירותים מיוחדים בנקודות האטרקציה
✦ קופונים בלעדיים לחברי הקהילה

*📈 כך צוברים נקודות:*
• ${credits} נקודות מיידית — כי הצטרפת!
• נקודה אחת (+1) בכל יום שנשאר/ת בקהילה
• ⚠️ עזיבת הקהילה = הקפאת הנקודות

*🗺️ כנס/י לאתר לחוויה המלאה:*
${APP_URL}

*יפו העתיקה מחכה לך!* 🏛️✨`;
}

function returningMemberMessage(name, credits) {
  const displayName = name || 'חבר/ת קהילה';
  return `🎉 *ברוכ/ה השב/ה לקהילת יפו העתיקה!*

שלום ${displayName}, שמחים שחזרת!

✅ *חשבונך הופעל מחדש*
🏅 *${credits} נקודות קרדיט מחכות לך*

הנקודות שצברת שמורות ועכשיו פעילות שוב.
הצבירה ממשיכה מהיום — נקודה אחת ביום.

*🗺️ חווה את יפו:*
${APP_URL}

יפו העתיקה שמחה שחזרת! 🌟`;
}

function farewellMessage(name, credits) {
  const displayName = name || 'חבר/ת קהילה';
  return `😢 *חבל שהולכ/ת...*

שלום ${displayName},

עזבת את קהילת יפו העתיקה.

❄️ *${credits} נקודות הקרדיט שלך הוקפאו.*
הנקודות לא נמחקות — רק מוקפאות.

💡 *כדי לשחרר ולהמשיך לצבור:*
פשוט הצטרף/י שוב לקהילה:
${APP_URL}

יפו העתיקה תמיד כאן 🌊
נשמח לראות אותך שוב! 🏛️`;
}

module.exports = { welcomeMessage, returningMemberMessage, farewellMessage };
