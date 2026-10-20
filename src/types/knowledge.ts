export interface KnowledgeChunk {
  id: string;
  topic: "psychoeducation" | "life-skills" | "career" | "safety" | "referrals";
  title: string;
  author_or_organization: string;
  publication_date: string;
  url: string;
  material_section: string;
  review_status: "verified_expert" | "official_protocol" | "verified_peer";
  reviewed_at: string;
  audience: string;
  content: string;
  keywords: string[];
  embedding?: number[];
}

export interface RetrievedSource {
  id: string;
  title: string;
  author_or_organization: string;
  publication_date: string;
  url: string;
  material_section: string;
  score: number;
  snippet: string;
  review_status: "verified_expert" | "official_protocol" | "verified_peer";
}
