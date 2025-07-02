const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db');
const bcrypt = require('bcrypt'); // hash password

// Form GET
router.get('/create', (req, res) => {
  res.send(`
<h3 class="text-xl font-semibold mb-4">Tambah User</h3>
<form class="ajax-form space-y-4" method="POST" action="/users/create" enctype="multipart/form-data">
  <div>
    <label class="block mb-1">Nama</label>
    <input name="nama" placeholder="Nama" required class="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label class="block mb-1">Password</label>
    <input type="password" name="password" placeholder="Password" required class="w-full border px-3 py-2 rounded" />
  </div>
  <div>
    <label class="block mb-1">Role</label>
    <select name="role" class="w-full border px-3 py-2 rounded">
      <option value="superadmin">Superadmin</option>
      <option value="dosen">Dosen</option>
      <option value="laboran">Laboran</option>
    </select>
  </div>
  <div>
    <label class="block mb-1">Foto</label>
    <input type="file" name="foto" class="w-full" />
  </div>
  <div class="flex justify-end space-x-2 pt-4 border-t mt-6">
    <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Simpan</button>
    <button type="button" id="modal-close" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Tutup</button>
  </div>
</form>
  `);
});

// Konfigurasi upload
const storage = multer.diskStorage({
  destination: './dataset',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// POST create
router.post('/create', upload.single('foto'), (req, res) => {
  const { nama, password, role } = req.body;
  const foto = req.file ? req.file.filename : null;

  // Validasi password
  const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
  if (!valid) {
    console.log(`[CREATE USER] GAGAL: Password tidak valid untuk user ${nama}`);
    return res.send('Password harus minimal 6 karakter, mengandung huruf besar, huruf kecil, dan angka.');
  }

  // Hash password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(`[CREATE USER] GAGAL: Error hash password untuk user ${nama}`, err);
      return res.send('Gagal mengenkripsi password.');
    }

    const query = 'INSERT INTO users (nama, password, role, foto) VALUES (?, ?, ?, ?)';
    db.query(query, [nama, hash, role, foto], err => {
      if (err) {
        console.log(`[CREATE USER] GAGAL: Gagal INSERT user ${nama}`, err);
        return res.send('Gagal menambahkan user.');
      }
      console.log(`[CREATE USER] SUKSES: User ${nama} berhasil ditambahkan`);
      res.send('sukses');
    });
  });
});

module.exports = router;
