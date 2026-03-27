const Transaction = require('../models/Transaction');

const getTransactions = async (userId, filters = {}) => {
  const query = { user_id: userId };
  
  if (filters.type) {
    query.type = filters.type;
  }
  
  if (filters.category) {
    query.category = filters.category;
  }
  
  if (filters.startDate) {
    query.transaction_date = { $gte: new Date(filters.startDate) };
  }
  
  if (filters.endDate) {
    query.transaction_date = { 
      ...query.transaction_date,
      $lte: new Date(filters.endDate)
    };
  }
  
  const transactions = await Transaction.find(query)
    .sort({ transaction_date: -1 });
  
  return transactions;
};

const getTransactionById = async (id, userId) => {
  const transaction = await Transaction.findOne({ _id: id, user_id: userId });
  return transaction;
};

const createTransaction = async (userId, data) => {
  const transaction = new Transaction({
    user_id: userId,
    type: data.type,
    amount: data.amount,
    category: data.category,
    description: data.description || '',
    transaction_date: data.transaction_date || new Date(),
    created_at: new Date(),
    updated_at: new Date()
  });
  
  await transaction.save();
  return transaction;
};

const updateTransaction = async (id, userId, data) => {
  const transaction = await Transaction.findOneAndUpdate(
    { _id: id, user_id: userId },
    {
      type: data.type,
      amount: data.amount,
      category: data.category,
      description: data.description || '',
      transaction_date: data.transaction_date,
      updated_at: new Date()
    },
    { new: true, runValidators: true }
  );
  
  return transaction;
};

const deleteTransaction = async (id, userId) => {
  const result = await Transaction.findOneAndDelete({ _id: id, user_id: userId });
  return result;
};

module.exports = {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
};