const knex = require('knex');

const knexConfig = require('../knexfile.js');
const dbENV = process.env.db_ENV || 'development';
module.exports = knex(knexConfig[dbENV]);