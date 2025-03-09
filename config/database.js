const { Sequelize } = require('sequelize');
const dotenvFlow = require('dotenv-flow');

// Charger les variables d'environnement
dotenvFlow.config();

// Configuration de Sequelize
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

// Tester la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Exporter l'instance de Sequelize
module.exports = sequelize;