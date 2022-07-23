const crypto = require("crypto")
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const Token = require('../models/token')
const OTP = require('../models/otp');
const generateCode = require("../utils/otpGenerator");




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

        // const token = await new Token({
        //     userId: user._id,
        //     token: crypto.randomBytes(32).toString("hex"),
        // }).save();

        // const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;

        // sendEmail({
        //     to: user.email,
        //     subject: "Email verification",
        //     text: url
        // });

        res.json({
            success: true, message: `Welcome ${user.username} to Arcic Travels, Please confirm the verification email sent to you.`, status: 201
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
            // const token = await new Token({
            //     userId: user._id,
            //     token: crypto.randomBytes(32).toString("hex"),
            // }).save();

            // const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;

            // sendEmail({
            //     to: user.email, 
            //     subject: "Email verification",
            //     text: url
            // });

            // return res.json({ success: false, verified: user.verified, message: `please confirm the verification email sent to you.`, status: 400 })
            return next(new ErrorResponse('please confirm the verification email sent to you.', 401))

        }

        if (user.two_fa_status === 'on') {

            const otp = await new OTP ({
                userId: user._id,
                otp: generateCode()
            }).save();

            user.OTP_code = otp.otp
            await user.save();

            // sendEmail({
            //     to: user.email,
            //     subject: "One Time Password",
            //     text: otp.otp
            // });

            // await otp.remove();

            return res.json({ success: false, otpStatus:user.two_fa_status, otp: user.OTP_code, id:user._id })
            // return next(new ErrorResponse({ id:user._id, success: false,  otpStatus:user.two_fa_status, otp: user.OTP_code }, 400))
        }

        // return res.json({ success: true, message: `login success`, status: 201 })
        sendToken(user, 200, res);

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

        if(otp !== user.OTP_code) {
            return next(new ErrorResponse('invalid token, please try again', 400))
        }
        
        user.OTP_code = null
        await user.save();
        // return res.json({ success: true, message: `login success`, status: 201 })
        sendToken(user, 200, res);

    } catch (error) {
        return next(new ErrorResponse('Internal Server', 500))

    }
};



const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, data: user.username, token })
}













// exports.verifyEmail =  async (req, res) => {
// 	try {
// 		const user = await User.findOne({ _id: req.params.id });
// 		if (!user) return res.status(400).send({ message: "Invalid link" });
// 		const token = await Token.findOne({	userId: user._id,token: req.params.token,	});
// 		if (!token) return res.status(400).send({ message: "Invalid link" });
// 		await User.updateOne({ _id: user._id, verified: true });
// 		await token.remove();
// 		res.status(200).send({ message: "Email verified successfully" });
// 	} catch (error) {res.status(500).send({ message: "Internal Server Error" });}}
