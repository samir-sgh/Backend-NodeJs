const express = require('express');
const cors = require('cors');
const dotenvFlow = require('dotenv-flow');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes')



// Charger les variables d'environnement
dotenvFlow.config();

// Initialiser Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Synchroniser la base de données
sequelize.sync({ force: true })
  .then(() => {
    console.log('Base de données synchronisée');
  })
  .catch((error) => {
    console.error('Erreur de synchronisation de la base de données :', error);
  });

//api
app.use('/api/users', userRoutes)

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Le serveur en ${NODE_ENV} est démarré sur http://localhost:${PORT} `);
});