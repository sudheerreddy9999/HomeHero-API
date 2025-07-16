"use strict";

import { ChromaClient } from "chromadb";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import logger from "../utility/logger.utility.js";

dotenv.config();
console.log("ChromaDB Base URL:", process.env.CHROMA_BASE_URL);
// Connect to ChromaDB hosted on Render
const chroma = new ChromaClient({
  baseUrl: process.env.CHROMA_BASE_URL || "https://chroma-1-0-16-dev48.onrender.com/api/v2",
});

// OpenAI config
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const QueryServices = async (query) => {
  try {
    const collection = await chroma.getCollection({ name: "homehero" });
    console.log(collection,"collection value s ")
    const embeddingRes = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
    });

    const embedding = embeddingRes.data[0].embedding;

    const results = await collection.query({
      queryEmbeddings: [embedding],
      nResults: 1,
    });

    return results.documents[0][0];
  } catch (error) {
    logger.error({ queryServices: error.message });
    throw new Error("Failed to query services");
  }
};

const ChatService = { QueryServices };
export default ChatService;
