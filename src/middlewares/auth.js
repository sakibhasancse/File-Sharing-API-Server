import passport from 'passport';
import User from '../model/user'
export const isAuth = passport.authenticate('jwt', { session: false })
import { Strategy, ExtractJwt } from 'passport-jwt'

export const isLibarian = role => (req, res, next) => {
    if (req.user.role === 'librarian') {
        return next();
    }
    return res.status(401).json({
        success: false,
        message: 'You are not authorized to access this'
    })
}
export const isStudent = role => (req, res, next) => {
    if (req.user.role === 'student') {
        return next();
    }
    return res.status(401).json({
        success: false,
        message: 'You are not authorized to access this'
    })
}


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