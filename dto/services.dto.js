'use strict';
import DB from '../config/app/query.config.js';
import mysql from '../config/database/database.config.js';
import logger from '../utility/logger.utility.js';
import { QueryTypes } from 'sequelize';

const GetServicesDTO = async () => {
  try {
    const sp = DB.SP.GET_SERVICES;

    const rData = await mysql.query(sp);
    return rData;
  } catch (error) {
    logger.error({ GetServicesDTO: error.message });
    throw new Error(error);
  }
};

const GetSearchServiceTypesDTO = async (service_id, service_name) => {
  try {
    const sp = DB.SP.GET_SERVICE_ITEMS;
    const replacements = {
      service_id: service_id ?? null,
      service_name: service_name ?? null,
    };
    const rData = await mysql.query(sp, {
      replacements,
    });
    return rData;
  } catch (error) {
    logger.error({ GetSearchServiceTypesDTO: error.message });
    throw new Error(error);
  }
};

const GetRandomServiceTypesDTO = async () => {
  try {
    const sp = DB.SP.GET_RANDOM_SERVICE_ITEMS;

    const rData = await mysql.query(sp);
    return rData;
  } catch (error) {
    logger.error({ GetRandomServiceTypesDTO: error.message });
    throw new Error(error);
  }
};
const ServicesDTO = { GetServicesDTO, GetSearchServiceTypesDTO, GetRandomServiceTypesDTO };
export default ServicesDTO;
