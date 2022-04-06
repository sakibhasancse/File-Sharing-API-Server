
import bcrypt from 'bcrypt';

import User from './user-model';
import JwtToken from '../../core/jwtToken'

export const usersRegister = async (users, req, res) => {
  const user = await User.findOne({ email: users.email })
  if (user) {
    return res.status(400).json({
      success: false,
      message: 'Email already exists '
    })
  }
  const password = await bcrypt.hash(users.password, 12)
  const newUser = new User({
    ...users,
    password,

  })
  var result = await newUser.save()

  const accessToken = await JwtToken({
    data: {
      userId: result._id,
      email: result.email
    }, expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRE}`
  });

  const refreshToken = await JwtToken({
    data: {
      userId: result._id
    }, expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRE}`
  });
  if (result) {
    return res.status(201).json({
      success: true,
      user: {
        id: result._id,
        email: result.email,
        name: result.name
      },
      tokens: {
        accessToken,
        refreshToken
      }
    })
  }
  return res.status(400).json({
    success: false,
    message: 'Something went wrong'
  })
}

export const usersLogin = async (users, res) => {

  const { email, password } = users
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Email And Password'
    })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email And Password'
    })
  } else {

    const accessToken = await JwtToken({
      data: {
        userId: user._id,
        email: user.email
      }, expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRE}`
    });

    const refreshToken = await JwtToken({
      data: {
        userId: user._id
      }, expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRE}`
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        name: user.name,
        user: user.email,
      },
      tokens: {
        accessToken,
        refreshToken
      }
    })
  }

}
