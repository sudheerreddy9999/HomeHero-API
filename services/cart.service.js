'use strict';

import CartDTO from '../dto/cart.dto.js';
import logger from '../utility/logger.utility.js';
import customUtility from '../utility/custom.utility.js';

const { CustomMessage } = customUtility;

const InsertCartItemService = async (request) => {
  try {
    const { user_id, service_id } = request.body;
    const response = await CartDTO.PostCartItem(user_id, service_id);
    if (!response) {
      return CustomMessage(400, 'Error While Inserting cart Item');
    }
    return response;
  } catch (error) {
    logger.error({ InsertCartItemService: error.message });
    throw new Error(error.message);
  }
};

const GetCartItemsService = async (request) => {
  try {
    const { user_id } = request.headers;
    const response = await CartDTO.GetCartItemsDto(Number(user_id));
    if (!response) {
      return CustomMessage(400, 'Error While Getting Items');
    }
    return response;
  } catch (error) {
    logger.error({ GetCartItemsService: error.message });
    throw new Error(error.message);
  }
};

const DeleteCartItemsService = async (request) => {
  try {
    const { user_id, service_id } = request.body;
    const response = await CartDTO.DeleteCartItemDto(user_id, service_id);
    if (!response) {
      return CustomMessage(400, 'Error While Deleting the Item');
    }
    return response;
  } catch (error) {
    logger.error({ DeleteCartItemsService: error.message });
    throw new Error(error.message);
  }
};

const CartService = { InsertCartItemService, GetCartItemsService, DeleteCartItemsService };
export default CartService;
