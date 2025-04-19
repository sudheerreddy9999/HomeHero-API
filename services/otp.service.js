"use strict";

import OtpDto from "../dto/otp.dto.js";
import logger from "../utility/logger.utility.js";
import AuthDTO from "../dto/auth.dto.js";
import AppConfig from "../config/app/app.config.js";
import customUtility from "../utility/custom.utility.js";
import EmailTemplates from "../config/app/email.config.js";
import SendEmail from "../utility/email.utility.js";
import UserJwtMiddleWare from "../middlewares/jwt..usermiddleware.js";
const { GenerateToken } = UserJwtMiddleWare;

const { CustomMessage, GenerateOtp } = customUtility;
const RegisterOtpService = async (request) => {
  try {
    const { email } = request.headers;
    const verifyUser = await AuthDTO.GetUserDTO(email, null);
    // if (verifyUser.length > 0)
    //   return CustomMessage(409, "User with this email is already avalilable");
    const checkOtpExists = await OtpDto.VerifyOtp(email,AppConfig.OTP_TYPES.REGISTER);
    if(checkOtpExists.length>0){
        return CustomMessage(409,"Otp Already generated Successfully")
    }
    const otp = GenerateOtp();
    const data = await OtpDto.InsertOtpDTO(
      otp,
      null,
      email,
      AppConfig.OTP_TYPES.REGISTER
    );
    const template = EmailTemplates.OTP_TEMPLATE(email.split("@")[0], otp);
    SendEmail(email, template.subject, template.body);
    return data;
  } catch (error) {
    logger.error({ RegisterOtpService: error.message });
    throw new Error(error.message);
  }
};

const VerifyOtpService = async (request) => {
  try {
    const { email, otp } = request.headers;
    const verifyUser = await AuthDTO.GetUserDTO(email, null);
    const data = await OtpDto.VerifyOtp(email,AppConfig.OTP_TYPES.REGISTER);
    if (!data.length > 0) return CustomMessage(410, "Otp Exipred");
    if (data[0].otp ==otp) {
      if(verifyUser.length>0){ 
        const token = await GenerateToken({email:verifyUser[0].email});

      }
      return CustomMessage(400, "The Otp entered is incorrect");
    }
    return data;
  } catch (error) {
    logger.error({VerifyOtpService:error.message});
    throw new Error(error.message);
  }
};

const OtpService = { RegisterOtpService, VerifyOtpService };
export default OtpService;
