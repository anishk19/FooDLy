const Order = require('../models/Order');

const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress, phone } = req.body;

    if (items && items.length === 0) {
      res.status(400);
      throw new Error('No order items');
      return;
    } else {
      const order = new Order({
        user: req.user._id,
        items,
        totalAmount,
        deliveryAddress,
        phone
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.menuItem');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'username email').populate('items.menuItem');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { placeOrder, getUserOrders, getAllOrders, updateOrderStatus };
