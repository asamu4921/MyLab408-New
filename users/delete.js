const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/delete', (req, res) => {
  const id = req.query.id;
  db.query('DELETE FROM users WHERE id = ?', [id], err => {
    if (err) return res.send('Gagal hapus.');
    res.send('sukses');
  });
});

module.exports = router;
