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

TransactionSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updated_at: new Date() });
  next();
});

TransactionSchema.pre('updateOne', function(next) {
  this.set({ updated_at: new Date() });
  next();
});

module.exports = mongoose.model('Transaction', TransactionSchema);