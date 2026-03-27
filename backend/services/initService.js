const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const SALT_ROUNDS = 10;
const ADMIN_USERNAME = '7270_root';
const ADMIN_PASSWORD = '123456';

/**
 * check if users collection exists
 */
const checkCollectionExists = async () => {
  const db = mongoose.connection?.db;
  if (!db) return false;

  const collectionName = User.collection.name; // "users"
  const existing = await db.listCollections({ name: collectionName }).toArray();
  
  return existing.length > 0;
};

/**
 * create users collection
 */
const createUserCollection = async () => {
  const db = mongoose.connection?.db;
  if (!db) throw new Error('Database connection not established');

  const collectionName = User.collection.name;
  
  try {
    await db.createCollection(collectionName, {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['username', 'password_hash'],
          properties: {
            username: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            password_hash: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            created_at: {
              bsonType: 'date',
              description: 'must be a date'
            },
            updated_at: {
              bsonType: 'date',
              description: 'must be a date'
            },
            is_active: {
              bsonType: 'bool',
              description: 'must be a boolean'
            }
          }
        }
      }
    });
    
    // create unique index
    await User.init();  
    console.log('Users collection created with indexes');
    
  } catch (err) {
    // handle concurrent creation
    if (err?.codeName === 'NamespaceExists' || /already exists/i.test(err?.message || '')) {
      console.log('Users collection already exists (created by another request)');
      return;
    }
    throw err;
  }
};

/**
 * check if admin user exists
 */
const checkAdminExists = async () => {
  const admin = await User.findOne({ username: ADMIN_USERNAME });
  return admin !== null;
};

/**
 * create admin user
 */
const createAdminUser = async () => {
  // hash password
  const password_hash = await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS);
  
  const admin = new User({
    username: ADMIN_USERNAME,
    password_hash: password_hash,
    created_at: new Date(),
    updated_at: new Date(),
    is_active: true
  });
  
  await admin.save();
  console.log('Admin user created:', ADMIN_USERNAME);
  
  return {
    _id: admin._id,
    username: admin.username,
    created_at: admin.created_at,
    is_active: admin.is_active
  };
};

const initializeDatabase = async () => {
  const result = {
    collectionCreated: false,
    adminCreated: false,
    adminInfo: null,
    message: ''
  };
  
  // 1. check if collection exists
  const collectionExists = await checkCollectionExists();
  
  if (!collectionExists) {
    await createUserCollection();
    result.collectionCreated = true;
    result.message += 'Users collection created. ';
  } else {
    result.message += 'Users collection already exists. ';
  }
  
  // 2. check if admin user exists and create if not
  const adminExists = await checkAdminExists();
  
  if (!adminExists) {
    const adminInfo = await createAdminUser();
    result.adminCreated = true;
    result.adminInfo = adminInfo;
    result.message += `Admin user "${ADMIN_USERNAME}" created.`;
  } else {
    result.message += `Admin user "${ADMIN_USERNAME}" already exists.`;
  }
  
  return result;
};

module.exports = {
  initializeDatabase,
  checkCollectionExists,
  createUserCollection,
  checkAdminExists,
  createAdminUser
};