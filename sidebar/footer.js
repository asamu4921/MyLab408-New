const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`<small class="text-gray-600">&copy; MyLab - 2025</small>`);
});

module.exports = router;
