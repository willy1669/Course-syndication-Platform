import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';

const app = express();

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

export default app;