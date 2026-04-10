const express = require('express');
const router = express.Router();
const { placeOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, placeOrder)
  .get(protect, getUserOrders);

router.route('/all').get(protect, admin, getAllOrders);
router.route('/:id').put(protect, admin, updateOrderStatus);

module.exports = router;
