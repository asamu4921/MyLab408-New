const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Login</title>
      <style>
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: #f3f4f6;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .login-box {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 10px 15px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
        }
        h2 {
          margin-bottom: 1.5rem;
          text-align: center;
          color: #111827;
        }
        input[type="text"],
        input[type="password"] {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: #f9fafb;
        }
        button {
          width: 100%;
          padding: 0.75rem;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }
        button:hover {
          background-color: #2563eb;
        }
      </style>
    </head>
    <body>
      <div class="login-box">
        <h2>Selamat Datang</h2>
        <form method="POST" action="/login">
          <input type="text" name="nama" placeholder="Nama" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

module.exports = router;
