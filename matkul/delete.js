// matkul/delete.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/delete', (req, res) => {
  const id = req.query.id;
  db.query('DELETE FROM jadwal_matkul WHERE id = ?', [id], err => {
    if (err) return res.send('Gagal menghapus data.');
    res.send('Data berhasil dihapus.');
  });
});

module.exports = router;