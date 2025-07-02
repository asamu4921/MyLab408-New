const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/update', (req, res) => {
    const {
        id, nim_mahasiswa, nama_mahasiswa,
        jenis_kegiatan, tanggal_pinjam,
        start_time, end_time
    } = req.body;

    db.query(
        `UPDATE api SET 
      nim_mahasiswa = ?, 
      nama_mahasiswa = ?, 
      jenis_kegiatan = ?, 
      tanggal_pinjam = ?, 
      start_time = ?, 
      end_time = ?
    WHERE id = ?`,
        [nim_mahasiswa, nama_mahasiswa, jenis_kegiatan, tanggal_pinjam, start_time, end_time, id],
        (err) => {
            if (err) return res.send('Gagal update data');
            res.send('Data berhasil diupdate');
        }
    );
});

module.exports = router;
