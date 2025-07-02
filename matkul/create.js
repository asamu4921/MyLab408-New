// matkul/create.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/create', (req, res) => {
  res.send(`
    <h3 class="text-lg font-semibold mb-2">Tambah Jadwal Matkul</h3>
    <form action="/matkul/create" method="POST" class="ajax-form space-y-2">
      <input required name="matkul" placeholder="Nama Matkul" class="w-full border px-2 py-1" />
      <input required name="hari" class="w-full border px-2 py-1" />
      <input required type="time" name="start_time" class="w-full border px-2 py-1" />
      <input required type="time" name="end_time" class="w-full border px-2 py-1" />
      <input name="kode_ruangan" placeholder="Kode Ruangan" class="w-full border px-2 py-1" />
      <input name="prodi" placeholder="Prodi" class="w-full border px-2 py-1" />
      <input name="dosen" placeholder="Dosen" class="w-full border px-2 py-1" />
      <button class="bg-blue-600 text-white px-4 py-2 rounded">Simpan</button>
    </form>
  `);
});

router.post('/create', (req, res) => {
  const { matkul, hari, start_time, end_time, kode_ruangan, prodi, dosen } = req.body;
  db.query(`INSERT INTO jadwal_matkul (matkul, hari, start_time, end_time, kode_ruangan, prodi, dosen)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [matkul, hari, start_time, end_time, kode_ruangan, prodi, dosen],
    err => {
      if (err) return res.send('Gagal menambahkan data.');
      res.send('Data berhasil ditambahkan.');
    });
});

module.exports = router;