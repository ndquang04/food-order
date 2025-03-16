import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';

const PORT = 8080 || process.env.PORT;

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.PRONTEND_URL,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.get('/', (req, res) => {
  res.json({
    message: 'Server is running',
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running at ', PORT);
  });
});
