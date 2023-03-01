import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required(),
    confirmPassword: Joi.ref('password')
})