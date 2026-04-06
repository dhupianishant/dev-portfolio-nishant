import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logRoutes from './routes/logRoutes.js';
import logger from './logger.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/log', logRoutes);

app.get('/', (req, res) => { // Root route for testing
     logger.info({
          type: "SYSTEM",
          message: "Root route hit"
     });

     res.send("API running");
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error:', err));

app.listen(5000, () => {
     console.log('Server is running on port 5000');
});