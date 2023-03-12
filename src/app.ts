import express, { Request, Response, Application } from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/error.middleware';
import mongoSanitize from 'express-mongo-sanitize';
import jwtStrategy from './middleware/passport';
import passport from 'passport';


class App {
  public app: Application;

  constructor(controllers: any) {
    this.app = express();
    this.connectDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorMiddleware();
  }
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(mongoSanitize());
    this.app.use(cookieParser());
    this.app.use(passport.initialize());
    passport.use(jwtStrategy);
  }

  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(
        `Example app listening at http://localhost:${process.env.PORT}`
      );
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
