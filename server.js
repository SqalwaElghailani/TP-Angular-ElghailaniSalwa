const express = require('express');
const path = require('path');

const app = express();
const PORT = 4200;

// اللغات اللي عندك في build output
const LOCALES = ['fr-CA', 'en'];

// Serve static files and handle routing per locale
LOCALES.forEach((locale) => {
  const localePath = path.join(__dirname, 'dist/tp5', locale);

  app.use(`/${locale}`, express.static(localePath));

  app.get(`/${locale}/*`, (req, res) => {
    res.sendFile(path.join(localePath, 'index.html'));
  });
});

// Redirect root to default locale
app.get('/', (req, res) => {
  res.redirect('/fr-CA');
});

app.listen(PORT, () => {
  console.log(`🌐 Server running at:`);
  console.log(`🇫🇷 http://localhost:${PORT}/fr-CA`);
  console.log(`🇬🇧 http://localhost:${PORT}/en`);
});
