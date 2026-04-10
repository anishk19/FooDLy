const User = require('../models/User');

const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { menuId } = req.body;

    const user = await User.findById(userId);
    
    const isFavorited = user.favorites.includes(menuId);
    
    if (isFavorited) {
      user.favorites = user.favorites.filter(id => id.toString() !== menuId.toString());
    } else {
      user.favorites.push(menuId);
    }

    await user.save();
    
    // Optional: Return populated array so frontend can easily use it
    const populatedUser = await User.findById(userId).populate('favorites');
    res.json({ message: 'Favorites updated', favorites: populatedUser.favorites });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getFavorites, toggleFavorite };
