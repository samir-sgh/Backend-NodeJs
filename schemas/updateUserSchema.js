const Joi = require('joi');
const { statuEnums } = require('../enums');
const User = require('../models/User');

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional()
    .external(async (value, helpers) => {
      if (!value) return value;
      const existingUser = await User.findOne({ name: value });
      if (existingUser) {
        throw new Error('Le nom est déjà utilisé.');
      }
      return value;
    }),

  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@attijariwafabank\.com$/)
    .optional()
    .external(async (value, helpers) => {
      if (!value) return value;
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        throw new Error("L'email est déjà utilisé.");
      }
      return value;
    }),
  age: Joi.number().integer().min(18).optional(),
  status: Joi.string().valid(statuEnums.EMPLOYEE, statuEnums.Stagiaire).optional()
});

module.exports = updateUserSchema;
