// TODO: Category model will be implemented later
// This file is a placeholder for future implementation

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  // TODO: Add category fields
  // name: String,
  // type: String,
  // icon: String,
  // color: String,
  // user_id: ObjectId,
  // is_default: Boolean
}, {
  versionKey: false
});

module.exports = mongoose.model('Category', CategorySchema);