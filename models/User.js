const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const StatuEnums = require('../enums/statuEnums')

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Le nom est obligatoire
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-zA-Z0-9._%+-]+@attijariwafabank\.com$/, // Validation du format de l'email
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // La mot de passe est obligatoire
    validate: {
      isBase64(value) {
        if (value && !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value)) {
          throw new Error('Le mot de passe doit être encodé en Base64.');
        }
      },
    },
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Utilisation de DataTypes.NOW au lieu de Sequelize.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Utilisation de DataTypes.NOW au lieu de Sequelize.NOW
  },
  expiration_date: {
    type: DataTypes.DATE,
    allowNull: true, // Peut être null si l'utilisateur n'a pas de date d'expiration
  },
  status: {
    type: DataTypes.ENUM(
      StatuEnums.EMPLOYEE, 
      StatuEnums.Stagiaire
    ), // Enumération pour le statut
    allowNull: false,
  },
}, {
  tableName: 'users', // Nom de la table en snake_case
  timestamps: false, // Désactive les timestamps automatiques de Sequelize
  underscored: true, // Utilise le snake_case pour les noms de colonnes
});

// Exporter le modèle User
module.exports = User;