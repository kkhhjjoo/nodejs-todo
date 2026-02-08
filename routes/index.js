const express = require('express');
const cors = require('cors');
const router = express.Router();
const taskApi = require('./task.api');
const userApi = require('./user.api');

const app = express();

// CORS 설정 - 이 부분을 수정하세요!
const corsOptions = {
  origin: [
    'https://todoapp-hj.netlify.app',  // 프론트엔드 URL
    'http://localhost:3000'             // 로컬 개발용
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

router.use('/tasks', taskApi);
router.use('/user', userApi);

module.exports = router;