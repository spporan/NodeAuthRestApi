const Joi = require("@hapi/joi");


//Create validate fun for validate user

const registrationValidation=(user)=>{
    const validateSchema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required()
    });
    return validateSchema.validate(user)
}

const loginValidation=(user)=>{
    const validateSchema = Joi.object({
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required()
    });
    return validateSchema.validate(user)
}

module.exports.registrationValidation=registrationValidation
module.exports.loginValidation=loginValidation