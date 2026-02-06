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
//1. 회원가입
// 유저가 이메일, 패스워드, 유저 이름 입력해서 보냄
// 받은 정보를 저장함 (데이터베이스 모델 필요)
// 패스워드를 암호화 시켜서 저장

//1. 라우터
//2. 모델
//3. 데이터를 저장 (이미 가입된 유저 유무, 패스워드 암호화)
//4. 응답을 보낸다

//2. 로그인
//이메일 패스워드를 입력해서 보냄
// 데이터베이스에 해당 이메일과 패스워드를 가진 유저가 있는지 확인
//없으면 로그인 실패
//있다면? 유저정보 + 토큰
//프론트 엔드에서는 이 정보를 저장

