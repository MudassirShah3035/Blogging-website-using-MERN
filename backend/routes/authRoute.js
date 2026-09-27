const express = require("express")
const { signUp, logIn, logOut, getLoginUser } = require("../controllers/authController")
const authMiddleware = require("../middleware/authMiddleware")

const authRouter = express.Router()

authRouter.post('/signup', signUp)
authRouter.post('/login', logIn)
authRouter.post('/logout', logOut)
authRouter.get('/get-user', authMiddleware, getLoginUser)

module.exports = authRouter