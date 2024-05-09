import { search, download } from 'aptoide-scraper';

const handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, '*تحميل التطبيقات محبوب الجماهير يقوم بتحميل التطبيقات*\n\n*مثــال:*\n .apk facebook lite', m);

  try {
    let searchResults = await search(text);
    if (searchResults.length === 0) {
      return conn.reply(m.chat, ' *لا توجد نتائج لهذا التطبيق*', m);
    }

    let data = await download(searchResults[0].id);
    if (!data || !data.name || !data.package || !data.lastup || !data.size || !data.dllink || !data.icon) {
      return conn.reply(m.chat, '*لا يمكن الحصول على تفاصيل التطبيق*', m);
    }

    let response = `💌 *اسم التطبيق:* ${data.name}\n📦 *الحزمة:* ${data.package}\n🕒 *آخر تحديث:* ${data.lastup}\n📥 *الحجم:* ${data.size}\n\n_إنضم لعائلةBOTIKAL عبر الضغط على الرابط_\n`;

    if (data.size.includes('GB') || parseFloat(data.size.replace(' MB', '')) > 999) {
      return conn.reply(m.chat, '🚩 *الملف ثقيل جدًا*', m);
    }

    const iconUrl = data.icon; // رابط أيقونة التطبيق
    await conn.sendMessage(m.chat, {
      text: response,
      contextInfo: {
        externalAdReply: {
          title: data.name,
          body: 'جاري تحميل التطبيق',
          sourceUrl: 'instagram.com/amin1_tech1igsh=YzljYTk1ODg3Zg==‎‏



A man wearing a jellaba and a red hat is going to the mosque',
          thumbnailUrl: iconUrl, // رابط أيقونة التطبيق هنا
          mediaType: 1, // نوع المشاركة: صورة
          showAdAttribution: true,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    await conn.sendMessage(m.chat, { document: { url: data.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data.name + '.apk', caption: null }, { quoted: m });
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, '*حدث خطأ أثناء معالجة الطلب*', m);
  }
};

handler.tags = ['applications'];
handler.help = ['apk'];
handler.command = /^(apk|apkdl|dapk2|aptoide|aptoidedl)$/i;

export default handler;
