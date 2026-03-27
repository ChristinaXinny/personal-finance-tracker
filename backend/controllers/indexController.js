const { initializeDatabase } = require('../services/initService');

/**
 * POST /api/init - initialize database
 * create users collection and admin user
 */
const initDBController = async (req, res) => {
  try {
    const result = await initializeDatabase();
    
    res.status(200).json({
      success: true,
      message: result.message,
      data: {
        collection_created: result.collectionCreated,
        admin_created: result.adminCreated,
        admin: result.adminInfo
      }
    });
    
  } catch (error) {
    console.error('Database initialization error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Database initialization failed',
      error: error.message
    });
  }
};

module.exports = {
  initDBController
};