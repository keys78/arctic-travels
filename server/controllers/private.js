const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse')
const Token = require('../models/token')





exports.getUser = async (req, res, next) => {
    const { id } = req.user
    try {
        await User.findOne({ _id: id }, function (err, user) {
            res.json(user);
        });
    } catch (error) {
        next(error)
    }
};


exports.getAllUnverifiedUsers= (req, res, next) => {
    try {
        User.find({ verified: false, role: 'user' }, function (error, users) {
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
        User.find({ verified: true, role: 'user' }, function (error, users) {
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
            if (!token) return res.status(400).send({ message: "no token left by this user" });
            await token.remove();
        }

        res.json({ success: true, message: 'account has been deleted' })

    } catch (error) {
        next(error)
    }

}