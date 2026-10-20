import { KnowledgeChunk } from "@/types/knowledge";
import psychoeducation from "./psychoeducation.json";
import lifeSkills from "./life-skills.json";
import careerReadiness from "./career-readiness.json";
import safetyScripts from "./safety-scripts.json";
import referralDirectory from "./referral-directory.json";

export const ALL_KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  ...(psychoeducation as KnowledgeChunk[]),
  ...(lifeSkills as KnowledgeChunk[]),
  ...(careerReadiness as KnowledgeChunk[]),
  ...(safetyScripts as KnowledgeChunk[]),
  ...(referralDirectory as KnowledgeChunk[]),
];

export function getChunksByTopic(topic: KnowledgeChunk["topic"]): KnowledgeChunk[] {
  return ALL_KNOWLEDGE_CHUNKS.filter((chunk) => chunk.topic === topic);
}

export function getChunkById(id: string): KnowledgeChunk | undefined {
  return ALL_KNOWLEDGE_CHUNKS.find((chunk) => chunk.id === id);
}
