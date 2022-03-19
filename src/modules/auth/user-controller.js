
import { usersRagister, usersLogin } from './user-service';
import User from './user-model'
export const userRagister = async (req, res, next) => {
    try {
        await usersRagister(req.body, req, res)
    } catch (error) {
        return next(error, req, res)
    }
}

export const userLogin = async (req, res, next) => {
    try {
        await usersLogin(req.body, res)
    } catch (error) {
        return next(error, req, res)
    }
}


export const userProfile = async (req, res, next) => {
    try {
        const user = req.user
        user.password = undefined
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return next(error, req, res)
    }
}


export const singleUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ phone: req.body.phone })
        console.log(user)
        if (user) {
            user.password = undefined
            return res.status(200).json({
                success: true,
                user
            })
        }

        return res.status(200).json({
            success: false,
            message: 'Phone Number is Required'
        })
    } catch (error) {
        return next(error, req, res)
    }
}
export const singleStudent = async (req, res, next) => {
    try {
        const body = req.body.phone
        if (body) {


            await User.findOne({ phone: req.body.phone }).exec((err, user) => {
                if (err || !user) {
                    return res.status(404).json({
                        success: false,
                        message: 'Student Not Found'
                    })
                }

                if (user.role != 'student') {
                    return res.status(401).json({
                        success: false,
                        message: 'You are not authorized to access this'
                    })
                }
                user.password = undefined
                return res.status(200).json({
                    success: true,
                    user
                })

            })

        } else {

            return res.status(400).json({
                success: false,
                message: 'Phone Number is Required'
            })

        }
    } catch (error) {
        return next(error, req, res)
    }
}
