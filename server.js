const express = require('express');
const path = require('path');

const app = express();
const PORT = 8085;

// ✅ خاص يكون مطابق للغات لي كينين فـ angular.json و i18n build output
const LOCALES = ['fr-CA', 'en'];

LOCALES.forEach((locale) => {
  const localePath = path.join(__dirname, 'dist/tp5', locale);

  // 📂 خدم static files حسب اللغة
  app.use(`/${locale}`, express.static(localePath));

  // 📄 رجع index.html فـ جميع المسارات باش يخدم Angular routing
  app.get(`/${locale}/*`, (req, res) => {
    res.sendFile(path.join(localePath, 'index.html'));
  });
});

// 🌍 redirection vers locale par défaut
app.get('/', (req, res) => {
  res.redirect('/fr-CA');
});

app.listen(PORT, () => {
  console.log(`🌐 L'application est disponible sur :`);
  console.log(`🇫🇷 http://localhost:${PORT}/fr-CA`);
  console.log(`🇬🇧 http://localhost:${PORT}/en`);
});
