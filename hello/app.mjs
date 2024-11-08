import express from 'express';
import connectToDatabase from './helpers.mjs';

const app = express();

app.get('/', (req, res) => {
  res.send('<h2>Chào lớp CTK45!</h2><h2><i>Chúc các bạn thành công</i></h2>');
});

await connectToDatabase();

app.listen(3000);