const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/edit', (req, res) => {
    const id = req.query.id;
    db.query('SELECT * FROM api WHERE id = ?', [id], (err, rows) => {
        if (err || rows.length === 0) return res.send('Data tidak ditemukan');
        const a = rows[0];

        res.send(`
      <h3 class="text-xl font-semibold mb-4">Edit Data API</h3>
      <form class="ajax-form space-y-4" method="POST" action="/api/update">
        <input type="hidden" name="id" value="${a.id}" />

        <div>
          <label>NIM</label>
          <input name="nim_mahasiswa" value="${a.nim_mahasiswa}" required class="w-full border px-2 py-1 rounded" />
        </div>

        <div>
          <label>Nama</label>
          <input name="nama_mahasiswa" value="${a.nama_mahasiswa}" required class="w-full border px-2 py-1 rounded" />
        </div>

        <div>
          <label>Jenis Kegiatan</label>
          <input name="jenis_kegiatan" value="${a.jenis_kegiatan}" class="w-full border px-2 py-1 rounded" />
        </div>

        <div>
          <label>Tanggal Pinjam</label>
          <input name="tanggal_pinjam" type="date" value="${a.tanggal_pinjam.toISOString().slice(0, 10)}" class="w-full border px-2 py-1 rounded" />
        </div>

        <div>
          <label>Start Time</label>
          <input name="start_time" type="time" value="${a.start_time}" class="w-full border px-2 py-1 rounded" />
        </div>

        <div>
          <label>End Time</label>
          <input name="end_time" type="time" value="${a.end_time}" class="w-full border px-2 py-1 rounded" />
        </div>

        <div class="flex justify-end space-x-2 pt-4 border-t mt-6">
          <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Update</button>
          <button type="button" id="modal-close" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Tutup</button>
        </div>
      </form>
    `);
    });
});

module.exports = router;
