/**
 * Initialize categories for current user
 * POST /api/categories/init
 */

const Category = require('../models/Category');
const defaultCategories = require('../seed/defaultCategories');

const initializeCategories = async (req, res) => {
  try {
    const userId = req.user._id;

    // Check if user already has categories
    const existingCategories = await Category.countDocuments({ user_id: userId });

    if (existingCategories > 0) {
      return res.json({
        success: true,
        message: `You already have ${existingCategories} categories`,
        data: {
          alreadyExists: true,
          count: existingCategories
        }
      });
    }

    // Create default categories for this user
    const userCategories = defaultCategories.map(cat => ({
      user_id: userId,
      name: cat.name,
      type: cat.type,
      icon: cat.icon,
      color: cat.color,
      isDefault: cat.isDefault,
      created_at: new Date(),
      updated_at: new Date()
    }));

    await Category.insertMany(userCategories);

    res.json({
      success: true,
      message: `Successfully created ${userCategories.length} default categories`,
      data: {
        created: true,
        count: userCategories.length
      }
    });
  } catch (error) {
    console.error('Error initializing categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initialize categories'
    });
  }
};

module.exports = {
  initializeCategories
};
