const crypto = require("crypto")
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const Token = require('../models/token')
// const bcrypt = require("bcryptjs")







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

        await sendEmail({
            to: user.email,
            subject: "Email verification",
            text: url
        });

        res
			.status(201)
			.send({ message: `Welcome ${user.username} to Arcic Travels, Please confirm the verification email sent to you.`, data: {token: token.token, id:user.id}});


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


        res.send({ status: 'success', message: "login success", data: user })

    } catch (error) {
        next(error)
    }
};


exports.verifyEmail = async (req, res, next) => {
    const user = await User.findById(req.params.id);

	try {
		// const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id, verified: true });
        
        user.verified = true
        await user.save();
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error kiil am" });
	}
};