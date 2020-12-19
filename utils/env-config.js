require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET = 'JWT_SECRET',
  PORT = 3000,
  MONGODB = 'mongodb://localhost:27017/news',
} = process.env;

module.exports = {
  NODE_ENV, JWT_SECRET, PORT, MONGODB,
};
