const mysql = require('mysql2');

// Import fetch (karena pakai node-fetch v3)
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Koneksi ke database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gpuasamu',
    database: 'mylab'
});

db.connect(err => {
    if (err) {
        console.error('[x] Gagal koneksi ke database:', err);
        process.exit();
    }
    console.log('[✓] Terkoneksi ke database');
});

// Ambil data dari API eksternal
async function ambilDataAPI() {
    const apiUrl = 'https://peminjaman.polibatam.ac.id/api-penru/data-peminjaman';
    const apiKey = '9a89a3be-1d44-4e81-96a8-585cb0453718';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'api-key': apiKey }
        });

        const data = await response.json();

        if (!Array.isArray(data)) {
            console.error('[x] Data API tidak valid atau kosong.');
            process.exit();
        }

        console.log(`[i] Jumlah data diterima dari API: ${data.length}`);
        simpanKeDatabase(data);

    } catch (err) {
        console.error('[x] Gagal ambil data dari API:', err);
        process.exit();
    }
}

// Simpan ke database sambil cek duplikat
function simpanKeDatabase(dataList) {
    let index = 0;
    let berhasil = 0;

    function prosesSatuPerSatu() {
        if (index >= dataList.length) {
            console.log(`[✓] Proses selesai. Total data baru disimpan: ${berhasil}`);
            db.end();
            return;
        }

        const item = dataList[index++];
        const {
            nim_mahasiswa,
            nama_mahasiswa,
            jenis_kegiatan,
            nama_kegiatan_other,
            tanggal_pinjam,
            start_time,
            end_time,
            kode_ruangan,
            nama_ruangan,
            gedung_ruangan,
            nik_penanggungjawab,
            nama_penanggungjawab
        } = item;

        // Cek duplikat berdasarkan nim + tanggal + waktu
        const cekQuery = `
      SELECT id FROM api WHERE nim_mahasiswa = ? AND tanggal_pinjam = ? AND start_time = ?
    `;
        db.query(cekQuery, [nim_mahasiswa, tanggal_pinjam, start_time], (cekErr, rows) => {
            if (cekErr) {
                console.error('[x] Gagal cek duplikat:', cekErr);
                return prosesSatuPerSatu(); // lanjutkan ke data berikutnya meski error
            }

            if (rows.length > 0) {
                console.log(`[!] Duplikat dilewati: ${nim_mahasiswa} (${tanggal_pinjam} ${start_time})`);
                return prosesSatuPerSatu();
            }

            // Insert data baru
            const insertQuery = `
        INSERT INTO api (
          nim_mahasiswa, nama_mahasiswa, jenis_kegiatan,
          nama_kegiatan_other, tanggal_pinjam, start_time, end_time,
          kode_ruangan, nama_ruangan, gedung_ruangan,
          nik_penanggungjawab, nama_penanggungjawab
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

            db.query(insertQuery, [
                nim_mahasiswa, nama_mahasiswa, jenis_kegiatan,
                nama_kegiatan_other, tanggal_pinjam, start_time, end_time,
                kode_ruangan, nama_ruangan, gedung_ruangan,
                nik_penanggungjawab, nama_penanggungjawab
            ], (insertErr) => {
                if (insertErr) {
                    console.error(`[x] Gagal insert: ${nim_mahasiswa} (${tanggal_pinjam})`, insertErr);
                } else {
                    console.log(`[✓] Data disimpan: ${nim_mahasiswa} (${tanggal_pinjam} ${start_time})`);
                    berhasil++;
                }
                prosesSatuPerSatu(); // lanjut ke data berikutnya
            });
        });
    }

    prosesSatuPerSatu();
}

// Mulai
ambilDataAPI();
