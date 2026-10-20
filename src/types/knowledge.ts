export interface KnowledgeChunk {
  id: string;
  topic: "psychoeducation" | "life-skills" | "career" | "safety" | "referrals";
  title: string;
  source_name: string;
  source_url_or_reference: string;
  review_status: "verified_expert" | "prototype_draft";
  reviewed_at: string;
  target_audience: string;
  keywords: string[];
  content: string;
}

export interface RetrievalResult {
  chunk: KnowledgeChunk;
  score: number;
  matchedKeywords: string[];
}
