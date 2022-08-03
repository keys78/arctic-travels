const express = require('express');
const router = express.Router();

const { register, login, verifyEmail, verifyOTP, resendOTP } = require('../controllers/auth');


router.route("/verify2FA/:id").post(verifyOTP)
router.post("/register", async (req, res, next) => { await register(req.body, 'user', res, next) });
router.route("/login").post(login)
router.route("/resend-otp/:id").post(resendOTP)
router.route("/:id/verify/:token").post(verifyEmail)




module.exports = router