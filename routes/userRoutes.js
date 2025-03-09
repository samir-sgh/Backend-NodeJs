const express = require('express')
const { getUserById, getAllUsers, createUser, updateUser, deleteUser } = require ('../controllers/userController')
const userSchema = require('../schemas/createUserSchemas');
const validateCreateUser = require('../middelware/validateCreateUser')
const validateUpdateUser = require('../middelware/validateUpdateUser')

const router = express.Router()


router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', validateCreateUser, createUser);
router.put('/:id', validateUpdateUser, updateUser);
router.delete('/:id', deleteUser);

module.exports = router