'use strict';
import AuthService from '../services/auth.service.js';
import logger from '../utility/logger.utility.js';
import AppConfig from '../config/app/app.config.js';

const { STATUS_MESSAGES } = AppConfig;

const GetAuthController = async (request, response) => {
  try {
    const data = await AuthService.GetUserAuthService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.customMessage });
    } else {
      return response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
    }
  } catch (error) {
    logger.error({ GetAuthController: error.message });
    return response.status(500).json({ message: STATUS_MESSAGES[500], error: error.message });
  }
};

const GetGoogleAuthController = async (request, response) => {
  try {
    const data = await AuthService.GoogleAuthService(request);
    if (data?.errorCode) {
      return response.status(data.errorCode).json({ message: data.customMessage });
    } else {
      return response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
    }
  } catch (error) {
    logger.error({ GetGoogleAuthController: error.message });
    return response.status(500).json({ message: STATUS_MESSAGES[500], error: error.message });
  }
};

const AuthController = { GetAuthController, GetGoogleAuthController };
export default AuthController;
