'use strict';

import express from 'express';
import ServicesController from '../controllers/services.controller.js';
import UserJwtMiddleWare from '../middlewares/jwt..usermiddleware.js';
import customUtility from '../utility/custom.utility.js';
import ServicesValidation from '../middlewares/validators/services.validation.js';
import ReqResLoggerMiddleware from '../middlewares/reqres.logger.middleware.js';
import CartController from '../controllers/cart.controller.js';

const Router = express.Router();

//To set mysql time zone
// Router.use(customUtility.SetTimeZone, UserJwtMiddleWare.VerifyToken, ReqResLoggerMiddleware);

Router.get('/', ServicesController.GetServicesController);

Router.get(
  '/search',
  ServicesValidation.GetSearchServiceValidation,
  ServicesController.GetSearchServiceTypesController,
);

Router.get('/random', ServicesController.GetRandomServiceTypesController);
Router.post('/cart/add', CartController.InsertCartItemController);
Router.get('/cart/items', CartController.GetCartItemsController);
Router.delete('/cart/delete', CartController.DeleteItemController);

export default Router;
