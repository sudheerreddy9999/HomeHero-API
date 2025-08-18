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
    let data = await ServicesDTO.GetSearchServiceTypesDTO(service_id, service_name);
    if (!service_id && data.length === 0) {
      let fullData = [];

      const parts = service_name.split(' ');
      await Promise.all(
        parts.map(async (i) => {
          let data = await ServicesDTO.GetSearchServiceTypesDTO(null, i);
          fullData = [...fullData, ...data];
        }),
      );

      let uniqueIds = new Set();
      fullData.forEach((item) => {
        uniqueIds.add(item.service_type_id);
      });

      data = [...uniqueIds].map((id) => {
        let serviceData = fullData.find((serviceItem) => serviceItem.service_type_id == id);
        return { ...serviceData };
      });
    }
    return data;
  } catch (error) {
    logger.error({ GetSearchServiceTypesService: error.message });
    throw new Error(error.message);
  }
};

const GetRandomServiceTypesService = async () => {
  try {
    const data = await ServicesDTO.GetRandomServiceTypesDTO();
    return data;
  } catch (error) {
    logger.error({ GetRandomServiceTypesService: error.message });
    throw new Error(error.message);
  }
};

const ServicesService = { GetServicesService, GetSearchServiceTypesService, GetRandomServiceTypesService };
export default ServicesService;
