const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5).default('customer');

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role
});

const updateUserSchema = Joi.object({
  email: email,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const recoveryEmail = Joi.object({
  email: email.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema, recoveryEmail }
