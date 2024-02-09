const Joi = require('joi');


const userJoiSchema = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().min(3).max(100).required(),
  phone: Joi.string().required(),
  password: Joi.string().min(6).required(),
  profilePicture: Joi.object({
    data: Joi.binary(),
    contentType: Joi.string(),
  }),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  transactions: Joi.array().items(Joi.objectId()), 
  role: Joi.string().valid('admin', 'user', 'superAdmin').default('admin'),
});

module.exports = userJoiSchema;


