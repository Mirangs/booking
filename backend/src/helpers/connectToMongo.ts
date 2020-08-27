import mongoose from 'mongoose';

import { MONGO_URI } from '../config';

const connectToMongo = async () => {
  try {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    mongoose.connection.on('error', (err) => {
      `Connection error: ${err}`;
    });

    mongoose.connection.once('open', () => {
      console.log('Connected to Mongo');
    });
  } catch (err) {
    throw new Error(err);
  }
};

export default connectToMongo;
