'use strict';

import { header, validationResult } from 'express-validator';
import AppConfig from '../../config/app/app.config.js';

const {STATUS_MESSAGES} = AppConfig;

const loginGetOtpValidation = [
  header('email').trim().if(header('mobile').isEmpty()).notEmpty().withMessage('Please Enter Email Or MobileNumber'),
  header('mobile').trim().if(header('email').isEmpty()).notEmpty().withMessage('Please Enter Email Or MobileNumber'),
  header('type')
    .trim()
    .if(header('mobile').isEmpty())
    .isIn(['sms','whatsapp'])
    .withMessage('Enter valid otp type'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: STATUS_MESSAGES[400], error: errors });
    }
    next();
  },
];

const OtpValidation = { loginGetOtpValidation };

export default OtpValidation;
