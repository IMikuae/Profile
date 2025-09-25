export default function handler(req, res) {
  const THUMBNAILS = [
    "https://idweb.tech/api/preview.php?file=oussrgo9.jpg",
    "https://idweb.tech/api/preview.php?file=xfhn3krg.jpg",
    "https://idweb.tech/api/preview.php?file=f2jalojz.jpg"
  ];

  function randomThumb() {
    return THUMBNAILS[Math.floor(Math.random() * THUMBNAILS.length)];
  }

  // deteksi apakah request dari bot/fetch/axios
  function isBotLike(headers) {
    const ua = (headers["user-agent"] || "").toLowerCase();

    // pola user-agent yang umum dipakai bot / fetch
    const botKeywords = [
      "node-fetch", "axios", "curl", "okhttp", "python",
      "whatsapp", "facebookexternalhit", "telegram",
      "discordbot", "twitterbot", "linkedinbot", "slackbot"
    ];

    if (botKeywords.some(b => ua.includes(b))) return true;

    // request dari browser biasanya ada header ini
    const isBrowserHeaders =
      headers["sec-fetch-mode"] ||
      headers["upgrade-insecure-requests"] ||
      headers["accept-language"];

    if (!isBrowserHeaders) return true;

    return false;
  }

  if (isBotLike(req.headers)) {
    // 👉 kalau bot/fetch → redirect ke random thumbnail
    const img = randomThumb();
    res.writeHead(302, { Location: img });
    return res.end();
  }

  // 👉 kalau manusia → tampilkan halaman utama
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(`
    <!doctype html>
    <html lang="id">
      <head>
        <meta charset="utf-8">
        <title>Dashboard Utama</title>
      </head>
      <body style="font-family:sans-serif;text-align:center;padding:50px">
        <h1>🎉 Selamat datang di Dashboard</h1>
        <p>Jika link ini dibuka oleh manusia, tampil halaman ini.</p>
        <p>Jika link ini diambil oleh bot/fetch, diarahkan ke thumbnail random.</p>
      </body>
    </html>
  `);
}
