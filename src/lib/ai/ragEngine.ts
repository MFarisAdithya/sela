import { ALL_KNOWLEDGE_CHUNKS } from "@/data/knowledge-base";
import { KnowledgeChunk, RetrievedSource } from "@/types/knowledge";

export interface RagResult {
  hasMatch: boolean;
  topScore: number;
  chunks: KnowledgeChunk[];
  sources: RetrievedSource[];
  contextText: string;
}

export function retrieveKnowledge(query: string, maxResults: number = 2): RagResult {
  const normalizedQuery = query.toLowerCase();
  const queryTokens = normalizedQuery
    .replace(/[^\w\s]/gi, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);

  if (queryTokens.length === 0) {
    return {
      hasMatch: false,
      topScore: 0,
      chunks: [],
      sources: [],
      contextText: "",
    };
  }

  const scoredChunks = ALL_KNOWLEDGE_CHUNKS.map((chunk) => {
    let score = 0;
    const chunkTitle = chunk.title.toLowerCase();
    const chunkContent = chunk.content.toLowerCase();
    const chunkKeywords = chunk.keywords.map((k) => k.toLowerCase());

    queryTokens.forEach((token) => {
      // Keyword match has high weight
      if (chunkKeywords.some((kw) => kw.includes(token))) {
        score += 3.0;
      }
      // Title match
      if (chunkTitle.includes(token)) {
        score += 2.0;
      }
      // Content match
      if (chunkContent.includes(token)) {
        score += 1.0;
      }
    });

    // Normalize score by token count
    const normalizedScore = score / (queryTokens.length * 3);

    return {
      chunk,
      score: normalizedScore,
    };
  });

  // Sort descending by score
  scoredChunks.sort((a, b) => b.score - a.score);

  const matched = scoredChunks.filter((item) => item.score >= 0.25).slice(0, maxResults);

  const chunks = matched.map((m) => m.chunk);
  const sources: RetrievedSource[] = matched.map((m) => ({
    id: m.chunk.id,
    title: m.chunk.title,
    source_name: m.chunk.source_name,
    reference: m.chunk.source_url_or_reference,
    score: Math.round(m.score * 100) / 100,
    snippet: m.chunk.content.slice(0, 150) + "...",
    review_status: m.chunk.review_status,
  }));

  const contextText = chunks
    .map(
      (c, idx) =>
        `[Sumber ${idx + 1}: ${c.title} (${c.source_name})]\\n${c.content}`
    )
    .join("\\n\\n");

  return {
    hasMatch: matched.length > 0,
    topScore: matched.length > 0 ? matched[0].score : 0,
    chunks,
    sources,
    contextText,
  };
}
