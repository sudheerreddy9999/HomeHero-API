"use client";

import { ChromaClient } from "chromadb";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import logger from "../utility/logger.utility.js";

dotenv.config();

const chroma = new ChromaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

 const QueryServices = async (query) => {
  try {
    const collection = await chroma.getCollection({ name: "homehero" });
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
  }
};

const ChatService = {QueryServices};
export default ChatService;