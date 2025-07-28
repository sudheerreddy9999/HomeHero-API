import dotenv from "dotenv";

dotenv.config();

const SP = {
  GET_SERVICES: process.env.GET_SERVICES,
  GET_SERVICE_ITEMS: process.env.GET_SERVICE_ITEMS,
};

const QUERY = {
  POST_USER: process.env.POST_USER,
  GET_USER: process.env.GET_USER,
  INSERT_OTP: process.env.INSERT_OTP,
  VERIFY_OTP: process.env.VERIFY_OTP,
  POST_REQUEST: process.env.POST_REQUEST,
  UPDATE_RESPONSE: process.env.UPDATE_RESPONSE,
  
};

const DB = {
  SP,
  QUERY,
};

export default DB;
