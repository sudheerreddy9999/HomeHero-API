"use strict";

import express from "express";
import AuthController from "../controllers/auth.controller.js";
import UserController from "../controllers/user.controller.js";
import OtpController from "../controllers/otp.contoller.js";
import ScrapingController from "../controllers/scrape.controller.js";
import UserJwtMiddleWare from "../middlewares/jwt..usermiddleware.js";
import customUtility from "../utility/custom.utility.js";
import AuthValidation from "../middlewares/validators/auth.validation.js";
import ScrapingValidation from "../middlewares/validators/scrape.validation.js";
import ChatController from "../controllers/chat.controller.js";
import EmbedController from "../controllers/embed.controller.js";
import { ChromaClient } from "chromadb"; // ✅ Import Chroma client

const chroma = new ChromaClient({
  baseUrl: process.env.CHROMA_DB_URL || "https://chroma-1-0-16-dev48.onrender.com/api/v2"
});

const Router = express.Router();

Router.use(customUtility.SetTimeZone);

Router.post("/login", AuthValidation.loginValidation, AuthController.GetUserController);
Router.post("/google/login", AuthController.GetGoogleAuthController);
Router.post("/register", UserController.RegisterNewUserController);
Router.get("/registerOtp", OtpController.InsertOtp);
Router.get("/verifyOtp", AuthController.VerifyOtpController);
Router.post("/scrape", ScrapingValidation.scrapeValidation, ScrapingController.ScrapeController);
Router.post("/chat", ChatController.QueryServicesController);
Router.post("/embed", EmbedController.EmbedAndServiceController);

// ✅ Add ping route here
Router.get("/api/ping-chroma", async (req, res) => {
  try {
    const collections = await chroma.listCollections();
    res.json({ success: true, collections });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

Router.use(UserJwtMiddleWare.VerifyToken);
Router.get("/details", UserController.GetUserDetailsContoller);

export default Router;
