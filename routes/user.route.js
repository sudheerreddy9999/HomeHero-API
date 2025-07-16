"use strict";

import express from "express";
import AuthController from "../controllers/auth.controller.js";
import UserController from "../controllers/user.controller.js";
import OtpController from "../controllers/otp.contoller.js";
import ScrapingController from "../controllers/scrape.controller.js";
import UserJwtMiddleWare from "../middlewares/jwt..usermiddleware.js";
import customUtility from "../utility/custom.utility.js";
import AuthValidation from "../middlewares/validators/auth.validation.js";
import ScrapingValidation from "../middlewares/validators/scrape.validation.js"
import ChatController from "../controllers/chat.controller.js";
import EmbedController from "../controllers/embed.controller.js";



const Router = express.Router();

Router.use(customUtility.SetTimeZone)

Router.post("/login",AuthValidation.loginValidation, AuthController.GetUserController);
Router.post("/google/login", AuthController.GetGoogleAuthController);
Router.post("/register", UserController.RegisterNewUserController);
Router.get("/registerOtp", OtpController.InsertOtp);
Router.get("/verifyOtp", AuthController.VerifyOtpController);
Router.post("/scrape", ScrapingValidation.scrapeValidation, ScrapingController.ScrapeController);
Router.post("/chat", ChatController.QueryServicesController);
Router.post("/embed", EmbedController.EmbedAndServiceController);


Router.use(UserJwtMiddleWare.VerifyToken);
Router.get("/details",UserController.GetUserDetailsContoller)



export default Router;
