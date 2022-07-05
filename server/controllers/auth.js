const crypto = require("crypto")
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const Token = require('../models/token')




exports.register = async (userDetails, role, res, next) => {

    try {
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
            subject: "Email verification",
            text: url
        });

        res.json({ success: true, message: `Welcome ${user.username} to Arcic Travels, Please confirm the verification email sent to you.`, status: 201 })


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
            const token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();

            const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;

            sendEmail({
                to: user.email,
                subject: "Email verification",
                text: url
            });

            res.json({ success: true, message: `please confirm the verification email sent to you.`, status: 400 })
        }

        // if(user.otpStatus !== "active") {
        //     res.json({ otp: `1234`, status: 201 })

        // }

        res.json({ success: true, message: `login success`, status: 201 })


    } catch (error) {
        next(error)
    }
};


exports.verifyEmail = async (req, res, next) => {
    const user = User.findById(req.params.id);

    try {
        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send({ message: "Invalid link" });

        user.verified = true
        await user.save();
        await token.remove();

        res.json({ success: true, message: `Email Verified Successfully`, status: 202 })


    } catch (error) {
        return next(new ErrorResponse('Internal Server Error kiil am', 500))

    }
};


exports.verifyOTP = async (req, res, next) => {
    const user = User.findById(req.params.id);
    const { otpCode } = req.body;
    const generatedOTP = 1234

    try {
        if (!user) return res.status(400).send({ message: "bad request, try again" });

        // const token = await Token.findOne({
        //     userId: user._id,
        //     token: req.params.token,
        // });
        // if (!token) return res.status(400).send({ message: "Invalid link" });
        if(otpCode === generatedOTP) {
            user.otpActiveSession = true
            
        }
        await user.save();
       
        // await token.remove();

        res.json({ success: true, message: `Token Verified Successfully`, status: 202 })


    } catch (error) {
        return next(new ErrorResponse('Internal Server Error', 500))

    }
};