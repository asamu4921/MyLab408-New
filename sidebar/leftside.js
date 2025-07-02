const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <aside class="h-full flex flex-col bg-gray-800 text-white">
      <div class="border-b border-gray-600 p-4">
        <h1 class="text-lg font-bold">MyLab</h1>
        <div class="text-sm text-gray-300">Display Ketersediaan Lab & Dosen</div>
      </div>

      <div class="flex-1 p-4 space-y-1">
        <div class="text-xs text-gray-400 uppercase mb-2">Main Nav</div>

        <a href="/dashboard/home" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">🏠 Home</a>
        <a href="/users/indeks" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">🧩 Users</a>
        <a href="/api/indeks" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">📚 API</a>

        <!-- Tombol trigger -->
        <a href="#" id="toggleMatkul" class="block px-3 py-2 rounded hover:bg-white/10 transition">🏫 Jadwal Mata Kuliah ⏷</a>

        <!-- Sub-list -->
        <ul id="subMatkul" class="ml-6 hidden">
          <li><a href="/matkul/a" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">A</a></li>
          <li><a href="/matkul/b" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">B</a></li>
          <li><a href="/matkul/c" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">C</a></li>
          <!-- dst -->
        </ul>
        <!-- Ruang Lab -->
        <a href="#" id="toggleLab" class="block px-3 py-2 rounded hover:bg-white/10 transition">
          🏫 Ruang Lab ⏷
        </a>

        <!-- Sub-list -->
        <ul id="subLab" class="ml-6 hidden">
          <li><a href="/lab/GU601" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">GU 601 — VR, Game & Simulation</a></li>
          <li><a href="/lab/GU.601" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">GU.601 — Workspace Virtual Reality</a></li>
          <li><a href="/lab/GU.604" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">GU.604 — Workspace Multimedia</a></li>
          <li><a href="/lab/GU.606" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">GU.606 — Workspace Rendering</a></li>
          <li><a href="/lab/GU.607" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">GU.607 — Lab Motion Capture</a></li>
          <li><a href="/lab/GU.608" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">GU.608 — Workspace Rendering</a></li>
          <li><a href="/lab/GU.702" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">GU.702 — Lab Komputer/Praktikum</a></li>
          <li><a href="/lab/GU.704" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">GU.704 — Workspace Software Development</a></li>
          <li><a href="/lab/GU.705" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">GU.705 — Workspace Animation Production</a></li>
          <li><a href="/lab/GU.706" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">GU.706 — Workspace Software Development</a></li>
          <li><a href="/lab/GU.707" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">GU.707 — Workspace Creative Art Studio</a></li>
          <li><a href="/lab/GU.805" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">GU.805 — Workspace Data Science</a></li>
          <li><a href="/lab/RTF.III.1" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">RTF.III.1 — Studio Fotografi</a></li>
          <li><a href="/lab/RTF.III.3" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">RTF.III.3 — Studio Broadcasting</a></li>
          <li><a href="/lab/RTF.III.6" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">RTF.III.6 — Workspace Editing</a></li>
          <li><a href="/lab/RTF.IV.1" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">RTF.IV.1 — Lab Clay Modelling</a></li>
          <li><a href="/lab/RTF.IV.2" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">RTF.IV.2 — Lab Animasi</a></li>
          <li><a href="/lab/RTF.IV.4" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">RTF.IV.4 — Studio Audio</a></li>
          <li><a href="/lab/RTF.V.1" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">RTF.V.1 — Workspace Photogrammetry</a></li>
          <li><a href="/lab/RTF.V.2" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">RTF.V.2 — Workspace GIS</a></li>
          <li><a href="/lab/RTF.V.4" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">RTF.V.4 — Workspace Remote Sensing</a></li>
          <li><a href="/lab/TA.X.3" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">TA.X.3 — Cyber Physical System Security Lab</a></li>
          <li><a href="/lab/TA.X.4" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">TA.X.4 — Workspace Attack and Defense</a></li>
          <li><a href="/lab/TA.XI.3" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">TA.XI.3 — Ruang Kelas</a></li>
          <li><a href="/lab/TA.XI.4a" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">TA.XI.4a — Workspace Data Security and Privacy</a></li>
          <li><a href="/lab/TA.XI.5" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">TA.XI.5 — Workspace Cyber Forensic</a></li>
          <li><a href="/lab/TA.XII.2" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">TA.XII.2 — Pair Programming Lab</a></li>
          <li><a href="/lab/TA.XII.3A" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">TA.XII.3A — Conceive Lab</a></li>
          <li><a href="/lab/TA.XII.3B" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">TA.XII.3B — Workspace</a></li>
          <li><a href="/lab/TA.XII.4" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">TA.XII.4 — Lab Programming</a></li>
          <li><a href="/lab/TP302" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">TP 302 — Mini Theatre</a></li>
          <li><a href="/lab/TP304" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">TP 304 — VRS Setokok</a></li>
          <li><a href="/lab/TP305" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">TP 305 — GDS Rempang — Workspace Multimedia</a></li>
        </ul>

        <!-- Ruang Dosen-->
        <a href="#" id="toggleDosen" class="block px-3 py-2 rounded hover:bg-white/10 transition">🏫 Ruang Dosen ⏷</a>

        <!-- Sub-list -->
        <ul id="subDosen" class="ml-6 hidden">
          <li><a href="/dosen/a" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">Ruang Dosen 1</a></li>
          <li><a href="/dosen/b" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">Ruang Dosen 2</a></li>
          <li><a href="/dosen/c" class="ajax block px-3 py-2 rounded hover:bg-white/10 transition">Ruang Dosen 3</a></li>
          <!-- dst -->
        </ul>
      </div>
    </aside>
  `);
});


module.exports = router;
