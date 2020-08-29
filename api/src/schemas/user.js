import * as Joi from '@hapi/joi';

export const userSchema = Joi.object({
    login: Joi.string().alphanum().min(3).max(255).required(),
    password: Joi.string().pattern(new RegExp('(?=.*[a-zA-Z])(?=.*[0-9])'), { name: 'letters and numbers' }).min(3).max(255).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

export const userIdSchema = Joi.object({
    id: Joi.string().required().guid({ version : 'uuidv1' })
});

export const getUsersQueryParamsSchema = Joi.object({
    limit: Joi.number().min(1).max(100),
    loginSubstring: Joi.string().min(3).max(255)
});
