import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import * as fs from 'fs';
import * as path from 'path';
import UserModel from '../users/user.model';
import JWTPayload from '../interfaces/jwtToken.interface';

const privateKey = fs.readFileSync(path.join(__dirname, './../../private.key'));
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: privateKey,
  algorithm: ['RS256'],
};
const jwtStrategy = new JwtStrategy(
  options,
  async (payload: JWTPayload, done) => {
    try {
      const user = await UserModel.findById(payload.id);
      if (!user) return done(null, false);
      done(null, user);
    } catch (e) {
      return done(e);
    }
  }
);

export default jwtStrategy;
