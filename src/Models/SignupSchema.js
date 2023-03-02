import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password')
})