// const crypto = require("crypto")
// const mongoose = require('mongoose');



// const UserVerificationSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'user',
//         unique: true
//     },
//     token: { type: String, required: true },
//     CreatedAt: { type: Date, default: Date.now(), expires: 3600, } //1hout

// })


// const UserVerification = mongoose.model("user", UserVerificationSchema)

// module.exports = UserVerification


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "user",
		unique: true,
	},
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
});

module.exports = mongoose.model("token", tokenSchema);
