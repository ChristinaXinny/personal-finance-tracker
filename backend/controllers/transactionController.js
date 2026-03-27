const transactionService = require('../services/transactionService');

const getTransactions = async (req, res) => {
  try {
    const userId = req.user._id;
    const filters = {
      type: req.query.type,
      category: req.query.category,
      startDate: req.query.startDate,
      endDate: req.query.endDate
    };
    
    const transactions = await transactionService.getTransactions(userId, filters);
    
    res.status(200).json({
      success: true,
      data: transactions,
      total: transactions.length
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions',
      error: error.message
    });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    
    const transaction = await transactionService.getTransactionById(id, userId);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction',
      error: error.message
    });
  }
};

const createTransaction = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type, amount, category, description, transaction_date } = req.body;
    
    if (!type || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: 'Type, amount and category are required'
      });
    }
    
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }
    
    const transaction = await transactionService.createTransaction(userId, {
      type,
      amount,
      category,
      description,
      transaction_date
    });
    
    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: transaction
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create transaction',
      error: error.message
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { type, amount, category, description, transaction_date } = req.body;
    
    const existingTransaction = await transactionService.getTransactionById(id, userId);
    
    if (!existingTransaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
    
    const transaction = await transactionService.updateTransaction(id, userId, {
      type: type || existingTransaction.type,
      amount: amount || existingTransaction.amount,
      category: category || existingTransaction.category,
      description: description !== undefined ? description : existingTransaction.description,
      transaction_date: transaction_date || existingTransaction.transaction_date
    });
    
    res.status(200).json({
      success: true,
      message: 'Transaction updated successfully',
      data: transaction
    });
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update transaction',
      error: error.message
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    
    const transaction = await transactionService.deleteTransaction(id, userId);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Transaction deleted successfully'
    });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete transaction',
      error: error.message
    });
  }
};

module.exports = {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
};