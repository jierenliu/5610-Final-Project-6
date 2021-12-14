import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './product/productRouter.js';
import userRouter from './user/userRouter.js';
import orderRouter from './order/orderRouter.js';
import uploadRouter from './utils/uploadRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);


app.get('/api/config/google', (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || '');
});
const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 4000;


app.listen(port);