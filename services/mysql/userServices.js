const { User, ResetPassword } = require("../../models");
const bcrypt = require("bcrypt");
const generateAccessToken = require("../../utils/generateAccessToken");
const {generateOTP} = require("../../utils/generateOTP");
const {sendMail} = require("../../utils/MailSender");

const userServices = {
  loginUser: async (email, password) => {
    const userLogin = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!userLogin) {
      throw new Error("Wrong Email or Password");
    }
    const passwordValidate = bcrypt.compareSync(password, userLogin?.password);
    if (!passwordValidate) {
      //validate password
      throw new Error("Wrong Email or Password");
    }

    const accessToken = generateAccessToken({ uuid: userLogin.uuid });
    return accessToken;
  },
  registerUser: async (email, fullName, password, gender) => {
    console.log(password);
    const hashPw = await bcrypt.hash(password, 10);
    const [user, created] = await User.findOrCreate({
      where: {
        email: email,
      },
      defaults: {
        email: email,
        fullName: fullName,
        password: hashPw,
        gender
      },
    });

    if (!created) {
      throw new Error("Email already in use");
    }

    return {
      id: user.id,
      uuid: user.uuid,
      email: user.email,
      name: user.name,
      password: user.password,
    };
  },
  changePassword: async (uuid, oldPassword, newPassword, confirmPassword) => {
    const user = await User.findOne({
      where: {
        uuid: uuid,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const validatePassword = bcrypt.compareSync(oldPassword, user.password);
    if (!validatePassword) {
      throw new Error("Wrong Password");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("Confirm Password is not same");
    }

    await user.update({
      password: await bcrypt.hash(newPassword, 10),
    });

    return user;
  },
  updateProfile: async (uuid, fullName, height, weight, phoneNumber) => {
    const user = await User.findOne({
      where: {
        uuid,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }

    await user.update({
      fullName: fullName,
      height: height,
      weight: weight,
      phoneNumber: phoneNumber,
    });
  },
  userByUUID: async (uuid) => {
    const user = await User.findOne({
      where: {
        uuid,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      fullName: user.fullName,
      email: user.email,
      gender: user.gender,
      height: user.height,
      weight: user.weight,
      calories: user.calories,
      photoProfile: user.photoProfile,
      phoneNumber: user.phoneNumber,
    };
  },

  generateResetPasswordOTP: async (email)=>{
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const otp = generateOTP();
    
    const resOtp = await ResetPassword.create({
        otp,
        id_user: user.id
    })

    await sendMail({
      to: email,
      OTP: otp
    })

    return resOtp;
  },

  verifyResetPasswordOTP: async (otp) => {

    const resOtp = await ResetPassword.findOne({
      where: {
        otp
      },
      include: [
        {
          model: User,
          attributes: ["uuid"]
        }
      ],
    });

    if(!resOtp){
      throw new Error("Otp not found")
    }
    const dataJSON = resOtp.toJSON();
    
    return dataJSON.User.uuid;
  },
  
  generateNewResetPassword : async (uuid, newPassword, confirmPassword) => {
    const user = await User.findOne({
      where: {
        uuid,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("Confirm Password is not same");
    }

    await user.update({
      password: await bcrypt.hash(newPassword, 10),
    });

    return user;
  }

};

module.exports = userServices;
