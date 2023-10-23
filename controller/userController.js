const UserModel = require('../model/userModel');
const { generateToken, verifyToken } = require('../utils/jwtToken');
const { generatePasswordHash, verifyPassword } = require('../utils/passwordManager');
const { generateCode, verifyOtp } = require('../utils/totpUtil');

const signup = async(req, res, next) => {
    try {
    const data = req.body;
    const {password} = data;
    console.log(data);
    const passwordHash = await generatePasswordHash(password);
    data.password = passwordHash;
    const {secret, qrcode} = await generateCode();
    data.secret = secret;
    const userData = await UserModel.createUser(data);
    if(userData) {
    res.status = 201;
    res.send({sucess: true, message: 'Account created', userData});}
    
    }catch(err) {
        console.log(err);
        if(err.code === 11000){
        res.status = 300;
        res.send({message: 'user already exists'})};

    }
}

const login = async(req, res, next) => {
    try {
    const data = req.body;
    const {username, password} = data;
    const user = await UserModel.findUser(username)
    const {password: passwordHash, ...userData} = user;
    
    const isVerified = await verifyPassword(password, passwordHash);
    if(isVerified) {
        const token = await generateToken(userData, 36000000);
        res.status = 200;
        res.cookie("token", token, {maxAge: 3600_000, httpOnly: true});
        res.send({message: `Welcome, ${username} login success`, data: userData._doc});
    }}catch(err) {
        next(err);
    }
}


const loginWithToken = async (req, res, next) => {
    try {
        console.log("cookies->" + req.cookies);
    const {token = null} = req.cookies;
    const isVerified = await verifyToken(token);
    if(isVerified) {
        res.status = 200;
        res.send({message: `Welcome, login success`, data: isVerified._doc});
    }
}catch(err) {
    next(err);
}}


const resetPassword = async(req, res, next) => {
    try{
    const {username, password, otp} = req.body;
    const {secret} = await UserModel.findUser(username);
    const isVerified = verifyOtp(secret, otp);
    if(isVerified) {
        const passwordHash = await generatePasswordHash(password);
        const data = await UserModel.resetPassword(username, passwordHash);
        if(data.modifiedCount) {
            res.status = 200;
            res.send({success: true, message: 'Password reset successfully'});
        }
    }
    else {
        throw new Error('invalid otp');
    }
}catch(err) {
    next(err);
}
}
module.exports = {signup, login, loginWithToken, resetPassword};