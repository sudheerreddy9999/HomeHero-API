"use strict";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "./config/database/database.config.js";
import logger from "./utility/logger.utility.js";
import UserRouter from "./routes/user.route.js";
import ServiceRouter from "./routes/services.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use('/user',UserRouter)

app.use('/service',ServiceRouter)
const mySqlDatabaseConnection = async () => {
  try {
    await mysql.authenticate();
    logger.info("database connected sucessfully")
  } catch (error) {
    console.error(error);
  }
};

const startServer = () => {
  try {
    app.listen(PORT, () => {
      logger.info(`server started on Port ${PORT}`);
    });
  } catch (error) {
    logger.info(error)
    process.exit(-1);
  }
};
mySqlDatabaseConnection();

startServer();
