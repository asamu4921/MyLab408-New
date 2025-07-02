const bcrypt = require('bcrypt');
const db = require('./db'); // pastikan ini benar

const newPassword = 'Ahmad899';
const saltRounds = 10;

bcrypt.hash(newPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error('Gagal hash:', err);
    return;
  }

  const query = 'UPDATE users SET password = ?';
  db.query(query, [hash], (err, result) => {
    if (err) {
      console.error('Gagal update:', err);
      return;
    }
    console.log(`Sukses update password semua user ke hash: ${hash}`);
    process.exit();
  });
});
