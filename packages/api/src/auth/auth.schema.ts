import * as joi from 'joi';

export const userRegisterCredentialsSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().min(8).required(),
  email: joi.string().email().required(),
});

export const userLogInCredentialSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().min(8).required(),
});
