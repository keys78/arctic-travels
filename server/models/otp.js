const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "user",
		index:true,
unique:true,
sparse:true
	},
	otp: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
});

module.exports = mongoose.model("otp", otpSchema);
