const Menu = require('../models/Menu');

const getMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find({});
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, isVegetarian } = req.body;
    
    const menuItem = new Menu({
      name,
      description,
      price,
      imageUrl,
      category,
      isVegetarian
    });

    const createdMenuItem = await menuItem.save();
    res.status(201).json(createdMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, isVegetarian } = req.body;

    const menuItem = await Menu.findById(req.params.id);

    if (menuItem) {
      menuItem.name = name || menuItem.name;
      menuItem.description = description || menuItem.description;
      menuItem.price = price || menuItem.price;
      menuItem.imageUrl = imageUrl || menuItem.imageUrl;
      menuItem.category = category || menuItem.category;
      menuItem.isVegetarian = isVegetarian !== undefined ? isVegetarian : menuItem.isVegetarian;

      const updatedMenuItem = await menuItem.save();
      res.json(updatedMenuItem);
    } else {
      res.status(404);
      throw new Error('Menu item not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);

    if (menuItem) {
      await menuItem.deleteOne();
      res.json({ message: 'Menu item removed' });
    } else {
      res.status(404);
      throw new Error('Menu item not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getMenu, createMenuItem, updateMenuItem, deleteMenuItem };
