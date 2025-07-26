'use strict';

import { header, body, validationResult } from 'express-validator';
import AppConfig from '../../config/app/app.config.js';

const {STATUS_MESSAGES} = AppConfig;

const GetSearchServiceValidation = [
  header('service_id').trim().optional({values: 'falsy'}).isInt().withMessage('Please Enter valid service_id'),
  header('service_name').trim().optional({values: 'falsy'}).isLength({max: 200}).withMessage('Please Enter valid service_name'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: STATUS_MESSAGES[400], error: errors });
    }
    next();
  },
];



const ServicesValidation = { GetSearchServiceValidation };

export default ServicesValidation;
