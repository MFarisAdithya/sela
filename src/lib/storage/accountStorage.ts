import { z } from "zod";

const text = z.string();
const mood = z.enum(["sangat-sedih", "sedih", "biasa", "senang", "bersemangat"]);
const source = z.object({ id: text, title: text, author_or_organization: text, publication_date: text, url: text, material_section: text, score: z.number(), snippet: text, review_status: z.enum(["verified_expert", "official_protocol", "verified_peer"]) });
export const messageSchema = z.object({ id: text, sender: z.enum(["user", "ai", "system", "persona"]), text, timestamp: text, tip: text.optional(), isCrisis: z.boolean().optional(), sources: z.array(source).optional() });
export const accountDataSchema = z.object({
  version: z.literal(1),
  hasConsented: z.boolean(), currentMood: mood.nullable(),
  completedModules: z.array(text),
  journalEntries: z.array(z.object({ id: text, date: text, prompt: text, content: text, mood: mood.optional() })),
  storyCards: z.array(z.object({ id: text, date: text, title: text, facts: text, feelings: text, needs: text, openingLine: text, targetPerson: z.enum(["Orang Tua", "Guru / Dosen", "Teman Sebaya", "Konselor Profesional"]) })),
  activeStoryCardId: text.nullable(),
  supportContacts: z.array(z.object({ id: text, name: text, role: text, category: z.enum(["sahabat", "keluarga", "sekolah", "profesional"]), note: text.optional() })),
  growthTasks: z.array(z.object({ id: text, title: text, category: text, completed: z.boolean() })),
  referralTickets: z.array(z.object({ id: text, date: text, type: text, contactTarget: text, sharedData: z.object({ alias: text, ageRange: text, summary: text }), status: z.enum(["simulasi_dibuat", "menunggu_tinjauan"]) })),
  checkInEmotions: z.array(text),
  reflectionMessages: z.array(messageSchema),
  practiceSessions: z.record(z.array(messageSchema)),
});
export type AccountData = z.infer<typeof accountDataSchema>;
export type SavedMessage = z.infer<typeof messageSchema>;
export const storageKeyForAccount = (email: string) => `sela:account:v1:${encodeURIComponent(email.trim().toLowerCase())}`;
export function emptyAccountData(): AccountData {
  return { version: 1, hasConsented: false, currentMood: null, completedModules: [], journalEntries: [], storyCards: [], activeStoryCardId: null, supportContacts: [], growthTasks: [], referralTickets: [], checkInEmotions: [], reflectionMessages: [], practiceSessions: {} };
}
export function readAccountData(storage: Pick<Storage, "getItem">, email: string): AccountData {
  const raw = storage.getItem(storageKeyForAccount(email));
  return raw === null ? emptyAccountData() : accountDataSchema.parse(JSON.parse(raw));
}
export function writeAccountData(storage: Pick<Storage, "setItem">, email: string, data: AccountData) {
  storage.setItem(storageKeyForAccount(email), JSON.stringify(accountDataSchema.parse(data)));
}
export function removeAccountData(storage: Pick<Storage, "removeItem">, email: string) {
  storage.removeItem(storageKeyForAccount(email));
}
