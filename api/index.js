export default function handler(req, res) {
  const THUMBNAILS = [
    "https://idweb.tech/api/preview.php?file=oussrgo9.jpg",
    "https://idweb.tech/api/preview.php?file=xfhn3krg.jpg",
    "https://idweb.tech/api/preview.php?file=f2jalojz.jpg"
  ];

  function randomThumb() {
    return THUMBNAILS[Math.floor(Math.random() * THUMBNAILS.length)];
  }

  function isBot(userAgent = "") {
    const bots = [
      "WhatsApp", "facebookexternalhit", "Twitterbot",
      "TelegramBot", "Discordbot", "LinkedInBot"
    ];
    return bots.some(b => userAgent.includes(b));
  }

  const ua = req.headers["user-agent"] || "";

  if (isBot(ua)) {
    // Kalau request dari bot → redirect ke random thumbnail
    const img = randomThumb();
    res.writeHead(302, { Location: img });
    return res.end();
  }

  // Kalau manusia → tampilkan HTML dashboard
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(`
    <!doctype html>
    <html lang="id">
      <head>
        <meta charset="utf-8">
        <title>Dashboard</title>
      </head>
      <body style="font-family:sans-serif;text-align:center;padding:50px">
        <h1>🎉 Selamat datang di Dashboard</h1>
        <p>Kalau link ini dibuka di browser → tampil HTML.</p>
        <p>Kalau dikirim di WA/Telegram → tampil thumbnail random dari host lain.</p>
      </body>
    </html>
  `);
                     }
