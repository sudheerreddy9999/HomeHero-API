'use strict';

import logger from '../utility/logger.utility.js';
import ServicesDTO from '../dto/services.dto.js';

const GetServicesService = async () => {
  try {
    const data = await ServicesDTO.GetServicesDTO();
    return data;
  } catch (error) {
    logger.error({ GetServicesService: error.message });
    throw new Error(error.message);
  }
};

const GetSearchServiceTypesService = async (request) => {
  try {
    const { service_id, service_name } = request.headers;
    const data = await ServicesDTO.GetSearchServiceTypesDTO(service_id, service_name);
    return data;
  } catch (error) {
    logger.error({ GetSearchServiceTypesService: error.message });
    throw new Error(error.message);
  }
};

const ServicesService = { GetServicesService, GetSearchServiceTypesService };
export default ServicesService;
