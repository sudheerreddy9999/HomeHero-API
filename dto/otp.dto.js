"use strict";

import logger from "../utility/logger.utility.js";
import mysql from "../config/database/database.config.js";
import DB from "../config/app/query.config.js";
import { QueryTypes } from "sequelize";

const InsertOtpDTO = async (otp, user_id = null, email, otp_type, mobile) => {
  try {
    const replacements = {
      otp,
      user_id,
      email: email ?? null,
      otp_type,
      mobile: mobile ?? null,
    };
    const query = DB.QUERY.INSERT_OTP;
    const data = await mysql.query(query, {
      replacements,
      type: QueryTypes.INSERT,
    });
    return data;
  } catch (error) {
    logger.error({ InsertOtpDTO: error.message });
    throw new Error(error.message);
  }
};

const VerifyOtp = async (email, mobile, otp_type) => {
  try {
    const query = DB.QUERY.VERIFY_OTP;
    const replacements = {
      email: email ?? null,
      mobile: mobile ?? null,
      otp_type,
    };
    const data = await mysql.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });
    return data;
  } catch (error) {
    logger.error({ VerifyOtpDto: error.message });
    throw new Error(error.message);
  }
};

const OtpDto = { InsertOtpDTO, VerifyOtp };

export default OtpDto;
