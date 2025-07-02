const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const db = require('../db');

router.get('/create', async (req, res) => {
    const apiUrl = "https://peminjaman.polibatam.ac.id/api-penru/data-peminjaman";
    const apiKey = "9a89a3be-1d44-4e81-96a8-585cb0453718";

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: { "api-key": apiKey }
        });

        const data = await response.json();
        let inserted = 0;
        let skipped = 0;

        for (const item of data) {
            const isDuplicate = await new Promise((resolve, reject) => {
                db.query(
                    `SELECT id FROM api WHERE nim_mahasiswa = ? AND tanggal_pinjam = ? AND start_time = ? AND end_time = ?`,
                    [item.nim_mahasiswa, item.tanggal_pinjam, item.start_time, item.end_time],
                    (err, results) => {
                        if (err) return reject(err);
                        resolve(results.length > 0);
                    }
                );
            });

            if (isDuplicate) {
                skipped++;
                continue;
            }

            // Hindari kesalahan data terlalu panjang
            const nim = (item.nim_mahasiswa || '').slice(0, 20);
            const nama = (item.nama_mahasiswa || '').slice(0, 100);
            const jenis = (item.jenis_kegiatan || '').slice(0, 50);
            const other = item.nama_kegiatan_other || '';
            const kode = (item.kode_ruangan || '').slice(0, 50);
            const ruang = (item.nama_ruangan || '').slice(0, 100);
            const gedung = (item.gedung_ruangan || '').slice(0, 100);
            const nik = (item.nik_penanggungjawab || '').slice(0, 30);
            const namaPenanggung = (item.nama_penanggungjawab || '').slice(0, 100);

            await new Promise((resolve, reject) => {
                db.query(
                    `INSERT INTO api (
            nim_mahasiswa, nama_mahasiswa, jenis_kegiatan, nama_kegiatan_other,
            tanggal_pinjam, start_time, end_time, kode_ruangan, nama_ruangan,
            gedung_ruangan, nik_penanggungjawab, nama_penanggungjawab
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        nim, nama, jenis, other,
                        item.tanggal_pinjam, item.start_time, item.end_time,
                        kode, ruang, gedung, nik, namaPenanggung
                    ],
                    (err) => {
                        if (err) return reject(err);
                        resolve();
                    }
                );
            });

            inserted++;
        }

        res.send(`
      <div class="p-4 text-green-700">
        <p>✅ Proses selesai.</p>
        <p>Data baru ditambahkan: <strong>${inserted}</strong></p>
        <p>Data duplikat dilewati: <strong>${skipped}</strong></p>
        <button id="modal-close" class="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Tutup
        </button>
      </div>
    `);

    } catch (err) {
        console.error(err);
        res.send(`
      <div class="p-4 text-red-700">
        <p>❌ Gagal mengambil atau menyimpan data API.</p>
        <pre>${err.message}</pre>
        <button id="modal-close" class="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Tutup
        </button>
      </div>
    `);
    }
});

module.exports = router;
