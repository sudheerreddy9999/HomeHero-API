'use strict';
import logger from '../utility/logger.utility.js';
import CustomUtility from '../utility/custom.utility.js';
import { OAuth2Client } from 'google-auth-library';
import AuthDTO from '../dto/auth.dto.js';
import UsersDto from '../dto/user.dto.js';
import OtpDto from '../dto/otp.dto.js';
import UserJwtMiddleWare from '../middlewares/jwt..usermiddleware.js';
import AppConfig from '../config/app/app.config.js';

const { CustomMessage } = CustomUtility;
const { GenerateToken } = UserJwtMiddleWare;

const GetUserAuthService = async (request) => {
  try {
    const { email, mobile, otp } = request.body;
    const data = await AuthDTO.GetUserDTO(email, mobile);
    const otpData = await OtpDto.GetOtpDTO(email, mobile, AppConfig.OTP_TYPES.REGISTER);
    let newUser = true;
    if (!otpData.length > 0) return CustomMessage(410, 'Otp Exipred');
    if (otpData[0].otp !== otp) {
      return CustomMessage(400, 'The Otp entered is incorrect');
    }
    if (data.length > 0) {
      newUser = false;
    } else {
      if (data.length === 0) {
        await UsersDto.RegisterNewUserDTO(
          email ? email.split('@')[0] : mobile,
          null,
          null,
          mobile,
          email,
          null,
          null,
          null,
          null,
          'Y',
        );
        newUser = true;
      }
    }
    // let tokenData = {
    //   email: data[0]?.email ?? null,
    //   mobile: data[0]?.mobile_number ?? null
    // }
    delete data[0].password;
    const token = await GenerateToken(data[0]);
    if (!token) {
      return CustomMessage(404, 'Error Occured While genrating Token');
    }
    return { ...data[0], token, newUser: newUser };
  } catch (error) {
    logger.error({ GetUserAuthService: error.message });
    throw new Error(error.message);
  }
};

const GoogleAuthService = async (request) => {
  try {
    const { googletoken } = request.body;
    let ticket;
    try {
      const client = new OAuth2Client(AppConfig.GOOGLE_CLIENT_ID);
      ticket = await client.verifyIdToken({
        idToken: googletoken,
        audience: AppConfig.GOOGLE_CLIENT_ID,
      });
    } catch (error) {
      logger.error({ GoogleAuthService: error.message });
      return CustomMessage(401, 'Invalid token', error.message);
    }
    const payload = ticket.getPayload();
    const { email, family_name, given_name, picture } = payload;
    let newUser = false;
    let userData = await AuthDTO.GetUserDTO(email, null);
    if (userData.length === 0) {
      await UsersDto.RegisterNewUserDTO(given_name, null, family_name, null, email, null, null, picture, null, 'Y');
      userData = await AuthDTO.GetUserDTO(email, null);
      newUser = true;
    }
    delete userData[0].password;
    const token = await GenerateToken(userData[0]);
    return { token, newUser, ...userData[0] };
  } catch (error) {
    logger.error({ GoogleAuthService: error.message });
    throw new Error(error.message);
  }
};

const AuthService = { GetUserAuthService, GoogleAuthService };

export default AuthService;
