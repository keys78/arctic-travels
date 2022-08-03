const crypto = require("crypto")
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const Token = require('../models/token')
const OTP = require('../models/otp');
const generateCode = require("../utils/otpGenerator");
const confirmEmailMessage = require('../utils/confirmEmailTemplate')
const otpMessage = require('../utils/otpEmailTemplate')



exports.register = async (userDetails, role, res, next) => {

    try {
        const { email } = userDetails;

        const isUserRegistered = await User.findOne({ email })
        if (isUserRegistered) {
            return next(new ErrorResponse('account already exist, try login', 401))
        }

        const user = await User.create({
            ...userDetails, role
        });

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;


        sendEmail({
            to: user.email,
            subject: "Email Verification",
            text: confirmEmailMessage(url)
        });

        res.json({
            success: true, message: `Welcome ${user.username} to Arctic Travels, Please confirm the verification email sent to you.`, status: 201
        })


    } catch (error) {
        next(error);
    }
};


exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400))
    }

    try {
        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return next(new ErrorResponse('Invalid Credentials', 401))
        }

        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            return next(new ErrorResponse('Invalid Credentials', 401))
        }


        if (!user.verified) {
            const unusedToken = await Token.findOne({
                userId: user._id,
            });

            await unusedToken.remove();

            const token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();

            const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;

            sendEmail({
                to: user.email,
                subject: "Email Verification",
                text: confirmEmailMessage(url)
            });


            return next(new ErrorResponse('please confirm the verification email sent to you.', 401))

        }

        if (user.two_fa_status === 'on') {

            const otp = await new OTP({
                userId: user._id,
                otp: generateCode()
            }).save();

            user.OTP_code = otp.otp
            await user.save();

            sendEmail({
                to: user.email,
                subject: "One-Time Login Access",
                text:otpMessage(otp, user)
            });

            await otp.remove();

            return res.json({ otp: otp.otp, success: false, otpStatus: user.two_fa_status, id: user._id })
        }

        sendToken(user, 200, res);

    } catch (error) {
        next(error)
    }
};


exports.resendOTP = async (req, res, next) => {
    const { id } = req.params
    const user = await User.findById(`${id}`);

    try {
        if (user.two_fa_status === 'on') {

            const otp = await new OTP({
                userId: user,
                otp: generateCode()
            }).save();

            user.OTP_code = otp.otp
            await user.save();

            sendEmail({
                to: user.email,
                subject: "One-Time Login Access",
                text:otpMessage(otp, user)
            });

            await otp.remove();

            return res.json({ message: 'one-time login has been sent your email', otpStatus: user.two_fa_status, })
        }
        return res.json(user)

    } catch (error) {
        next(error)
    }
};



exports.verifyEmail = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    try {
        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send({ message: "Invalid linky" });

        user.verified = true
        await user.save();
        await token.remove();

        res.json({ success: true, message: `Email Verified Successfully`, status: 202 })


    } catch (error) {
        return next(new ErrorResponse('Internal Server Error kiil am', 500))

    }
};

exports.verifyOTP = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    const { otp } = req.body

    try {
        if (!user) return res.status(400).send({ message: "invalid user" });

        const lastUpdatedTime = new Date(user.updatedAt);
        lastUpdatedTime.setMinutes(lastUpdatedTime.getMinutes() + 5);
        const currentTime = (new Date(Date.now()))


        if (lastUpdatedTime <= currentTime) {
            console.log('yes')
            user.OTP_code = null
            await user.save();
        }

        if (otp !== user.OTP_code) {
            return next(new ErrorResponse('invalid token, please try again', 400))
        }

        user.OTP_code = null
        await user.save();
        return sendToken(user, 200, res);


    } catch (error) {
        return next(new ErrorResponse('Internal Server', 500))

    }
};



const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, data: user.username, token })
}








