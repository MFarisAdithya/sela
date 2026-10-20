import { KnowledgeChunk } from "@/types/knowledge";

import psychoData from "./psychoeducation.json";
import lifeSkillsData from "./life-skills.json";
import careerData from "./career-readiness.json";
import safetyData from "./safety-scripts.json";
import referralData from "./referral-directory.json";

export const allKnowledgeChunks: KnowledgeChunk[] = [
  ...(psychoData as KnowledgeChunk[]),
  ...(lifeSkillsData as KnowledgeChunk[]),
  ...(careerData as KnowledgeChunk[]),
  ...(safetyData as KnowledgeChunk[]),
  ...(referralData as KnowledgeChunk[]),
];

export function getVerifiedChunks(): KnowledgeChunk[] {
  return allKnowledgeChunks.filter((c) => c.review_status === "verified_expert");
}
