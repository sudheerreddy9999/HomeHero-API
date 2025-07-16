import dotenv from "dotenv";
import fs from "fs";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAI } from "openai";

dotenv.config();

// Init OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Init Pinecone
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pinecone.index(process.env.PINECONE_INDEX_NAME || "homehero");

// Load data
const data = JSON.parse(fs.readFileSync("data/homehero-content.json", "utf8"));

// Embed and upsert
const  embedAndStore=async()=> {
  try {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      const embeddingRes = await openai.embeddings.create({
        model: "text-embedding-3-small", // 1536-dim output
        input: item.content,
      });

      let fullEmbedding = embeddingRes.data[0].embedding;

      // ✅ Truncate to match index dimension (1024)
      const embedding = fullEmbedding.slice(0, 1024);

      await index.upsert([
        {
          id: `item-${i}`,
          values: embedding,
          metadata: {
            ...item,
          },
        },
      ]);

      console.log(`✅ Stored: ${item.content}`);
    }
    return "All items embedded and stored successfully!";
    console.log("🎉 All data embedded and upserted to Pinecone.");
  } catch (error) {
    console.error("❌ Error embedding and storing:", error);
  }
}

const embedService = {embedAndStore};

export default embedService;
