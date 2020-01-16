import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import chalk from 'chalk';
import userRoute from './routes/userRoute';
import courseRoute from './routes/courseRoute';
import courseModuleRoute from './routes/courseModuleRoute';

const app = express();

//enable CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to course syndication platform!' });
});

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

//connecting to mongoDB database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://skillsfundafrica:houston2016@cluster0-3aajx.mongodb.net/test', { useCreateIndex: true })
  .then(() => console.log(chalk.blue('mongod Db connected')))
  .catch((err) => console.log(chalk.blue(err)));



app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/user', userRoute);
app.use('/course', courseRoute);
app.use('/courseModule', courseModuleRoute);

export default app;