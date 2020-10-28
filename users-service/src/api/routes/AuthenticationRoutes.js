import { Router } from 'express';
import AuthenticationController from '../controllers/AuthenticationController';
import { loginSchema, refreshTokenSchema } from '../validators/authorization';

/**
* @swagger
* tags:
*   name: Authentication Service
*/

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 */

export default class AuthenticationRoutes {
    constructor(validator, service) {
        this.controller = new AuthenticationController(service);
        this.validator = validator;
        this.router = Router();
        this.routes();
    }

    routes = () => {
        this.router
            /**
            * @swagger
            * /auth/login:
            *   post:
            *     description: Authentications user
            *     requestBody:
            *       required: true
            *       content:
            *         application/json:
            *           schema:
            *             Authentication:
            *             type: object
            *             properties:
            *               login:
            *                 type: string
            *               password:
            *                 type: string
            *     tags:
            *       - Authentication Service
            *     produces:
            *       - application/json
            *     responses:
            *       200:
            *         description: Ok
            */
            .post('/login', this.validator.body(loginSchema), this.controller.login)
            /**
            * @swagger
            * /auth/refreshToken:
            *   post:
            *     description: Refreshs user's access token
            *     requestBody:
            *       required: true
            *       content:
            *         application/json:
            *           schema:
            *             Authentication:
            *             type: object
            *             properties:
            *               refreshToken:
            *                 type: string
            *     tags:
            *       - Authentication Service
            *     produces:
            *       - application/json
            *     responses:
            *       204:
            *         description: No Content
            */
            .post('/refreshToken', this.validator.body(refreshTokenSchema), this.controller.refreshToken);
    }
}
