import express from 'express';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my-app');
})

const server = app.listen(3000);