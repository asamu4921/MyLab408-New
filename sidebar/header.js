const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <div class="flex justify-between w-full">
      <button id="toggleSidebar" class="text-xl">&#9776;</button>
      <a href="/login/logout" class="text-blue-500 hover:underline">Logout</a>
    </div>
  `);
});

module.exports = router;
