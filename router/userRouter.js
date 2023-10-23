const {signup, login, loginWithToken, resetPassword} = require('../controller/userController');

const router = require('express').Router();

const userRouter = router.post("/signup", signup);
const loginRouter = router.post('/login', login);
const loginTokenRouter = router.get("/login", loginWithToken);
const resetPasswordRouter = router.patch('/resetPassword', resetPassword);

module.exports = {userRouter, loginRouter, loginTokenRouter, resetPasswordRouter};