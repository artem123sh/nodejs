import storage from '../utils/storage';
import * as Joi from '@hapi/joi';

export default class UserController {
    async getUser(req, res, next) {
        try {
            const user = storage.getItem(req.params.id, { isDeleted: false });
            if (user && !user.isDeleted) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        } catch (e) {
            return next({ error:e });
        }
    }

    async getUsers(req, res, next) {
        try {
            const { limit, loginSubstring } = req.query;
            let users = storage.getItems({ isDeleted: false });
            if (loginSubstring) {
                users = users.filter(({ login }) => login.includes(req.query.loginSubstring));
            }
            users.sort((a, b) => a.login.localeCompare(b.login));
            if (limit) {
                users = users.slice(0, limit);
            }
            res.json(users);
        } catch (e) {
            return next({ error:e });
        }
    }

    async addUser(req, res, next) {
        try {
            const unique = !storage.getItems().some(({ login }) => login === req.body.login);
            Joi.boolean().equal(true).validate(false);
            Joi.assert(unique,  Joi.boolean().equal(true), `Login "${req.body.login}" uniqueness`, { errors: { label: false } });
            res.json(storage.addItem(req.body));
        } catch (e) {
            return next({ error:e });
        }
    }

    async updateUser(req, res, next) {
        try {
            const user = storage.updateItem(req.params.id, req.body, { isDeleted: false });
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        } catch (e) {
            return next({ error:e });
        }
    }

    async deleteUser(req, res, next) {
        try {
            const result = storage.deleteItem(req.params.id);
            if (result) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        } catch (e) {
            return next({ error:e });
        }
    }
}
