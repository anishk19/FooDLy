const express = require('express');
const router = express.Router();
const { getFavorites, toggleFavorite } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/favorites')
  .get(protect, getFavorites)
  .post(protect, toggleFavorite);

module.exports = router;
