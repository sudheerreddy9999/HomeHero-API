'use strict';

import logger from '../utility/logger.utility.js';
import ServicesService from '../services/services.service.js';
import AppConfig from '../config/app/app.config.js';

const { STATUS_MESSAGES } = AppConfig;

const GetServicesController = async (request, response) => {
  try {
    const data = await ServicesService.GetServicesService();
    return response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    logger.error({ GetServicesController: error.message });
    return response.status(500).json({ message: STATUS_MESSAGES[500], error: error, message });
  }
};

const GetSearchServiceTypesController = async (request, response) => {
  try {
    const data = await ServicesService.GetSearchServiceTypesService(request);
    return response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    logger.error({ GetSearchServiceTypesController: error.message });
    return response.status(500).json({ message: STATUS_MESSAGES[500], error: error.message });
  }
};

const GetRandomServiceTypesController = async (request, response) => {
  try {
    const data = await ServicesService.GetRandomServiceTypesService(request);
    return response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    logger.error({ GetRandomServiceTypesController: error.message });
    return response.status(500).json({ message: STATUS_MESSAGES[500], error: error.message });
  }
};

const ServicesController = {
  GetServicesController,
  GetSearchServiceTypesController,
  GetRandomServiceTypesController,
};
export default ServicesController;
