import * as Joi from '@hapi/joi';
import { GROUP_PERMISSIONS } from '../../utils/constants';

export const groupSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(255).required(),
    permissions: Joi.string().valid(...GROUP_PERMISSIONS).required()
});

export const groupIdSchema = Joi.object({
    id: Joi.string().required().guid({ version : 'uuidv1' })
});

export const groupUsersSchema = Joi.object({
    userIds: Joi.array().items(Joi.string().guid({ version : 'uuidv1' })).required()
});
