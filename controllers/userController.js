const User = require('../models/User.js')

// Recuperer touts les users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id','name', 'email']
      }
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// recuper une seule user

// export const getUserById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findOne({ where: { id } });
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new Error("Utilisateur non trouvé.");
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(error.message === "Utilisateur non trouvé." ? 404 : 500).json({ message: error.message });
  }
};


//Ajouter 

// export const createUser = async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

export const createUser = async (req, res) => {
  try {
    const { name, email, password, age, status } = req.body;

    // const existingUser = await User.findOne({ where: { email } });
    // if (existingUser) {
    //   return res.status(400).json({ error: "L'email est déjà utilisé." });
    // }

    // const existingNameUser = await User.findOne({ where: { name } });
    // if (existingNameUser) {
    //   return res.status(400).json({ error: "Le nom est déjà utilisé." });
    // }
    const existingUser = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ email }, { name }]
      }
    });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ error: "L'email est déjà utilisé." });
      }
      if (existingUser.name === name) {
        return res.status(400).json({ error: "Le nom est déjà utilisé." });
      }
    }


    const newUser = await User.create({
      name,
      email,
      password,
      age,
      status
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès!', user: newUser });

  } catch (error) {
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};


// Modifier

// export const updateUser = async (req, res) => {
//   try {
//     const [updated] = await User.update(req.body, { where: { id: req.params.id } });
//     if (updated) {
//       const updatedUser = await User.findOne({ where: { id: req.params.id } });
//       res.status(200).json(updatedUser);
//     } else {
//       res.status(404).json({ error: 'Utilisateur non trouvé' });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

import User from '../models/User.js';

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, email, age, status } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age;
    if (status) user.status = status;

    await user.save();

    res.status(200).json({ message: "Utilisateur mis à jour avec succès!", user });

  } catch (error) {
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};


// Supprimer

// export const deleteUser = async (req, res) => {
//   try {
//     const deleted = await User.destroy({ where: { id: req.params.id } });
//     if (deleted) {
//       res.status(204).json({ message: 'Utilisateur supprimé' });
//     } else {
//       res.status(404).json({ error: 'Utilisateur non trouvé' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
    await User.destroy({ where: { id: req.params.id } });

    res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });

  } catch (error) {
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};