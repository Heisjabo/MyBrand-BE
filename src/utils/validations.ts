import Joi from "joi"

export const blogSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required()
})

export const querySchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    message: Joi.string().max(1000).required(),
});


export const userSchema = Joi.object({
    name: Joi.string().min(4).max(12).required(),
    email: Joi.string().email().trim().required(),
    role: Joi.string().trim(),
    password: Joi.string().trim().required()
})

export const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})