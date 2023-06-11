const otpGenerator = require('otp-generator');
module.exports.generateOTP = () => {
  const OTP = otpGenerator.generate(5, {
    upperCaseAlphabets: true,
    specialChars: false,
  });
  return OTP;
};
