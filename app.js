import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import tourRouter from './routes/tourRouter.js';
// import userRouter from './routes/userRouter.js';

const app = express();
dotenv.config();
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);
//
// 2) Connectionto the Database
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log('Connection to the database');
  })
  .catch((err) => console.log(err));

/// (1) GET REQUEST HANDLING
app.use('/api/v1/tours', tourRouter);
// app.use('/api/v1/users', userRouter);

export default app;
