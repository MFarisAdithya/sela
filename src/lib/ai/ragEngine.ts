import { allKnowledgeChunks } from "@/data/knowledge-base";
import { KnowledgeChunk, RetrievalResult } from "@/types/knowledge";

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

export function searchKnowledgeBase(query: string, topK: number = 2): RetrievalResult[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const results: RetrievalResult[] = [];

  for (const chunk of allKnowledgeChunks) {
    let score = 0;
    const matchedKeywords: string[] = [];

    // 1. Keyword direct match (high precision)
    for (const kw of chunk.keywords) {
      const kwTokens = tokenize(kw);
      const isMatch = kwTokens.some((t) => queryTokens.includes(t));
      if (isMatch || query.toLowerCase().includes(kw.toLowerCase())) {
        score += 3.5;
        if (!matchedKeywords.includes(kw)) {
          matchedKeywords.push(kw);
        }
      }
    }

    // 2. Title token match
    const titleTokens = tokenize(chunk.title);
    for (const token of queryTokens) {
      if (titleTokens.includes(token)) {
        score += 2.0;
      }
    }

    // 3. Content token match
    const contentTokens = tokenize(chunk.content);
    for (const token of queryTokens) {
      if (contentTokens.includes(token)) {
        score += 0.8;
      }
    }

    if (score > 0) {
      results.push({
        chunk,
        score: Math.min(1.0, Number((score / 10).toFixed(2))),
        matchedKeywords,
      });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, topK);
}
