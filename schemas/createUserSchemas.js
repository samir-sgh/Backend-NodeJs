const Joi = require('joi')
const { statuEnums } = require('../enums/statuEnums');
const User = require('../models/User');

// const userSchema = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   email: Joi.string()
//   .email()
//   .pattern(/^[a-zA-Z0-9._%+-]+@attijariwafabank\.com$/)
//   .required()
//   .message({
//     "string.pattern.base": "respecter cette format exemple@attijariwafabank.com",
//     "string.email": "email n'est pas accepter",
//     "any.required": "email est necessaire"
//   }),
//   password: Joi.string().min(6).required(),
//   age: Joi.number().integer().min(18).optional()
// });

// module.exports = userSchema;

const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required()
  .message({
      "any.required": "L'name est nécessaire"
  }),
  email: Joi.string().email()
    .pattern(/^[a-zA-Z0-9._%+-]+@attijariwafabank\.com$/).required()
    .message({
      "string.pattern.base": "L'email doit respecter ce format: exemple@attijariwafabank.com",
      "string.email": "L'email n'est pas valide",
      "any.required": "L'email est nécessaire"
    }),
  password: Joi.string().min(6).required()
  .pattern(base64Regex)
  .message("Le mot de passe doit être encodé en Base64."),
  age: Joi.number().integer().min(18).optional(),
  status: Joi.string().valid(statuEnums.EMPLOYEE, statuEnums.STAGIAIRE).required()
});

module.exports = createUserSchema;