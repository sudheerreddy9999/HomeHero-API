import dotenv from 'dotenv';

dotenv.config();

const SP = {
  GET_SERVICES: process.env.GET_SERVICES,
  GET_SERVICE_ITEMS: process.env.GET_SERVICE_ITEMS,
  GET_RANDOM_SERVICE_ITEMS: process.env.GET_RANDOM_SERVICE_ITEMS,
};

const QUERY = {
  POST_USER: process.env.POST_USER,
  GET_USER: process.env.GET_USER,
  INSERT_OTP: process.env.INSERT_OTP,
  VERIFY_OTP: process.env.VERIFY_OTP,
  POST_REQUEST: process.env.POST_REQUEST,
  UPDATE_RESPONSE: process.env.UPDATE_RESPONSE,
  INSERT_CART_ITEM: process.env.INSERT_CART_ITEM,
  GET_CART_ITEMS: process.env.GET_CART_ITEMS,
  DELETE_CART_ITEM: process.env.DELETE_CART_ITEM,
};

const DB = {
  SP,
  QUERY,
};

export default DB;
