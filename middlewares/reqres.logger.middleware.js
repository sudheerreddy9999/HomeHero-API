'use strict';
import logger from '../utility/logger.utility.js';
import ReqResLoggerDTO from '../dto/reqres.logger.dto.js';

const ReqResLoggerMiddleware = async (req, res, next) => {
  try {
    const rawRequest = {
      headers: req.headers || '',
      body: req.body || '',
      query: req.query || '',
      param: req.params || '',
    };
    const user_id = req.user_id || '';
    const auth_token = req.get('Authorization');
    const http_method = req.method || '';
    const url = req.originalUrl;
    const request = JSON.stringify(rawRequest);

    const requestId = await ReqResLoggerDTO.PostRequestDTO(user_id, auth_token, http_method, url, request);

    if (requestId) {
      const OriginalSend = res.send;

      res.send = async function (body) {
        const response = body ? JSON.stringify(body) : '';
        await ReqResLoggerDTO.UpdateResponseDTO(response, requestId);
        return OriginalSend.call(this, body);
      };
    }
  } catch (error) {
    console.log(error);
    logger.error({ ReqResLoggerMiddleware: `ReqResLogger failed with ${error.message}` });
  }

  next();
};

export default ReqResLoggerMiddleware;
