import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { userSchema, userIdSchema, getUsersQueryParamsSchema } from '../validators/users';

/**
* @swagger
* tags:
*   name: Users Service
*/

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          login:
 *            type: string
 *          password:
 *            type: string
 *          age:
 *            type: number
 */

export default class UsersRoutes {
    constructor(validator, service) {
        this.controller = new UsersController(service);
        this.validator = validator;
        this.router = Router();
        this.routes();
    }

    routes = () => {
        this.router
            /**
            * @swagger
            * /users:
            *   get:
            *     security:
            *       - bearerAuth: []
            *     description: Returns list of existing users
            *     parameters:
            *       - in: query
            *         name: limit
            *         description: sets max number of returned users
            *         type: number
            *       - in: query
            *         name: loginSubstring
            *         description: filters users by provided include users who's login matchs the provided loginSubstring
            *         type: string
            *     tags:
            *       - Users Service
            *     produces:
            *       - application/json
            *     responses:
            *       200:
            *         description: Ok
            */
            .get('/', this.validator.query(getUsersQueryParamsSchema), this.controller.getUsers)
            /**
            * @swagger
            * /users:
            *   post:
            *     security:
            *       - bearerAuth: []
            *     description: Creates a new user
            *     requestBody:
            *       required: true
            *       content:
            *         application/json:
            *           schema:
            *             $ref: '#/components/schemas/User'
            *     tags:
            *       - Users Service
            *     produces:
            *       - application/json
            *     responses:
            *       201:
            *         description: Created
            */
            .post('/', this.validator.body(userSchema),  this.controller.createUser);

        this.router
            /**
            * @swagger
            * /users/{id}:
            *   get:
            *     security:
            *       - bearerAuth: []
            *     description: Returns a user with provided id
            *     parameters:
            *       - in: path
            *         required: true
            *         name: id
            *         description: id of a user
            *         type: string
            *     tags:
            *       - Users Service
            *     produces:
            *        - application/json
            *     responses:
            *       200:
            *         description: Ok
            */
            .get('/:id', this.validator.params(userIdSchema), this.controller.getUser)
            /**
            * @swagger
            * /users/{id}:
            *   put:
            *     security:
            *       - bearerAuth: []
            *     description: Updates a user with provided id
            *     parameters:
            *       - in: path
            *         required: true
            *         name: id
            *         description: id of a user
            *         type: string
            *     requestBody:
            *       required: true
            *       content:
            *         application/json:
            *           schema:
            *             $ref: '#/components/schemas/User'
            *     tags:
            *       - Users Service
            *     produces:
            *        - application/json
            *     responses:
            *       200:
            *         description: Ok
            */
            .put('/:id', this.validator.params(userIdSchema), this.validator.body(userSchema),  this.controller.updateUser)
            /**
            * @swagger
            * /users/{id}:
            *   delete:
            *     security:
            *       - bearerAuth: []
            *     description: Deletes a user with provided id
            *     parameters:
            *       - in: path
            *         required: true
            *         name: id
            *         description: id of a user
            *         type: string
            *     tags:
            *       - Users Service
            *     produces:
            *        - application/json
            *     responses:
            *       204:
            *         description: No content
            */
            .delete('/:id', this.validator.params(userIdSchema), this.controller.deleteUser);
    }
}
