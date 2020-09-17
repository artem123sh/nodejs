import { createValidator } from 'express-joi-validation';
import express from 'express';
import compression from 'compression';
import 'dotenv/config';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import errorFormatter from './api/middlewares/errorsFormatter';
import { sync as dbSync } from './db/dbConnection';
import UsersRoutes from './api/routes/UsersRoutes';
import UsersService from './services/UsersService';
import UsersMapper from './data-access/users/UsersMapper';
import UsersRepository from './data-access/users/UsersRepository';
import GroupsRoutes from './api/routes/GroupsRoutes';
import GroupsService from './services/GroupsService';
import GroupsMapper from './data-access/groups/GroupsMapper';
import GroupsRepository from './data-access/groups/GroupsRepository';
import { User, Group } from './models';

class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.app.use(errorFormatter);
    }

    config() {
        this.app.set('port', Number(process.env.PORT) || 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(compression());
        this.app.set('validator', createValidator({ passError: true }));
        const options = {
            definition: {
                openapi: '3.0.0',
                into: {
                    title: 'User Service',
                    version: '1.0.0',
                    description: 'User Service'
                },
                servers: [{ url: `http://localhost:${this.app.get('port')}` }]
            },
            apis: ['./src/models/*.js', './src/api/routes/*.js']
        };
        const swaggerSpec = swaggerJSDoc(options);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }

    routes() {
        const validator = this.app.get('validator');
        const usersService = new UsersService(new UsersRepository(User, new UsersMapper()));
        this.app.use('/users', new UsersRoutes(validator, usersService).router);
        const groupsService = new GroupsService(new GroupsRepository(Group, new GroupsMapper()));
        this.app.use('/groups', new GroupsRoutes(validator, groupsService).router);
    }

    start() {
        const port = this.app.get('port');
        (async () => {
            await dbSync();
            this.app.listen(port, () => {
                console.log(`\x1b[32mAPI is running at http://localhost:${port}`);
                console.log(`\x1b[32mSwagger documentation: http://localhost:${port}/api-docs\x1b[0m`);
            });
        })();
    }
}

const server = new Server();
server.start();
