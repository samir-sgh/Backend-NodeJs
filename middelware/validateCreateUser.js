const createUserSchema = require('../schemas/createUserSchemas');

const validateCreateUser = async (req, res, next) => {
  try {
    await createUserSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ errors: error.details ? error.details.map(err => err.message) : error.message });
  }
};

module.exports = validateCreateUser;