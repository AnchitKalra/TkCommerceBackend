const authController = require('../controller/authController');
const {signup, login, loginWithToken, resetPassword, logout, previousOrders} = require('../controller/userController');

const router = require('express').Router();

const userRouter = router.post("/signup", signup);
const loginRouter = router.post('/login', login);
const loginTokenRouter = router.get("/login", loginWithToken);
const resetPasswordRouter = router.patch('/resetPassword', resetPassword);
const logoutRouter= router.delete('/logout', logout);
const prevOrdersRouter = router.get('/prevOrders', authController, previousOrders);

module.exports = {userRouter, loginRouter, loginTokenRouter, resetPasswordRouter, logoutRouter, prevOrdersRouter};