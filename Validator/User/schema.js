const Joi = require("joi");

module.exports = {
    registerSchema: Joi.object({
        email: Joi.string().email().requied(),
        fullName: Joi.string().min(4).required(),
        password: Joi.string().min(8).requied(),
    }),
    loginSchema: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    }),
    newUserSchema: Joi.object({
        fullName: Joi.string().min(4).required(),
        height: Joi.number().required(),
        weight: Joi.number().required(),
        noHP: Joi.string().min(10).required(),
    }),   
}