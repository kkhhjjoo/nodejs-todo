const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {}

userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body
    const user = await User.findOne({ email: email });
    
    if (user) { 
      throw new Error('이미 가입이 된 유저입니다.');
    }
    // 사용자가 없을 때만 해시 생성
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    //새 사용자 생성 및 저장
    const newUser = await User.create({
      email,
      name,
      password: hash
    });
    console.log('hash', hash);
    res.status(200).json({ status: 'success', user: newUser });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: err });

  }
}

userController.loginWithEmail = async (req,res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email },'-createdAt -updatedAt -__v');
    if (user) { 
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) { 
        const token = user.generateToken();
        return res.status(200).json({ status: 'success', user, token });
      }
      throw new Error('아이디 또는 비밀번호가 일치하지 않습니다')
    }
  } catch (error) { 
    res.status(400).json({ status: 'fail', error:error.message });
  }
}
//2-1. 라우터 설정
//2-2. 이메일 패스워드 정보 읽어오기
//2-3. 이메일을 가지고 유저정보 가져오기
//2-4. 이 유저에 디비에 있는 패스워스와 프론트엔드가 보낸 패스워드가 같은지 비교
//2-5. 맞다! 그러면 토큰 발행
//2-6. 틀리면 에러메세지 보냄
//2-7. 응답으로 유저정보 + 토큰 보냄
userController.getUser = async (req, res) => { 
  try {
    const {userId} = req //req.userId
    const user = User.findById(userId);
    if (!user) {
      throw new Error('can not find user');
    }
    res.status(200).json({ status: 'success', user });
  } catch (error) { 
     res.status(400).json({ status: 'fail', error:error.message });
  }
};

module.exports = userController

