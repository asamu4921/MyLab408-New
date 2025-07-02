const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/indeks', (req, res) => {
  db.query('SELECT * FROM users', (err, rows) => {
    if (err) return res.send('Gagal mengambil data user.');

    let html = `
      <style>
        h3 {
          margin-bottom: 10px;
        }
        .btn {
          background-color: #4CAF50;
          color: white;
          padding: 8px 12px;
          text-decoration: none;
          border-radius: 5px;
          margin-bottom: 10px;
          display: inline-block;
        }
        .btn:hover {
          background-color: #45a049;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          font-family: sans-serif;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        th, td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        th {
          background-color: #f4f4f4;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        tr:hover {
          background-color: #f1f1f1;
        }
        img {
          border-radius: 5px;
        }
        .action-links a {
          margin-right: 10px;
          color: #007bff;
          text-decoration: none;
        }
        .action-links a:hover {
          text-decoration: underline;
        }
      </style>

      <h3>Daftar Pengguna</h3>
      <a href="/users/create" class="modal-open btn">+ Tambah Pengguna</a>

      <table>
        <tr><th>ID</th><th>Nama</th><th>Role</th><th>Foto</th><th>Aksi</th></tr>
    `;

    rows.forEach(row => {
      html += `
        <tr>
          <td>${row.id}</td>
          <td>${row.nama}</td>
          <td>${row.role}</td>
          <td><img src="/dataset/${row.foto}" width="50"/></td>
          <td class="action-links">
            <a href="/users/edit?id=${row.id}" class="modal-open">Edit</a>
            <a href="/users/delete?id=${row.id}" onclick="return confirm('Hapus?')" class="ajax">Hapus</a>
          </td>
        </tr>
      `;
    });

    html += '</table>';
    res.send(html);
  });
});

module.exports = router;
