import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { userSchema, userIdSchema, getUsersQueryParamsSchema } from '../validators/users';

export default class UsersRoutes {
    constructor(validator, service) {
        this.controller = new UsersController(service);
        this.validator = validator;
        this.router = Router();
        this.routes();
    }

    routes = () => {
        this.router
            .get('/', this.validator.query(getUsersQueryParamsSchema), this.controller.getUsers)
            .post('/', this.validator.body(userSchema),  this.controller.createUser);

        this.router
            .get('/:id', this.validator.params(userIdSchema), this.controller.getUser)
            .put('/:id', this.validator.params(userIdSchema), this.validator.body(userSchema),  this.controller.updateUser)
            .delete('/:id', this.validator.params(userIdSchema), this.controller.deleteUser);
    }
}
