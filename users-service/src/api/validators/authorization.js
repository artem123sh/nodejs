import * as Joi from '@hapi/joi';

export const loginSchema = Joi.object({
    login: Joi.string().alphanum().min(3).max(255).required(),
    password: Joi.string().pattern(new RegExp('(?=.*[a-zA-Z])(?=.*[0-9])'), { name: 'letters and numbers' }).min(3).max(255).required()
});

export const refreshTokenSchema = Joi.object({
    id: Joi.string().required().guid({ version : 'uuidv1' }).required(),
    refreshToken: Joi.string().required().guid({ version : 'uuidv4' }).required()
});
