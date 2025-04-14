"use strict";
import UsersDto from "../dto/user.dto.js";
import bcrypt from "bcrypt"
import AuthDTO from "../dto/auth.dto.js";
import logger from "../utility/logger.utility.js";
import customUtility from "../utility/custom.utility.js";
import UserJwtMiddleWare from "../middlewares/jwt..usermiddleware.js";
import SendEmail from "../utility/email.utility.js";
import EmailTemplates from "../config/app/email.config.js";
const { GenerateToken } = UserJwtMiddleWare;

const { CustomMessage } = customUtility;
const RegisterNewUserService = async (request) => {
  try {
    const {
      first_name,
      middle_name,
      last_name,
      mobile_number,
      email,
      dob,
      password,
      profile_img = "",
      gender,
      active = "Y",
    } = request.body;
    const verifyNewuser = await AuthDTO.GetUserDTO(email, mobile_number);
    if (verifyNewuser.length > 0) {
      return CustomMessage(409, "User Already Exists");
    }
    const encryptedPassword = await bcrypt.hash(password,12);
    await UsersDto.RegisterNewUserDTO(
      first_name,
      middle_name,
      last_name,
      mobile_number,
      email,
      dob,
      encryptedPassword,
      profile_img,
      gender,
      active
    );
    const template = EmailTemplates.REGISTRATION_TEMPLATE(`${first_name} ${last_name}`);
    await SendEmail(email,template.subject,template.body)
    const userData = await AuthDTO.GetUserDTO(email, mobile_number);
    delete userData[0].password;
    const token = await GenerateToken(userData[0]);
    if (!token) {
      return CustomMessage(404, "Error Occured While genrating Token");
    }
    return { ...userData[0], token };
  } catch (error) {
    logger.error({ RegisterNewUserService: error.message });
    throw new Error(error.message);
  }
};

const UserService = { RegisterNewUserService };
export default UserService;
