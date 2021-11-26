// validation
const Joi = require('@hapi/joi');

// Register validation
const registerValidation = data =>{
    const schema = Joi.object({
        userName: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data);
}

// login validation
const loginValidation = (data) => {
    const schema = Joi.object({
    userName: Joi.string().required().min(6),
      password: Joi.string().required().min(6)
    });
  
    return schema.validate(data);
  };

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;