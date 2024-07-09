import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import objectRoute from './routes/objectRoute.js';
import cors from 'cors';


const app = express();

// Middleware for parsing request body
app.use(express.json());


app.use(cors());



app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Venderspace Endpoint');
});

app.use('/test', objectRoute);
app.use('/api', userRoutes);
app.use('/api', productsRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
