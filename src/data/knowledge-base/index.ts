import { KnowledgeChunk } from "@/types/knowledge";
import komunikasiAsertif from "./komunikasi-asertif.json";
import regulasiEmosi from "./regulasi-emosi.json";
import navigasiBantuan from "./navigasi-bantuan.json";
import relasiSosial from "./relasi-sosial.json";
import protokolKrisis from "./protokol-krisis.json";

export const ALL_KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  ...(komunikasiAsertif as KnowledgeChunk[]),
  ...(regulasiEmosi as KnowledgeChunk[]),
  ...(navigasiBantuan as KnowledgeChunk[]),
  ...(relasiSosial as KnowledgeChunk[]),
  ...(protokolKrisis as KnowledgeChunk[]),
];

export function getChunksByTopic(topic: KnowledgeChunk["topic"]): KnowledgeChunk[] {
  return ALL_KNOWLEDGE_CHUNKS.filter((chunk) => chunk.topic === topic);
}

export function getChunkById(id: string): KnowledgeChunk | undefined {
  return ALL_KNOWLEDGE_CHUNKS.find((chunk) => chunk.id === id);
}
