import assert from "node:assert/strict";
import { emptyAccountData, readAccountData, writeAccountData, removeAccountData, storageKeyForAccount } from "../src/lib/storage/accountStorage";

const records = new Map<string, string>();
const storage = {
  getItem: (key: string) => records.get(key) ?? null,
  setItem: (key: string, value: string) => { records.set(key, value); },
  removeItem: (key: string) => { records.delete(key); },
};
const a = "alice@example.test", b = "bob@example.test";
const data = emptyAccountData();
data.journalEntries.push({ id: "j-1", date: "today", prompt: "Refleksi", content: "Catatan Alice" });
data.storyCards.push({ id: "sc-1", date: "today", title: "Ceritaku", facts: "Lomba", feelings: "Antusias", needs: "Latihan", openingLine: "Boleh cerita?", targetPerson: "Teman Sebaya" });
data.activeStoryCardId = "sc-1";
data.completedModules.push("mod-1");
data.growthTasks.push({ id: "t-1", title: "Bercerita", category: "Pribadi", completed: true });
data.supportContacts.push({ id: "c-1", name: "Temanku", role: "Sahabat", category: "sahabat" });
data.checkInEmotions.push("pijar", "teduh");
data.reflectionMessages.push({ id: "m-1", sender: "user", text: "Aku semangat ikut lomba", timestamp: "12.00" });
data.practiceSessions["teman"] = [{ id: "m-2", sender: "persona", text: "Aku mendengarkan", timestamp: "12.01" }];

writeAccountData(storage, a, data);
assert.deepEqual(readAccountData(storage, a), data, "All feature data survives a fresh read");
assert.deepEqual(readAccountData(storage, b), emptyAccountData(), "Another account starts empty");
assert.deepEqual(readAccountData(storage, " ALICE@EXAMPLE.TEST "), data, "Identity remains stable after re-login or a different server-generated user ID");
const bob = emptyAccountData(); bob.completedModules.push("mod-2");
writeAccountData(storage, b, bob);
writeAccountData(storage, a, emptyAccountData());
assert.deepEqual(readAccountData(storage, a), emptyAccountData(), "Reset stays empty after refresh");
assert.deepEqual(readAccountData(storage, b), bob, "Reset does not touch another account");
removeAccountData(storage, a);
assert.equal(storage.getItem(storageKeyForAccount(a)), null);
assert.deepEqual(readAccountData(storage, b), bob, "Account deletion preserves other accounts");

storage.setItem(storageKeyForAccount(a), "{broken");
assert.throws(() => readAccountData(storage, a));
assert.equal(storage.getItem(storageKeyForAccount(a)), "{broken", "Corrupt data is preserved for recovery");
storage.setItem(storageKeyForAccount(a), JSON.stringify({ ...emptyAccountData(), version: 99 }));
assert.throws(() => readAccountData(storage, a), "Unsupported versions must not be silently overwritten");
assert.throws(() => readAccountData({ getItem() { throw new Error("blocked"); } }, a));
assert.throws(() => writeAccountData({ setItem() { throw new Error("quota exceeded"); } }, a, data));
assert.deepEqual(emptyAccountData().storyCards, [], "No example stories are presented as personal data");
assert.deepEqual(emptyAccountData().completedModules, [], "No fabricated progress");
console.log("PASS: persistence, account separation, re-login identity, reset, deletion, corrupt data, blocked storage and quota errors.");
