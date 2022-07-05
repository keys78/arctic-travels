const crypto = require("crypto")
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")


const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },

    username: { type: String, required: [true, "Please provide a username"], trim: true },

    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
    },

    verified: { type: Boolean, default: false },
    otpStatus: {type: String, default: 'active'},
    otpActiveSession: {type: Boolean, default: false },
    otpCode: { type: Number },

    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

},
    { timestamps: true });




UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
}


const User = mongoose.model("user", UserSchema)

module.exports = User