const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/auth')

router.post("/register", async (req, res, next) => { await register(req.body, 'user', res, next) });

router.route("/login").post(login)



module.exports = router