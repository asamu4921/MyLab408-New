// routes/admin.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const user = req.session.user;
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Dashboard</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="h-screen flex overflow-hidden">

      <!-- Sidebar -->
	  <aside id="sidebar" class="w-64 bg-gray-800 text-white flex-shrink-0 h-screen overflow-y-auto"></aside>

      <!-- Main content wrapper -->
      <div class="flex flex-col flex-1">

        <!-- Header -->
        <header id="header" class="bg-gray-100 h-16 flex items-center justify-between px-4 border-b border-gray-300"></header>

        <!-- Main content -->
        <main id="konten" class="flex-1 overflow-y-auto p-4 bg-white">
          <h2>Selamat Datang ${user.nama} !</h2>
        </main>
        <div id="modal" class="fixed inset-0 bg-black bg-opacity-50 overflow-auto hidden z-50">
          <div class="min-h-screen flex justify-center py-10">
            <div class="bg-white p-4 rounded shadow-lg w-full max-w-xl" id="modal-content"></div>
          </div>
        </div>



        <!-- Footer -->
        <footer id="footer" class="h-16 bg-gray-100 flex items-center justify-center border-t border-gray-300"></footer>
      </div>

	<script>
	// 1) Load header
	fetch('/sidebar/header')
		.then(r => r.text())
		.then(html => {
		document.getElementById('header').innerHTML = html;
		});

	// 2) Load sidebar + pasang toggle sublist Matkul
	fetch('/sidebar/leftside')
		.then(r => r.text())
		.then(html => {
		document.getElementById('sidebar').innerHTML = html;

		// Toggle sublist Matkul
		const toggleMatkul = document.getElementById('toggleMatkul');
		const subMatkul = document.getElementById('subMatkul');
		if (toggleMatkul && subMatkul) {
			toggleMatkul.addEventListener('click', (e) => {
			e.preventDefault();
			subMatkul.classList.toggle('hidden');
			});
		}
		// Toggle sublist Ruang Lab
		const toggleLab = document.getElementById('toggleLab');
		const subLab = document.getElementById('subLab');
		if (toggleLab && subLab) {
			toggleLab.addEventListener('click', (e) => {
			e.preventDefault();
			subLab.classList.toggle('hidden');
			});
		}
		// Toggle sublist Ruang Dosen
		const toggleDosen = document.getElementById('toggleDosen');
		const subDosen = document.getElementById('subDosen');
		if (toggleDosen && subDosen) {
			toggleDosen.addEventListener('click', (e) => {
			e.preventDefault();
			subDosen.classList.toggle('hidden');
			});
		}
			
		});

	// 3) Load footer
	fetch('/sidebar/footer')
		.then(r => r.text())
		.then(html => {
		document.getElementById('footer').innerHTML = html;
		});

	// 4) Handler klik global
	document.addEventListener('click', function (e) {
		// Navigasi AJAX
		if (e.target.classList.contains('ajax')) {
		e.preventDefault();
		fetch(e.target.href)
			.then(res => res.text())
			.then(html => {
			document.getElementById('konten').innerHTML = html;
			});
		}

		// Sidebar toggle (burger)
		if (e.target.id === 'toggleSidebar') {
		document.getElementById('sidebar').classList.toggle('hidden');
		}

		// Modal open
		if (e.target.classList.contains('modal-open')) {
		e.preventDefault();
		fetch(e.target.href)
			.then(res => res.text())
			.then(html => {
			document.getElementById('modal-content').innerHTML = html;
			document.getElementById('modal').classList.remove('hidden');
			});
		}

		// Modal close manual
		if (e.target.id === 'modal-close') {
		document.getElementById('modal').classList.add('hidden');
		}

		// Modal close klik latar
		if (e.target.id === 'modal') {
		e.target.classList.add('hidden');
		}
	});

	// 5) Submit form AJAX (termasuk upload file)
	document.addEventListener('submit', function (e) {
		if (e.target.classList.contains('ajax-form')) {
		e.preventDefault();
		const form = e.target;
		const data = new FormData(form);

		fetch(form.action, {
			method: 'POST',
			body: data
		})
			.then(res => res.text())
			.then(response => {
			if (response.trim() === 'sukses') {
				alert('Data berhasil disimpan');
				document.getElementById('modal').classList.add('hidden');
				// reload list
				fetch('/users/indeks')
				.then(res => res.text())
				.then(html => {
					document.getElementById('konten').innerHTML = html;
				});
			} else {
				alert('Gagal: ' + response);
			}
			})

			.catch(err => {
			console.error(err);
			alert('Gagal menyimpan data');
			});
		}
	});
	</script>



    </body>
    </html>
  `);
});

router.get('/home', (req, res) => {
  const user = req.session.user;
  res.send(`<h2>Selamat Datang ${user.nama} !</h2>`);
});

module.exports = router;
