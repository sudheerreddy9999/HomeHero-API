'use strict';

import { QueryTypes } from 'sequelize';
import DB from '../config/app/query.config.js';
import mysql from '../config/database/database.config.js';
import logger from '../utility/logger.utility.js';

const PostRequestDTO = async (user_id, auth_token, http_method, url, request) => {
  try {
    const query = DB.QUERY.POST_REQUEST;
    const replacements = {
      user_id: user_id ? user_id : null,
      auth_token: auth_token ? auth_token : null,
      http_method: http_method ? http_method : null,
      url: url ? url : null,
      request: request ? request : null,
    };
    const [InsertedId] = await mysql.query(query, {
      replacements,
      type: QueryTypes.INSERT,
    });
    return InsertedId;
  } catch (error) {
    logger.error({ PostRequestDTO: error.message });
    throw new Error(error);
  }
};

const UpdateResponseDTO = async (response, id) => {
  try {
    const query = DB.QUERY.UPDATE_RESPONSE;
    const replacements = {
      response: response ? response : null,
      id: id ? id : null,
    };
    const data = await mysql.query(query, {
      replacements,
      type: QueryTypes.UPDATE,
    });
    return data;
  } catch (error) {
    logger.error({ UpdateResponseDTO: error.message });
    throw new Error(error);
  }
};

const ReqResLoggerDTO = { PostRequestDTO, UpdateResponseDTO };
export default ReqResLoggerDTO;
