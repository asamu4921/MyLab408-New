const express = require('express');
const session = require('express-session');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const app = express();
const db = require('./db');

const sidebarHeader = require('./sidebar/header');
const sidebarFooter = require('./sidebar/footer');
const sidebarLeftside = require('./sidebar/leftside');

// =======================
// 1) Tambah Helmet
// =======================
app.use(helmet());

// =======================
// 2) Limit umum semua route
// =======================
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 menit
  max: 60,                 // max 60 request/IP/menit
  message: 'Terlalu banyak request. Coba lagi nanti.'
});
app.use(limiter);

// =======================
// 3) Limit khusus login
// =======================
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 menit
  max: 5, // max 5 percobaan login
  message: 'Terlalu sering gagal login. Coba lagi nanti.'
});
app.use('/login', loginLimiter);

// =======================
// 4) Body Parser & Static
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/dataset', express.static(path.join(__dirname, 'dataset')));

// =======================
// 5) Session
// =======================
app.use(session({
  secret: 'rahasia_sessionmu', // Ganti dengan env var di real server!
  resave: false,
  saveUninitialized: false
}));

// =======================
// 6) Middleware cek login
// =======================
function cekLogin(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
}

// =======================
// 7) Route Publik
// =======================
app.use('/', require('./halamanawal'));
app.use('/login', require('./login/login'));
app.use('/login', require('./login/logout'));

// =======================
// 8) Route Privat
// =======================
app.use('/dashboard', cekLogin, require('./dashboard/admin'));
app.use('/sidebar', cekLogin, sidebarHeader);
app.use('/sidebar', cekLogin, sidebarFooter);
app.use('/sidebar', cekLogin, sidebarLeftside);

app.use('/users', cekLogin, require('./users/indeks'));
app.use('/users', cekLogin, require('./users/create'));
app.use('/users', cekLogin, require('./users/edit'));
app.use('/users', cekLogin, require('./users/update'));
app.use('/users', cekLogin, require('./users/delete'));

app.use('/api', cekLogin, require('./api/indeks'));
app.use('/api', cekLogin, require('./api/create'));
app.use('/api', cekLogin, require('./api/edit'));
app.use('/api', cekLogin, require('./api/update'));
app.use('/api', cekLogin, require('./api/delete'));

app.use('/matkul', cekLogin, require('./matkul/indeks'));
app.use('/matkul', cekLogin, require('./matkul/create'));
app.use('/matkul', cekLogin, require('./matkul/edit'));
app.use('/matkul', cekLogin, require('./matkul/update'));
app.use('/matkul', cekLogin, require('./matkul/delete'));

// =======================
// 9) Start Server
// =======================
const PORT = 3005;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
  console.log(`Akses dari HP: http://10.170.8.40:${PORT}`);
});
