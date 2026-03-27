const User = require('../models/User');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;
const ADMIN_USERNAME = '7270_root';

const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password_hash');
  return user;
};

const updateUsername = async (userId, newUsername) => {
  const existingUser = await User.findOne({ 
    username: newUsername, 
    _id: { $ne: userId } 
  });
  
  if (existingUser) {
    throw new Error('Username already exists');
  }
  
  if (newUsername.length < 3) {
    throw new Error('Username must be at least 3 characters');
  }
  
  const user = await User.findByIdAndUpdate(
    userId,
    { 
      username: newUsername,
      updated_at: new Date()
    },
    { new: true, runValidators: true }
  ).select('-password_hash');
  
  return user;
};

const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
  
  if (!isPasswordValid) {
    throw new Error('Current password is incorrect');
  }
  
  if (newPassword.length < 6) {
    throw new Error('New password must be at least 6 characters');
  }
  
  const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  
  user.password_hash = newPasswordHash;
  user.updated_at = new Date();
  await user.save();
  
  return { success: true };
};

const deactivateAccount = async (userId) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  if (user.username === ADMIN_USERNAME) {
    throw new Error('Admin account cannot be deactivated');
  }
  
  user.is_active = false;
  user.updated_at = new Date();
  await user.save();
  
  return user;
};

module.exports = {
  getUserProfile,
  updateUsername,
  changePassword,
  deactivateAccount
};