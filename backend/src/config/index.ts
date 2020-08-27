import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/Booking';
export const SALT = process.env.SALT || 10;
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const NOT_PROTECTED_ROUTES =
  process.env.NOT_PROTECTED_ROUTES || '/api/auth/sign-in|/api/auth/sign-up';
