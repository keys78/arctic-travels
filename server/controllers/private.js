const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse')
const Token = require('../models/token')





exports.getUser = async (req, res, next) => {
    const { id } = req.user

    try {
         User.findOne({ _id: id }, { email: 1, username:1, verified:1 }).exec((error, user) => {
            if(error) { 
                return next(new ErrorResponse('unable to fetch user', 404))
            }

            return res.status(200).json(user)
        })
    } catch (error) {
        next(error)
    }


};


exports.getAllUnverifiedUsers= (req, res, next) => {

    try {
        User.find({ verified: false, role: 'user', OTP_code:0 }, function (error, users) {
            if (error) {
                return next(new ErrorResponse('unable to fetch unverified users', 404))
            }
            res.json(users)

        })
    } catch (error) {
        next(error)
    }
};

exports.getAllVerifiedUsers= (req, res, next) => {
    try {
        User.find({ verified: true, role: 'user', OTP_code:0 }, function (error, users) {
            if (error) {
                return next(new ErrorResponse('unable to fetch verified users', 404))
            }
            res.json(users)

        })
    } catch (error) {
        next(error)
    }
};

exports.deleteUser = async (req, res, next) => {

    const user = await User.findOneAndRemove({ _id: req.params.id })

    try {
        if (!user) {
            return next(new ErrorResponse('unable to delete user', 400))
        }

        if (!user.verified) {
            const token = await Token.findOne({
                userId: user._id,
            });
            if (!token) return res.status(400).send({ message: "no token, account has been deleted" });
            await token.remove();
        }

        res.json({ success: true, message: 'account has been deleted' })

    } catch (error) {
        next(error)
    }

}



exports.activate2FA = async (req, res, next) => {
    const { password } = req.body;
    const { id } = req.params;

    try {
        const user = await User.findById({ _id: id }).select('+password');

        if (!user) {
            return next(new ErrorResponse("User not found", 400))
        }

        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return next(new ErrorResponse("shey you dey whyne me ni ..? enter correct password jhare", 400))
        }
        user.two_fa_status = "on"
        await user.save();

        return res.json({ data: '2FA activation was successful' });
    } catch (error) {
        next(error)
    }
};

exports.deactivate2FA = async (req, res, next) => {
    const { password } = req.body;
    const { id } = req.params;

    try {
        const user = await User.findById({ _id: id }).select('+password');

        if (!user) {
            return next(new ErrorResponse("User not found", 400))
        }

        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return next(new ErrorResponse("shey you dey whyne me ni ..? enter correct password o jhare", 400))
        }
        user.two_fa_status = "off"
        await user.save();

        return res.json({ data: '2FA de-activation was successful' });
    } catch (error) {
        next(error)
    }
};