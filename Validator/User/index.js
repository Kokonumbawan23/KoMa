const { registerSchema, loginSchema, changePassword, resetPassword } = require("./schema");

function validateRegisterUserSchema(payload) {
    const validateResult = registerSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }

}

function validateLoginUserSchema(payload) {
    const validateResult = loginSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

function validateNewUserSchema(payload) {
    const validateResult = newUser.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

function validateChangePasswordSchema(payload) {
    const validateResult = changePassword.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

function validateResetPasswordSchema(payload) {
    const validateResult = resetPassword.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

module.exports = { validateRegisterUserSchema, validateLoginUserSchema, validateNewUserSchema, validateChangePasswordSchema, validateResetPasswordSchema };