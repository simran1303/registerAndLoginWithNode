const Joi = require('joi');


const registerValidation = Joi.object({
    userFirstName : Joi.string().min(4).required(),
    userEmail: Joi.string().email(),
    userPassword: Joi.string().min(6).alphanum(),
    userConfirmPassword: Joi.string().min(6).alphanum(),
    userBio:Joi.string()
  });

const updateValidation = Joi.object({
  userFirstName : Joi.string().min(4).required(),
  userPassword: Joi.string().min(6),
  userBio:Joi.string()
});


const addTaskValidation = Joi.object({
  taskDetail:Joi.string().min(4).required()
})
  module.exports = {registerValidation,updateValidation,addTaskValidation}