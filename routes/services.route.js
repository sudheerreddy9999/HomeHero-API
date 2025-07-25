"use strict";

import express from "express";
import ServicesController from "../controllers/services.controller.js";
import UserJwtMiddleWare from "../middlewares/jwt..usermiddleware.js";
import customUtility from "../utility/custom.utility.js";

const Router = express.Router();

//To set mysql time zone
Router.use(customUtility.SetTimeZone);

//user validation
Router.use(UserJwtMiddleWare.VerifyToken);

Router.get("/", ServicesController.GetServicesController);

Router.get("/search", ServicesController.GetSearchServiceTypesController);

export default Router;
