const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/indeks', (req, res) => {
  db.query('SELECT * FROM jadwal_matkul ORDER BY id DESC', (err, rows) => {
    if (err) return res.send('Gagal mengambil data jadwal.');

    let html = `
      <h3 class="text-xl font-semibold mb-4">Daftar Jadwal Mata Kuliah</h3>
      <a href="/matkul/create" class="modal-open btn bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block">+ Tambah Data</a>
      <table class="w-full border border-collapse text-sm">
        <thead class="bg-gray-200">
          <tr>
            <th class="border px-2 py-1">ID</th>
            <th class="border px-2 py-1">Matkul</th>
            <th class="border px-2 py-1">Hari</th>
            <th class="border px-2 py-1">Waktu</th>
            <th class="border px-2 py-1">Ruangan</th>
            <th class="border px-2 py-1">Prodi</th>
            <th class="border px-2 py-1">Dosen</th>
            <th class="border px-2 py-1">Aksi</th>
          </tr>
        </thead>
        <tbody>
    `;

    rows.forEach(row => {
      html += `
        <tr class="hover:bg-gray-100">
          <td class="border px-2 py-1">${row.id}</td>
          <td class="border px-2 py-1">${row.matkul}</td>
          <td class="border px-2 py-1">${row.hari}</td>
          <td class="border px-2 py-1">${row.start_time} - ${row.end_time}</td>
          <td class="border px-2 py-1">${row.kode_ruangan}</td>
          <td class="border px-2 py-1">${row.prodi}</td>
          <td class="border px-2 py-1">${row.dosen}</td>
          <td class="border px-2 py-1 text-blue-600">
            <a href="/matkul/edit?id=${row.id}" class="modal-open mr-2">Edit</a>
            <a href="/matkul/delete?id=${row.id}" onclick="return confirm('Hapus data ini?')" class="ajax">Hapus</a>
          </td>
        </tr>
      `;
    });

    html += '</tbody></table>';
    res.send(html);
  });
});

module.exports = router;
