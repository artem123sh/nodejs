import { Router } from 'express';
import UserController from '../controllers/userControlles';
import { userSchema, userIdSchema, getUsersQueryParamsSchema } from '../schemas/user';

export default class UserRoutes {
  router;
  userController = new UserController();
  validator;

  constructor(validator) {
      this.validator = validator;
      this.router = Router();
      this.routes();
  }

  routes() {
      this.router
        .get('/', this.validator.query(getUsersQueryParamsSchema), this.userController.getUsers)
        .post('/', this.validator.body(userSchema),  this.userController.addUser);

      this.router
        .get('/:id', this.validator.params(userIdSchema), this.userController.getUser)
        .put('/:id', this.validator.params(userIdSchema), this.validator.body(userSchema),  this.userController.updateUser)
        .delete('/:id', this.validator.params(userIdSchema), this.userController.deleteUser);
  }
}
