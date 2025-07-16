"use strict"
import logger from "../utility/logger.utility.js";
import embedService from "../services/embed.service.js";

const EmbedAndServiceController = async (request, response) => {
  try {
    // const { url } = request.body;
    // if (!url) {
    //   return response.status(400).json({ message: "URL is required" });
    // }
    
    await embedService.embedAndService();
    return response.status(200).json({ message: "Embedding and service completed successfully" });
  } catch (error) {
    logger.error({ EmbedAndServiceController: error.message });
    return response.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

const EmbedController = { EmbedAndServiceController };
export default EmbedController;
