const UserModel = require('../model/userModel');
const {verifyToken} = require('../utils/jwtToken');

module.exports = async (req, res, next) => {
    try {
    const {token} = req.cookies;
    console.log(`Token from auth = ${token}`)
    const data =  verifyToken(token);
    console.log('HERE!!!!!!')
    console.log(data);
    const user = await UserModel.findUser(data._doc.username);
    //console.log(`from authController username= ${username}`);
    res.locals.user = user;
    next();
    }
    catch(err) {
        next(err);
    }
}