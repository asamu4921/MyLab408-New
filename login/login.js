const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt'); // atau 'bcryptjs' kalau pakai itu

router.post('/', (req, res) => {
  const { nama, password } = req.body;

  // 1) Cari user berdasarkan nama
  const query = 'SELECT * FROM users WHERE nama = ? LIMIT 1';
  db.query(query, [nama], (err, results) => {
    if (err) return res.status(500).send('Error server');

    if (results.length === 0) {
      return res.send('Login gagal. Cek nama dan password.');
    }

    const user = results[0];

    // 2) Bandingkan password input vs hash di DB
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(500).send('Error bcrypt');

      if (result) {
        req.session.user = user;
        res.redirect('/dashboard');
      } else {
        res.send('Login gagal. Cek nama dan password.');
      }
    });
  });
});

module.exports = router;
