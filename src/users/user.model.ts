import * as mongoose from 'mongoose';
import IUser from './user.interface';

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

const userModel: mongoose.Model<IUser> = mongoose.model<IUser>(
  'User',
  userSchema
);

export default userModel;
