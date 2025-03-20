import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw Error('Please provide MONGODB_URI in the .env file');
}

async function connectDB(params) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to mongodb.');
  } catch (error) {
    console.log('Mongodb connect error.', error.message);
    process.exit(1);
  }
}

export default connectDB;
