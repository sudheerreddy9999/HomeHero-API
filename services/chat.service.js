"use strict";

import dotenv from "dotenv";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAI } from "openai";
import logger from "../utility/logger.utility.js";

dotenv.config();

// ✅ Initialize Pinecone
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

// ✅ Get your Pinecone index
const index = pinecone.index(process.env.PINECONE_INDEX_NAME || "homehero");

// ✅ Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const QueryServices = async (query) => {
  try {
    // 🔍 Step 1: Generate embedding from the user query
    const embeddingRes = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
    });

    let embedding = embeddingRes.data[0].embedding;

    // ✂️ Step 2: Slice if your index is 1024-dimensional
    embedding = embedding.slice(0, 1024);

    // 🔎 Step 3: Query Pinecone for nearest match
    const result = await index.query({
      topK: 1,
      vector: embedding,
      includeMetadata: true,
    });

    const match = result.matches?.[0];

    if (!match) {
      return "Sorry, I couldn't find any relevant service.";
    }

    return match.metadata?.content || "No relevant content found.";
  } catch (error) {
    logger.error({ queryServices: error.message });
    throw new Error("❌ Failed to query services");
  }
};

const ChatService = { QueryServices };
export default ChatService;
