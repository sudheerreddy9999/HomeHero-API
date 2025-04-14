"use strict";

import logger from "../utility/logger.utility.js";
import OtpService from "../services/otp.service.js";

const InsertOtp = async (request, response) => {
  try {
    const data = await OtpService.RegisterOtpService(request);
    if (data.errorCode) {
      return response
        .status(data.errorCode)
        .json({ message: data.customMessage });
    }
    return response.status(200).json({ message: "Otp Sent Successfully" });
  } catch (error) {
    logger.error(error.message);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};

const VerifyOtpController = async (request, response) => {
  try {
    const data = await OtpService.VerifyOtpService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.customMessage });
    }
    return response.status(200).json({ message: "Otp Verified Successfully" });
  } catch (error) {
    logger.error({ VerifyOtpController: error.message });
    return response.status(500).json({ message: "Internal server error" });
  }
};

const OtpController = { InsertOtp, VerifyOtpController };

export default OtpController;
