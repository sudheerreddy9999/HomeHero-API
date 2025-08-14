'use strict';
import CartService from '../services/cart.service.js';
import logger from '../utility/logger.utility.js';

const InsertCartItemController = async (request, response) => {
  try {
    const data = await CartService.InsertCartItemService(request);
    if (data?.errorCode) {
      return response.status(data.errorCode).json({ message: data.customMessage });
    }
    return response.status(200).json({ message: 'Item added to cart successfully ' });
  } catch (error) {
    logger.error(error.message);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

const GetCartItemsController = async (request, response) => {
  try {
    const data = await CartService.GetCartItemsService(request);
    if (data?.errorCode) {
      return response.status(data.errorCode).json({ message: data.customMessage });
    }
    return response.status(200).json({ data: data });
  } catch (error) {
    logger.error({ GetCartItemsController: error.message });
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

const DeleteItemController = async (request, response) => {
  try {
    const data = await CartService.DeleteCartItemsService(request);
    if (data?.errorCode) {
      return response.status(data.errorCode).json({ message: data.customMessage });
    }
    return response.status(200).json({ message: 'Item Deleted Succesfully' });
  } catch (error) {
    logger.error({ DeleteItemController: error.message });
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

const CartController = { InsertCartItemController, GetCartItemsController, DeleteItemController };
export default CartController;
