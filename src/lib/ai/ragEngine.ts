import { GoogleGenAI } from "@google/genai";
import { ALL_KNOWLEDGE_CHUNKS } from "@/data/knowledge-base";
import embeddedChunksData from "@/data/knowledge-base/embeddings-index.json";
import { KnowledgeChunk, RetrievedSource } from "@/types/knowledge";

export interface RagResult {
  hasMatch: boolean;
  topScore: number;
  chunks: KnowledgeChunk[];
  sources: RetrievedSource[];
  contextText: string;
}

// Map pre-computed embeddings if available
const precomputedMap = new Map<string, number[]>();
if (Array.isArray(embeddedChunksData)) {
  for (const c of embeddedChunksData as any[]) {
    if (c.id && c.embedding) {
      precomputedMap.set(c.id, c.embedding);
    }
  }
}

// Ensure all 24 curated knowledge chunks are indexed
const EMBEDDED_CHUNKS: KnowledgeChunk[] = ALL_KNOWLEDGE_CHUNKS.map((chunk) => {
  if (!chunk.embedding && precomputedMap.has(chunk.id)) {
    return { ...chunk, embedding: precomputedMap.get(chunk.id) };
  }
  return chunk;
});

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
  return magnitude === 0 ? 0 : dotProduct / magnitude;
}

function lexicalScore(query: string, chunk: KnowledgeChunk): number {
  const queryTokens = query
    .toLowerCase()
    .replace(/[^\w\s]/gi, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);

  if (queryTokens.length === 0) return 0;

  let score = 0;
  const title = chunk.title.toLowerCase();
  const content = chunk.content.toLowerCase();
  const keywords = chunk.keywords.map((k) => k.toLowerCase());

  queryTokens.forEach((token) => {
    if (keywords.some((kw) => kw.includes(token))) score += 3.0;
    if (title.includes(token)) score += 2.0;
    if (content.includes(token)) score += 1.0;
  });

  return score / (queryTokens.length * 3);
}

/**
 * Retrieve knowledge using hybrid Gemini Semantic Embeddings + Lexical Scoring.
 * Automatically falls back to BM25 lexical match if embedding API times out or fails.
 */
export async function retrieveKnowledge(query: string, maxResults: number = 2): Promise<RagResult> {
  const normalizedQuery = query.trim();
  if (!normalizedQuery || normalizedQuery.length < 3) {
    return {
      hasMatch: false,
      topScore: 0,
      chunks: [],
      sources: [],
      contextText: "",
    };
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  let queryVector: number[] | null = null;

  // 1. Attempt to generate Query Embedding via Gemini
  if (geminiKey && geminiKey.trim().length > 0) {
    try {
      const ai = new GoogleGenAI({ apiKey: geminiKey.trim() });
      const embedPromise = ai.models.embedContent({
        model: "gemini-embedding-2",
        contents: normalizedQuery,
      });

      // 4-second timeout for query embedding
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Embedding query timeout")), 4000)
      );

      const res = (await Promise.race([embedPromise, timeoutPromise])) as any;
      queryVector = res.embeddings?.[0]?.values || null;
    } catch (err: any) {
      console.warn("Query embedding failed, falling back to lexical search:", err?.message || err);
      queryVector = null;
    }
  }

  // 2. Score chunks with Hybrid Formula: (0.7 * Semantic) + (0.3 * Lexical)
  const scored = EMBEDDED_CHUNKS.map((chunk) => {
    const lexScore = lexicalScore(normalizedQuery, chunk);
    let finalScore = lexScore;

    if (queryVector && chunk.embedding && chunk.embedding.length > 0) {
      const semScore = cosineSimilarity(queryVector, chunk.embedding);
      // Hybrid combination
      finalScore = 0.7 * semScore + 0.3 * lexScore;
    }

    return {
      chunk,
      score: Math.round(finalScore * 100) / 100,
    };
  });

  // Sort descending by relevance score
  scored.sort((a, b) => b.score - a.score);

  // Minimum relevance threshold (0.55 for hybrid semantic, or 0.25 for pure lexical)
  // Higher semantic threshold (0.55) ensures unrelated/out-of-scope queries don't match baseline vector noise
  const threshold = queryVector ? 0.55 : 0.25;
  const matched = scored.filter((item) => item.score >= threshold).slice(0, maxResults);

  const chunks = matched.map((m) => m.chunk);
  const sources: RetrievedSource[] = matched.map((m) => ({
    id: m.chunk.id,
    title: m.chunk.title,
    author_or_organization: m.chunk.author_or_organization,
    publication_date: m.chunk.publication_date,
    url: m.chunk.url,
    material_section: m.chunk.material_section,
    score: m.score,
    snippet: m.chunk.content.slice(0, 160) + "...",
    review_status: m.chunk.review_status,
  }));

  const contextText = chunks
    .map(
      (c, idx) =>
        `[Dokumen ${idx + 1}: ${c.title}]\nOrganisasi/Penulis: ${c.author_or_organization} (${c.publication_date})\nBagian: ${c.material_section}\nKutipan Materi: ${c.content}\nURL Sumber Resmi: ${c.url}`
    )
    .join("\n\n");

  return {
    hasMatch: matched.length > 0,
    topScore: matched.length > 0 ? matched[0].score : 0,
    chunks,
    sources,
    contextText,
  };
}
