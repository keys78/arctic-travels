const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse')
const Token = require('../models/token')





exports.getUser = async (req, res, next) => {
    const { id } = req.user

    try {
        User.findOne({ _id: id }, { role: 1, email: 1, username: 1, verified: 1, two_fa_status: 1, }).exec((error, user) => {
            if (error) {
                return next(new ErrorResponse('unable to fetch user', 404))
            }
            return res.status(200).json(user)
        })
    } catch (error) {
        next(error)
    }
};


exports.getAllUnverifiedUsers = async (req, res, next) => {
    try {
        await User.find({ verified: false, role: 'user', }).then((users) => {
            res.send(users);
        });
    } catch (error) {
        next(error)
    }
};


exports.getAllVerifiedUsers = async (req, res, next) => {
    try {
        await User.find({ verified: true, role: 'user', }).then((users) => {
            res.send(users);
        });
    } catch (error) {
        next(error)
    }
};


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
            return next(new ErrorResponse("shey you dey whyne me ni ..? enter correct password o jhare", 400))
        }
        user.two_fa_status = "on"
        await user.save();

        return res.json({ status: user.two_fa_status, message: '2FA activation was successful' });

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

        return res.json({ status: user.two_fa_status, message: '2FA de-activation was successful' });
       
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

            if (!token) {
                return res.json({ id: user._id, message: "no token, account has been deleted" });
            }

            await token.remove();
        }

        res.json({ id: user._id, success: true, message: 'account has been deleted' })

    } catch (error) {
        next(error)
    }

}