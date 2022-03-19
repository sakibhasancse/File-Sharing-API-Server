
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from './user-model';

export const usersRagister = async (users, req, res) => {
  const user = await User.findOne({ phone: users.phone })
  if (user) {
    return res.status(400).json({
      success: false,
      message: 'Phone Number already exists '
    })
  }
  const password = await bcrypt.hash(users.password, 12)
  const newUser = new User({
    ...users,
    password,

  })
  const result = await newUser.save()
  if (result) {
    return res.status(201).json({
      success: true,
      result,
      message: `${result.role} Created successfully`
    })
  }
  return res.status(400).json({
    success: false,
    message: 'Somthing went wrong'
  })


}

export const usersLogin = async (users, res) => {

  const { phone, password } = users
  const userPhone = await User.findOne({ phone })
  if (!userPhone) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Phone And Password'
    })
  }

  const isMatch = await bcrypt.compare(password, userPhone.password)
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Phone And Password'
    })
  } else {
    let token = jwt.sign({
      userId: userPhone._id,
      role: userPhone.role,
      phone: userPhone.phone,
      password: userPhone.password
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIR })

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      name: userPhone.name,
      phone: userPhone.phone,
      token: `Bearer ${token}`
    })
  }

}
