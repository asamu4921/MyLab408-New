// matkul/edit.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/edit', (req, res) => {
  const id = req.query.id;
  db.query('SELECT * FROM jadwal_matkul WHERE id = ?', [id], (err, rows) => {
    if (err || rows.length === 0) return res.send('Data tidak ditemukan.');
    const row = rows[0];
    res.send(`
      <h3 class="text-lg font-semibold mb-2">Edit Jadwal Matkul</h3>
      <form action="/matkul/update" method="POST" class="ajax-form space-y-2">
        <input type="hidden" name="id" value="${row.id}" />
        <input required name="matkul" value="${row.matkul}" class="w-full border px-2 py-1" />
        <input required name="hari" value="${row.hari}" class="w-full border px-2 py-1" />
        <input required type="time" name="start_time" value="${row.start_time}" class="w-full border px-2 py-1" />
        <input required type="time" name="end_time" value="${row.end_time}" class="w-full border px-2 py-1" />
        <input name="kode_ruangan" value="${row.kode_ruangan}" class="w-full border px-2 py-1" />
        <input name="prodi" value="${row.prodi}" class="w-full border px-2 py-1" />
        <input name="dosen" value="${row.dosen}" class="w-full border px-2 py-1" />
        <button class="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    `);
  });
});

module.exports = router;