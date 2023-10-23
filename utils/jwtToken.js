const { sign, verify } = require("jsonwebtoken");
const SECRET_KEY = 'My_Secret_Key';

const generateToken = (data, time = '1h') => {
    const token = sign(data, SECRET_KEY, { expiresIn: time });
    console.log(token);
    return token;
}


const verifyToken = (token) => {
    //console.log(token);
    if (!token) {
       throw new Error('Token not provided');
    }
    const data = verify(token, SECRET_KEY);
    //console.log(data);
    return data
}


module.exports = { generateToken, verifyToken }