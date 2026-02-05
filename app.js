const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

const app = express();
app.use(bodyParser.json());
app.use("/api", indexRouter)
const mongoURI = `mongodb+srv://hyunjoo:2nf1c8uyu%21@cluster0.4fc3zwl.mongodb.net/todo-demo`;

mongoose.connect(mongoURI).then(() => { console.log('mongoose connected') }).catch((err) => { console.log('DB connection fail', err) });

app.listen(5000, () => {
  console.log('server on 5000');
});