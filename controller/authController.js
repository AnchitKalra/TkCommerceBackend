const UserModel = require('../model/userModel');
const {verifyToken} = require('../utils/jwtToken');

module.exports = async (req, res, next) => {
    try {
    const {token = null} = req.cookies;
    console.log("---------------token--------------");
    console.log(token);
    const data =  verifyToken(token);
    console.log('HERE!!!!!!')
    console.log(data);
    const user = await UserModel.findUser(data.username);
    //console.log(`from authController username= ${username}`);
    res.locals.user = user;
    next();
    }
    catch(err) {
        next(err);
    }
}