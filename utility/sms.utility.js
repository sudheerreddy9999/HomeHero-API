"use strict";

import axios from "axios";
import logger from "./logger.utility.js";

const SendSMS = async (type, number, message) => {
  try {
    const url = `https://www.fast2sms.com/dev/bulkV2`;
    const headers = {
      'Authorization':
        "",
      "Content-Type": "application/json",
    };

    const requestBody = {
      route: type,
      variables_values: message,
      numbers: number,
    };

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://www.fast2sms.com/dev/bulkV2',
        headers: { 
          'Authorization': 'Oke9CMhvdtUqGL0uR6SAVIfDjiH7nb2WEg4KpFQZsXYc3oNTx8Sp5M1JFe42CYjERoAfB8gliaG7qkOT'
        },
        data : requestBody
      };
    const response = await axios.request(config);
    return response;
  } catch (error) {
    logger.error({ SendSMS: `SMS Sent Failed with error : ${error.message}` });
    return false;
  }
};

export default SendSMS;
