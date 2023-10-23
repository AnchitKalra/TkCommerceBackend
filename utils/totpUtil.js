const speakEasy = require('speakeasy');
const Qrcode = require('qrcode');


const generateCode = async() => {
    const {base32: secret, otpauth_url} = speakEasy.generateSecret({name: 'AnchitKalra'});
    const qrcode = await Qrcode.toDataURL(otpauth_url);

    return {secret, qrcode};

}



const verifyOtp = (secret, otp) => {
    return speakEasy.totp.verify({
        secret,
        token:otp,
        encoding: 'base32'
    })
}

module.exports = {generateCode, verifyOtp};