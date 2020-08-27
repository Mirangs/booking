import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { IRole } from './role';
import { SALT, JWT_SECRET } from '../config';

export interface IUserSchema extends Document {
  email: string;
  password: string;
  role_id: IRole['id'];
  token?: string;
  first_name: string;
  last_name: string;
  validatePassword: (data: string) => Promise<boolean>;
  generateAuthToken: () => Promise<string>;
}

const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Role',
    },
    token: {
      type: String,
      default: '',
    },
  },
  { collection: 'users' }
);

UserSchema.pre<IUserSchema>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(+SALT);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function (data: string) {
  return bcrypt.compare(data, this.password);
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ id: this._id }, JWT_SECRET);
  user.token = token;
  await user.save();

  return token;
};

export default mongoose.model<IUserSchema>('User', UserSchema);
