import { config } from "dotenv";
import { OpenAI } from "openai";
import fs from "fs";
import { ChromaClient } from "chromadb";

config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const chroma = new ChromaClient({
  baseUrl: 'https://chroma-1-0-16-dev48.onrender.com/api/v2',
});



const contentFile = "data/homehero-content.json";
const serviceData = JSON.parse(fs.readFileSync(contentFile, "utf8"));

async function embedAndStore() {
  const collection = await chroma.getOrCreateCollection({
    name: "homehero",
    embeddingFunction: null,
  });

  for (let i = 0; i < serviceData.length; i++) {
    const item = serviceData[i];

    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: item.content,
    });

    const embedding = embeddingResponse.data[0].embedding;

    await collection.add({
      ids: [`item-${i}`],
      documents: [item.content],
      embeddings: [embedding],
      metadatas: [item],
    });

    console.log(`✅ Embedded: ${item.content}`);
  }

  console.log("🎉 All items embedded and stored in Chroma.");
}

embedAndStore().catch(console.error);
