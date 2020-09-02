import { createValidator } from 'express-joi-validation';
import express from 'express';
import compression from 'compression';
import 'dotenv/config';
import UsersRoutes from './api/routes/UsersRoutes';
import errorFormatter from './api/middlewares/errorsFormatter';
import { sync as dbSync } from './db/dbConnection';
import UsersService from './services/UsersService';
import UsersMapper from './data-access/UsersMapper';
import UsersRepository from './data-access/UsersRepository';
import User from './models/user';

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
    }

    routes() {
        this.app.use('/users', new UsersRoutes(
            this.app.get('validator'), new UsersService(new UsersRepository(User, new UsersMapper()))
        ).router);
    }

    start() {
        const port = this.app.get('port');
        (async () => {
            await dbSync();
            this.app.listen(port, () => console.log('API is running at http://localhost:%d', port));
        })();
    }
}

const server = new Server();
server.start();
