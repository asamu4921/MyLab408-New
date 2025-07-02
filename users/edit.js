const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/edit', (req, res) => {
  const id = req.query.id;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, rows) => {
    if (err || rows.length === 0) return res.send('User tidak ditemukan.');
    const u = rows[0];

    res.send(`
  <h3 class="text-xl font-semibold mb-4">Edit User</h3>
  <form class="ajax-form space-y-4" method="POST" action="/users/update" enctype="multipart/form-data">
    <input type="hidden" name="id" value="${u.id}" />

    <div>
      <label class="block mb-1">Nama</label>
      <input name="nama" value="${u.nama}" required class="w-full border px-3 py-2 rounded" />
    </div>

    <div>
      <label class="block mb-1">Password</label>
      <input name="password" value="${u.password}" required class="w-full border px-3 py-2 rounded" />
    </div>

    <div>
      <label class="block mb-1">Role</label>
      <select name="role" class="w-full border px-3 py-2 rounded">
        <option value="superadmin" ${u.role === 'superadmin' ? 'selected' : ''}>Superadmin</option>
        <option value="dosen" ${u.role === 'dosen' ? 'selected' : ''}>Dosen</option>
        <option value="laboran" ${u.role === 'laboran' ? 'selected' : ''}>Laboran</option>
      </select>
    </div>

    <div>
      <label class="block mb-1">Foto</label>
      <input type="file" name="foto" class="w-full" />
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
