const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password_hash: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  versionKey: false
});

UserSchema.pre('findOneAndUpdate', async function() {
  this.set({ updated_at: new Date() });
});

UserSchema.pre('updateOne', async function() {
  this.set({ updated_at: new Date() });
});

module.exports = mongoose.model('User', UserSchema);