import jwt from 'jsonwebtoken';

const JwtToken = async ({ type = 'SignUp', data, expiresIn = '1d' }) => {
  let secret = '';
  if (type === 'SignUp') {
    secret = process.env.SIGNUP_JWT_SECRET
  } else if (type === 'File') {
    secret = process.env.FILE_ACCESS_JWT_SECRET
  }
  const token = await jwt.sign({ data }, secret, { expiresIn })
  return token;
}

export const verifyToken = async ({ type = 'SignUp', token }) => {
  try {
    let secret = '';
    if (type === 'SignUp') {
      secret = process.env.SIGNUP_JWT_SECRET
    } else if (type === 'File') {
      secret = process.env.FILE_ACCESS_JWT_SECRET
    }
    console.log(secret)
    return await jwt.verify(token, secret, (err, decoded) => {
      console.log({ err, decoded })
      if (err) {
        return {
          error: err || 'Token expires'
        };
      }
      return decoded;
    })
  } catch (error) {
    return { error: error && error.message || 'Invalid token' };
  }
}
export default JwtToken