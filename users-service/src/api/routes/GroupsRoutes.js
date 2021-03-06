import { Router } from 'express';
import GroupsController from '../controllers/GroupsController';
import { groupSchema, groupIdSchema, groupUsersSchema } from '../validators/groups';

/**
* @swagger
* tags:
*   name: Groups Service
*/

/**
 * @swagger
 *  components:
 *    schemas:
 *      Group:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          permissions:
 *            type: string
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      GroupUsers:
 *        type: object
 *        properties:
 *          userIds:
 *            type: array
 *            items:
 *              type: string
 */

export default class GroupsRoutes {
    constructor(validator, service) {
        this.controller = new GroupsController(service);
        this.validator = validator;
        this.router = Router();
        this.routes();
    }

    routes = () => {
        this.router
            /**
            * @swagger
            * /groups:
            *   get:
            *     security:
            *       - bearerAuth: []
            *     description: Returns list of existing groups
            *     tags:
            *       - Groups Service
            *     produces:
            *       - application/json
            *     responses:
            *       200:
            *         description: Ok
            */
            .get('/', this.controller.getGroups)
            /**
            * @swagger
            * /groups:
            *   post:
            *     security:
            *       - bearerAuth: []
            *     description: Creates a new group
            *     requestBody:
            *       required: true
            *       content:
            *         application/json:
            *           schema:
            *             $ref: '#/components/schemas/Group'
            *     tags:
            *       - Groups Service
            *     produces:
            *       - application/json
            *     responses:
            *       201:
            *         description: Created
            */
            .post('/', this.validator.body(groupSchema),  this.controller.createGroup);

        this.router
            /**
            * @swagger
            * /groups/{id}:
            *   get:
            *     security:
            *       - bearerAuth: []
            *     description: Returns a group with provided id
            *     parameters:
            *       - in: path
            *         required: true
            *         name: id
            *         description: id of a group
            *         type: string
            *     tags:
            *       - Groups Service
            *     produces:
            *        - application/json
            *     responses:
            *       200:
            *         description: Ok
            */
            .get('/:id', this.validator.params(groupIdSchema), this.controller.getGroup)
            /**
            * @swagger
            * /groups/{id}:
            *   put:
            *     security:
            *       - bearerAuth: []
            *     description: Updates a group with provided id
            *     parameters:
            *       - in: path
            *         required: true
            *         name: id
            *         description: id of a group
            *         type: string
            *     requestBody:
            *       required: true
            *       content:
            *         application/json:
            *           schema:
            *             $ref: '#/components/schemas/Group'
            *     tags:
            *       - Groups Service
            *     produces:
            *        - application/json
            *     responses:
            *       200:
            *         description: Ok
            */
            .put('/:id', this.validator.params(groupIdSchema), this.validator.body(groupSchema),  this.controller.updateGroup)
            /**
            * @swagger
            * /groups/{id}:
            *   delete:
            *     security:
            *       - bearerAuth: []
            *     description: Deletes a group with provided id
            *     parameters:
            *       - in: path
            *         required: true
            *         name: id
            *         description: id of a group
            *         type: string
            *     tags:
            *       - Groups Service
            *     produces:
            *        - application/json
            *     responses:
            *       204:
            *         description: No content
            */
            .delete('/:id', this.validator.params(groupIdSchema), this.controller.deleteGroup)
            /**
            * @swagger
            * /groups/{id}/addUsers:
            *   post:
            *     security:
            *       - bearerAuth: []
            *     description: Deletes a group with provided id
            *     parameters:
            *       - in: path
            *         required: true
            *         name: id
            *         description: id of a group
            *         type: string
            *     requestBody:
            *       required: true
            *       content:
            *         application/json:
            *           schema:
            *             $ref: '#/components/schemas/GroupUsers'
            *     tags:
            *       - Groups Service
            *     produces:
            *        - application/json
            *     responses:
            *       204:
            *         description: No content
            */
            .post('/:id/addUsers', this.validator.params(groupIdSchema), this.validator.body(groupUsersSchema), this.controller.addUsersToGroup);
    }
}
