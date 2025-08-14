'use strict';
import { QueryTypes } from 'sequelize';
import DB from '../config/app/query.config.js';
import mysql from '../config/database/database.config.js';
import logger from '../utility/logger.utility.js';

const PostCartItem = async (user_id, service_id) => {
  try {
    const postCartQuery = DB.QUERY.INSERT_CART_ITEM;
    const replacements = {
      user_id: user_id ?? null,
      service_id: service_id ?? null,
    };
    const data = await mysql.query(postCartQuery, { replacements, type: QueryTypes.INSERT });
    return data;
  } catch (error) {
    logger.error({ PostCartItemDTO: error.message });
    throw new Error(error);
  }
};

const GetCartItemsDto = async (user_id) => {
  try {
    const getCartQuery = DB.QUERY.GET_CART_ITEMS;
    const replacements = {
      user_id: user_id ?? null,
    };
    const data = await mysql.query(getCartQuery, { replacements, type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetCartItemsDto: error.message });
    throw new Error(error);
  }
};

const DeleteCartItemDto = async (user_id, service_id) => {
  try {
    const deleteCartItemQuery = DB.QUERY.DELETE_CART_ITEM;
    const replacements = {
      user_id: user_id ?? null,
      service_id: service_id ?? null,
    };
    const rowsAffected = await mysql.query(deleteCartItemQuery, { replacements, type: QueryTypes.BULKDELETE });
    return rowsAffected > 0;
  } catch (error) {
    logger.error({ DeleteCartItemDto: error.message });
    throw new Error(error);
  }
};
const CartDTO = { PostCartItem, GetCartItemsDto, DeleteCartItemDto };
export default CartDTO;
