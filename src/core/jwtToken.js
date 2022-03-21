import jwt from 'jsonwebtoken';

const JwtToken = async ({ type = 'SignUp', data, expiresIn = '1d' }) => {
  let secret = '';
  if (type === 'SignUp') {
    secret = process.env.SIGNUP_JWT_SECRET
  } else if (type === 'File') {
    secret = process.env.FILE_ACCESS_JWT_SECRET
  }
  const token = await jwt.sign({ data }, 'JWT_REFRESH_TOKEN', { expiresIn: '1y' })
  return token;
}
export default JwtToken