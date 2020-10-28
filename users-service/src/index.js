import { createValidator } from 'express-joi-validation';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
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
import { User, Group, RefreshToken } from './models';
import logger from './utils/logger';
import requestLogger from './api/middlewares/requestLogger';
import AuthenticationRoutes from './api/routes/AuthenticationRoutes';
import AuthenticationService from './services/AuthenticationService';
import AuthorizationService from './services/AuthorizationService';
import verifyTokenWith from './api/middlewares/authorization';
import RefreshTokenRepository from './data-access/refreshTokens/RefreshTokenRepository';

class Server {
    constructor() {
        process.on('uncaughtException', (err) =>  {
            logger.error(err);
            process.exit(1);
        });
        process.on('unhandledRejection', err => {
            logger.error(err);
        });
        this.app = express();
        this.config();
        this.routes();
        this.app.use(errorFormatter);
        this.app.disable('x-powered-by');
    }

    config() {
        this.app.use(cors({ origin: process.env.ORIGIN }));
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
        this.app.use(requestLogger);
    }

    routes() {
        const validator = this.app.get('validator');
        const usersService = new UsersService(new UsersRepository(User, new UsersMapper()));
        const authenticationService = new AuthenticationService(usersService, new RefreshTokenRepository(RefreshToken));
        const authorizationService = new AuthorizationService();
        this.app.use('/users', verifyTokenWith(authorizationService), new UsersRoutes(validator, usersService).router);
        const groupsService = new GroupsService(new GroupsRepository(Group, new GroupsMapper()));
        this.app.use('/groups', verifyTokenWith(authorizationService), new GroupsRoutes(validator, groupsService).router);
        this.app.use('/auth', new AuthenticationRoutes(validator, authenticationService).router);
    }

    start() {
        const port = this.app.get('port');
        (async () => {
            logger.info('Synchronizing Database schemas...');
            await dbSync();
            this.app.listen(port, () => {
                logger.info(`API is running at http://localhost:${port}`);
                logger.info(`Swagger documentation: http://localhost:${port}/api-docs`);
            });
        })();
    }
}

const server = new Server();
server.start();
