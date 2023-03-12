import * as bcrypt from 'bcrypt';
import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import userModel from '../users/user.model';
import UsedEmailException from '../exceptions/UsedEmailException';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import UserDto from '../users/user.dto';
import LoginDto from './login.dto';
import * as fs from 'fs';
import * as path from 'path';
import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import validator from '../middleware/validation.middleware';

class AuthController implements Controller {
  public path = '/auth';
  public router = express.Router();
  private user = userModel;

  constructor() {
    this.initializeRouters();
  }

  private initializeRouters() {
    this.router.post(`${this.path}`, validator(UserDto), this.register);
    this.router.post(`${this.path}/login`, validator(LoginDto), this.login);
  }
  private register = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { name, email, password }: UserDto = req.body;
    const userMatch = await this.user.findOne({ email });
    if (!userMatch) {
      const hashPassword = await bcrypt.hash(password, 7);
      const user = new this.user({
        email,
        name,
        password: hashPassword,
      });
      await user.save();
      user.password = undefined!;
      res.json(user);
    } else {
      next(new UsedEmailException());
    }
  };

  private login = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const payload: LoginDto = req.body;
    const user = await this.user.findOne({ email: payload.email });
    if (!user) {
      next(new UserNotFoundException(payload.email));
    } else {
      const isMatched = await bcrypt.compare(payload.password, user.password);
      if (!isMatched) {
        next(new WrongCredentialsException());
      } else {
        const token = this.generateToken(user.email, user.id);
        res.json({ token });
      }
    }
  };

  private generateToken = (email: string, id: string) => {
    const privateKey = fs.readFileSync(
      // deepcode ignore ArrayMethodOnNonArray: <please specify a reason of ignoring this>, deepcode ignore ArrayMethodOnNonArray: <please specify a reason of ignoring this>
      path.join(__dirname, './../../private.key')
    );
    const payload = {
      email,
      id,
    };
    const signInOptions: SignOptions = {
      algorithm: 'RS256',
      expiresIn: '1d',
    };
    return sign(payload, privateKey, signInOptions);
  };
}

export default AuthController;
