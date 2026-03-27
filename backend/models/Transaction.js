const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  transaction_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

TransactionSchema.pre('findOneAndUpdate', async function() {
  this.set({ updated_at: new Date() });
});

TransactionSchema.pre('updateOne', async function() {
  this.set({ updated_at: new Date() });
});

module.exports = mongoose.model('Transaction', TransactionSchema);