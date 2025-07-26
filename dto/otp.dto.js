'use strict';

import logger from '../utility/logger.utility.js';
import mysql from '../config/database/database.config.js';
import DB from '../config/app/query.config.js';
import { QueryTypes } from 'sequelize';

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

const GetOtpDTO = async (email = NULL, mobile = NULL, otp_type = NULL) => {
  try {
    const query = DB.QUERY.VERIFY_OTP;
    const replacements = {
      email: email ? email : null,
      mobile: mobile ? mobile :  null,
      otp_type,
    };
    const data = await mysql.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });
    return data;
  } catch (error) {
    logger.error({ GetOtpDTO: error.message });
    throw new Error(error.message);
  }
};

const OtpDto = { InsertOtpDTO, GetOtpDTO };

export default OtpDto;
