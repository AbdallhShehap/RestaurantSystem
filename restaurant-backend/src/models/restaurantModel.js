const db = require('../config/db');

const Restaurant = {
  getAll: (callback) => {
    const query = 'SELECT * FROM restaurants';
    db.query(query, callback);
  },

  create: (data, callback) => {
    const query = 'INSERT INTO restaurants SET ?';
    db.query(query, data, callback);
  }
};

module.exports = Restaurant;
