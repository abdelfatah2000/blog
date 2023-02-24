import express, { Request, Response, Application } from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import errorHandler from './middleware/error.middleware';

class App {
  public app: Application;

  constructor(controllers: any) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.connectDatabase();
    this.initializeErrorMiddleware();
  }
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  private connectDatabase() {
    mongoose.set('strictQuery', false);
    mongoose
      .connect(process.env.CONNECTION_STRING!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions)
      .then(() => console.log('Database Connected'))
      .catch((err) => console.log(err));
  }

  private initializeErrorMiddleware() {
    this.app.use(errorHandler);
  }
}

export default App;
