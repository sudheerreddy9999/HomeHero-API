'use strict';

import logger from '../utility/logger.utility.js';
import OtpService from '../services/otp.service.js';
import AppConfig from '../config/app/app.config.js';

const { STATUS_MESSAGES } = AppConfig;

const GenerateLoginOtpController = async (request, response) => {
  try {
    const data = await OtpService.RegisterOtpService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.customMessage });
    }
    return response.status(200).json({ message: 'Otp Sent Successfully' });
  } catch (error) {
    logger.error({ GenerateLoginOtpController: error.message });
    return response.status(500).json({ message: STATUS_MESSAGES[500], error: error.message });
  }
};

const OtpController = { GenerateLoginOtpController };

export default OtpController;
