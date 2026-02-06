const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const indexRouter = require('./routes/index');

const app = express();

// CORS 설정 - Netlify 도메인 허용
app.use(cors({
  origin: [
    'https://todoapp-hj.netlify.app',  // Netlify 프로덕션
    'http://localhost:3000'             // 로컬 개발
  ],
  credentials: true
}));

app.use(express.json());

app.use(bodyParser.json());
app.use(cors());
app.use("/api", indexRouter)
const mongoURI = process.env.MONGODB_URI;

console.log('mongouri', mongoURI);

mongoose.connect(mongoURI).then(() => { console.log('mongoose connected') }).catch((err) => { console.log('DB connection fail', err) });

app.listen(process.env.PORT || 5000, () => {
  console.log('server on 5000');
});