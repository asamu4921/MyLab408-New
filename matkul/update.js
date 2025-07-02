// matkul/update.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/update', (req, res) => {
  const { id, matkul, hari, start_time, end_time, kode_ruangan, prodi, dosen } = req.body;
  db.query(`UPDATE jadwal_matkul SET matkul=?, hari=?, start_time=?, end_time=?, kode_ruangan=?, prodi=?, dosen=? WHERE id=?`,
    [matkul, hari, start_time, end_time, kode_ruangan, prodi, dosen, id],
    err => {
      if (err) return res.send('Gagal update data.');
      res.send('Data berhasil diupdate.');
    });
});

module.exports = router;