'use strict';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mysql from './config/database/database.config.js';
import logger from './utility/logger.utility.js';
import UserRouter from './routes/user.route.js';
import ServiceRouter from './routes/services.route.js';
import OpenApi from './utility/swagger.utility.js';
import AppConfig from './config/app/app.config.js';

const { PORT, API_PREFIX, STATUS_MESSAGES } = AppConfig;

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

app.use(`${API_PREFIX}/api-docs`, OpenApi.serve, OpenApi.docPath);

app.use(`${API_PREFIX}/user`, UserRouter);

app.use(`${API_PREFIX}/service`, ServiceRouter);

app.use((request, response)=> {
  return response.status(404).json({message: STATUS_MESSAGES[404], error: 'Invalid api route'})
})
const mySqlDatabaseConnection = async () => {
  try {
    await mysql.authenticate();
    logger.info('database connected sucessfully');
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
    logger.info(error);
    process.exit(-1);
  }
};
mySqlDatabaseConnection();

startServer();
