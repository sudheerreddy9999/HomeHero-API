"use strict";

import nodemailer from "nodemailer";
import logger from "./logger.utility.js";
import AppConfig from "../config/app/app.config.js";

const SendEmail = async (toMail,subject,body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: AppConfig.EMAIL,
        pass: AppConfig.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
        from:AppConfig.EMAIL,
        to:toMail,
        subject:subject,
        html:body
    }
    console.log(body,"Body s")
    const data = await transporter.sendMail(mailOptions);
    return data;
  } catch (error) {
    logger.error({ sendEmail: error.message });
    throw new error(error.message);
  }
};

export default SendEmail;