const updateUserSchema = require('../schemas/updateUserSchema');

const validateUpdateUser = async (req, res, next) => {
  try {
    await updateUserSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ errors: error.details ? error.details.map(err => err.message) : error.message });
  }
};

module.exports = validateUpdateUser;
