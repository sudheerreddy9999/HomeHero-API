"use strict";
import logger from "../utility/logger.utility.js";
import queries from "../config/app/query.config.js";
import mysql from "../config/database/database.config.js";
import { QueryTypes } from "sequelize";

const RegisterNewUserDTO = async (
  first_name=null,
  middle_name=null,
  last_name=null,
  mobile_number=null,
  email=null,
  dob=null,
  password=null,
  profile_img = null,
  gender=null,
  active = "Y"
) => {
  try {
    const query = queries.POST_USER;
    const replacements = {
      first_name,
      middle_name,
      last_name,
      mobile_number,
      email,
      dob,
      password,
      profile_img,
      gender,
      active,
    };
    const data = await mysql.query(query, {
      replacements,
      type: QueryTypes.INSERT,
    });
    console.group(data,"sllllllllllllllll")
    return data;
  } catch (error) {
    logger.error(error.message);
    throw new Error(error.message);
  }
};

const UsersDto = { RegisterNewUserDTO };

export default UsersDto;
