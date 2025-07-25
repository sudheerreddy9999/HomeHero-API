"use strict";

import { QueryTypes } from "sequelize";
import DB from "../config/app/query.config.js";
import mysql from "../config/database/database.config.js";
import logger from "../utility/logger.utility.js";

const GetUserDTO = async (email = null, mobile_number = null) => {
  try {
    const query = DB.QUERY.GET_USER;
    const replacements = {
      email,
      mobile_number,
    };
    const data = await mysql.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });
    return data;
  } catch (error) {
    logger.error({ GetUserDTO: error.message });
    throw new Error(error);
  }
};

const AuthDTO = { GetUserDTO };
export default AuthDTO;
