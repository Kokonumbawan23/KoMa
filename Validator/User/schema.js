const Joi = require("joi");

module.exports = {
    registerSchema: Joi.object({
        email: Joi.string().email().required(),
        fullName: Joi.string().min(2).required(),
        password: Joi.string().min(8).required(),
    }),
    loginSchema: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    }),
    updateProfileUser: Joi.object({
        fullName: Joi.string().min(2).required(),
        height: Joi.number().required(),
        weight: Joi.number().required(),
        phoneNumber: Joi.string().min(10).required(),
    }),   
    changePassword: Joi.object({
        oldPassword: Joi.string().min(8).required(),
        newPassword: Joi.string().min(8).required(),
    }),
    resetPassword: Joi.object({
        password: Joi.string().min(8).required(),
        confirmPassword: Joi.string().min(8).required(),
    })

}