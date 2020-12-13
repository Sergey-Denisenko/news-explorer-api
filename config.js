const { JWT_SECRET = 'JWT_SECRET_DEV' } = process.env;
const { MONGODB_URI = 'mongodb://localhost:27017/newsexplorer' } = process.env;

module.exports = { JWT_SECRET, MONGODB_URI };
