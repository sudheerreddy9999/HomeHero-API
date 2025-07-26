'use strict';

import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import UserController from '../controllers/user.controller.js';
import OtpController from '../controllers/otp.contoller.js';
import UserJwtMiddleWare from '../middlewares/jwt..usermiddleware.js';
import customUtility from '../utility/custom.utility.js';
import AuthValidation from '../middlewares/validators/auth.validation.js';
import OtpValidation from '../middlewares/validators/otp.validation.js';

const Router = express.Router();

Router.use(customUtility.SetTimeZone);

Router.get('/generate/login/otp', OtpValidation.loginGetOtpValidation, OtpController.GenerateLoginOtpController);

Router.post('/login', AuthValidation.loginValidation, AuthController.GetAuthController);

Router.post('/google/login', AuthValidation.googleLoginValidation, AuthController.GetGoogleAuthController);

Router.use(UserJwtMiddleWare.VerifyToken);

Router.get('/details', UserController.GetUserDetailsContoller);

export default Router;
