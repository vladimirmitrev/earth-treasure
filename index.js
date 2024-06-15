const express = require('express');
const routes = require('./routes');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const { authMiddleware } = require('./middlewares/authMiddleware');

const app = express();

app.use(express.static('static'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware);

app.engine('hbs', handlebars.engine({
  extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.use(routes);

//ToDo change database name
mongoose.connect('mongodb://localhost:27017/earth-treasure');

mongoose.connection.on('connected', () => console.log('DB is connected!'));
mongoose.connection.on('disconnected', () => console.log('DB is DISconnected!'));
mongoose.connection.on('error', (err) => console.log(err));

app.listen(3000, () =>
  console.log('App is listening on http://localhost:3000')
);