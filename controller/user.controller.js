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

module.exports = userController