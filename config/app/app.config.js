import dotenv from 'dotenv';
dotenv.config();

const OTP_TYPES = {
  REGISTER: '1',
  LOGIN: '2',
};

const STATUS_MESSAGES = {
  200: 'OK - Request successful.',
  201: 'Created - Resource added successfully.',
  400: 'Bad Request - Invalid request format.',
  401: 'Unauthorized - Authentication required.',
  403: 'Forbidden - Access denied.',
  404: 'Not Found - Resource not available.',
  409: 'Conflict - Request conflicts with current state.',
  415: 'Unsupported Media Type - Format not supported.',
  422: 'Unprocessable Entity - Validation failed.',
  500: 'Internal Server Error - Server issue.',
  503: 'Service Unavailable - Server overloaded or down.',
};

const AppConfig = {
  PORT: process.env.PORT,
  JWT_SECRETKEY_USER: process.env.JWT_SECRETKEY_USER,
  LOG_LEVEL: process.env.LOG_LEVEL,
  JWT_USER_EXPIRY: process.env.JWT_USER_EXPIRY,
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  OTP_TYPES: OTP_TYPES,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  STATUS_MESSAGES: STATUS_MESSAGES,
  OPENAPI_PATH: process.env.OPENAPI_PATH,
  API_PREFIX: process.env.API_PREFIX,
};

export default AppConfig;
