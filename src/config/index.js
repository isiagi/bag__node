import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { DEVELOPMENT, PRODUCTION, LOCAL } from './envTypes';

dotenv.config();

let DB;

switch (process.env.NODE_ENV) {
  case PRODUCTION:
    DB = process.env.DBCONNECTDEVELOPMENT;
    break;
  case DEVELOPMENT:
    DB = process.env.DBCONNECTDEVELOPMENT;
    break;
  case LOCAL:
    DB = process.env.DBCONNECTLOCAL;
    break;

  default:
    DB = process.env.DBCONNECTLOCAL;
    break;
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(DB, options);
    console.log('DB connection established');
  } catch (error) {
    console.log('Error connecting', error.message);
  }

  const db = mongoose.connect;
  return db;
};

export default connectDB;
