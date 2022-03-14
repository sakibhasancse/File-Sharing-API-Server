
import User from '../model/user'
import { Strategy, ExtractJwt } from 'passport-jwt'

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken({ failmessage: 'missing token' }),
  secretOrKey: process.env.JWT_SECRET || 'Sef1V8TE21FKXmNtSZT7of75wM'
}

export const conPassport = (passport) => {
  passport.use(
    new Strategy(opts, async function (jwt_payload, done) {

      await User.findById(jwt_payload.userId)
        .then(result => {
          if (result) {
            return done(null, result)
          }
          return done(null, false);

        }).catch(err => {

          return done(err, false);
        })


    })
  )
}