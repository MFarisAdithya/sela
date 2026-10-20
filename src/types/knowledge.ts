export interface KnowledgeChunk {
  id: string;
  topic: "psychoeducation" | "life-skills" | "career" | "safety" | "referrals";
  title: string;
  source_name: string;
  source_url_or_reference: string;
  review_status: "verified_expert" | "prototype_draft";
  reviewed_at: string;
  audience: string;
  content: string;
  keywords: string[];
}

export interface RetrievedSource {
  id: string;
  title: string;
  source_name: string;
  reference: string;
  score: number;
  snippet: string;
  review_status: "verified_expert" | "prototype_draft";
}
