const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './dataset',
	filename: (req, file, cb) => {
	  cb(null, file.originalname);
	}

});
const upload = multer({ storage });

router.post('/update', upload.single('foto'), (req, res) => {
  const { id, nama, password, role } = req.body;
  let query, params;

  if (req.file) {
    const foto = req.file.filename;
    query = 'UPDATE users SET nama=?, password=?, role=?, foto=? WHERE id=?';
    params = [nama, password, role, foto, id];
  } else {
    query = 'UPDATE users SET nama=?, password=?, role=? WHERE id=?';
    params = [nama, password, role, id];
  }

  db.query(query, params, err => {
    if (err) return res.send('Gagal update user.');
    res.send('sukses');
  });
});

module.exports = router;
