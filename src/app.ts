import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import eventRoutes from './routes/event.routes';
import bookingRoutes from './routes/booking.routes';

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());
app.use(eventRoutes);
app.use(bookingRoutes);

const mongoUri: string = process.env.MONGO_URI || '';

mongoose.connect(mongoUri).then(() => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT || 2020, () => {
    console.log(Server is running on port ${process.env.PORT || 2020});
  });
}).catch(error => {
  console.error('MongoDB connection error:', error);
});