import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

// Read GEMINI_API_KEY from .env.local
const envLocalPath = path.resolve(process.cwd(), ".env.local");
let geminiKey = process.env.GEMINI_API_KEY;

if (!geminiKey && fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf-8");
  const match = envContent.match(/GEMINI_API_KEY=(.+)/);
  if (match) geminiKey = match[1].trim();
}

if (!geminiKey) {
  console.error("Error: GEMINI_API_KEY not found in process.env or .env.local");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: geminiKey });
const KB_DIR = path.resolve(process.cwd(), "src/data/knowledge-base");

const chunkFiles = [
  "psychoeducation.json",
  "life-skills.json",
  "career-readiness.json",
  "safety-scripts.json",
  "referral-directory.json",
];

async function generateAllEmbeddings() {
  console.log("Generating Gemini Semantic Embeddings for Knowledge Base...\n");

  const embeddedChunks = [];

  for (const file of chunkFiles) {
    const filePath = path.join(KB_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const chunks = JSON.parse(content);

    for (const chunk of chunks) {
      const textToEmbed = `${chunk.title}. ${chunk.content} Kata kunci: ${chunk.keywords.join(", ")}`;
      console.log(`Embedding chunk [${chunk.id}] "${chunk.title}"...`);

      const res = await ai.models.embedContent({
        model: "gemini-embedding-2",
        contents: textToEmbed,
      });

      const vector = res.embeddings?.[0]?.values;
      if (!vector) {
        throw new Error(`Failed to get embedding vector for ${chunk.id}`);
      }

      embeddedChunks.push({
        ...chunk,
        embedding: vector,
      });

      // Brief delay to be polite to the rate limit
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  const outputPath = path.join(KB_DIR, "embeddings-index.json");
  fs.writeFileSync(outputPath, JSON.stringify(embeddedChunks, null, 2), "utf-8");
  console.log(`\nSUCCESS: Generated embeddings for ${embeddedChunks.length} chunks!`);
  console.log(`Saved embedding index to: ${outputPath}`);
}

generateAllEmbeddings().catch((err) => {
  console.error("Embedding generation failed:", err);
  process.exit(1);
});
