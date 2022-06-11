const express = require('express');
const router = express.Router();

const { register, login, verifyEmail } = require('../controllers/auth')

router.post("/register", async (req, res, next) => { await register(req.body, 'user', res, next) });

router.route("/login").post(login)

router.route("/:id/verify/:token").get(verifyEmail)



module.exports = router