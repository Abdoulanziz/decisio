require('dotenv').config({ path: '/.env' });

const pg = require('pg');
const { Sequelize } = require('sequelize');

const { NODE_ENV, DATABASE_URL } = process.env;

let sequelize;

if(NODE_ENV == "production") { 
  pg.defaults.ssl = true;

  sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else { 
  const nodeEnv = NODE_ENV || 'development';
  const config = require('./config.json')[nodeEnv];
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

module.exports = sequelize;