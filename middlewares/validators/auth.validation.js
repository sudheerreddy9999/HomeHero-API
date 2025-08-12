'use strict';

import { header, body, validationResult } from 'express-validator';
import AppConfig from '../../config/app/app.config.js';

const {STATUS_MESSAGES} = AppConfig;

const loginValidation = [
  header('email').trim().if(header('mobile').isEmpty()).notEmpty().withMessage('Please Enter Email Or MobileNumber'),
  // header('mobile').trim().if(header('email').isEmpty()).notEmpty().withMessage('Please Enter Email Or MobileNumber'),
  header('otp')
    .trim()
    .notEmpty()
    .withMessage('Enter valid otp')
    .isLength({ min: 5, max: 5 })
    .withMessage('Enter valid otp with 5 digits'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: STATUS_MESSAGES[400], error: errors });
    }
    next();
  },
];

const googleLoginValidation = [
  body('googletoken').trim().notEmpty().withMessage('Enter valid googletoken'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: STATUS_MESSAGES[400], error: errors });
    }
    next();
  },
];

const AuthValidation = { loginValidation,googleLoginValidation };

export default AuthValidation;
