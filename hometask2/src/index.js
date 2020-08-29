import { createValidator } from 'express-joi-validation';
import express from 'express';
import compression from 'compression';
import UserRoutes from './routes/userRoutes';
import errorFormatter from './middleware/errorFormatter';

class Server {
  app;

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
      this.app.use('/users', new UserRoutes(this.app.get('validator')).router);
  }

  start() {
      const port = this.app.get('port');
      this.app.listen(port, () => {
          console.log('API is running at http://localhost:%d', port);
      });
  }
}

const server = new Server();
server.start();
