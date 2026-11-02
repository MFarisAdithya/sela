"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

import { usePathname } from "next/navigation";
import { isPublicRoute } from "@/lib/routes";
import { useAuth } from "./AuthContext";
import { readAccountData, writeAccountData, SavedMessage } from "@/lib/storage/accountStorage";

export type MoodType = "sangat-sedih" | "sedih" | "biasa" | "senang" | "bersemangat";

export interface StoryCard {
  id: string;
  title: string;
  date: string;
  facts: string;
  feelings: string;
  needs: string;
  openingLine: string;
  targetPerson: "Orang Tua" | "Guru / Dosen" | "Teman Sebaya" | "Konselor Profesional";
}

export interface JournalEntry {
  id: string;
  date: string;
  prompt: string;
  content: string;
  mood?: MoodType;
}

export interface SupportContact {
  id: string;
  name: string;
  role: string;
  category: "sahabat" | "keluarga" | "sekolah" | "profesional";
  note?: string;
}

export interface GrowthTask {
  id: string;
  title: string;
  category: string;
  completed: boolean;
}

export interface ReferralTicket {
  id: string;
  date: string;
  type: string;
  contactTarget: string;
  sharedData: {
    alias: string;
    ageRange: string;
    summary: string;
  };
  status: "simulasi_dibuat" | "menunggu_tinjauan";
}

interface AppContextType {
  userName: string;
  userAgeRange: string;
  hasConsented: boolean;
  setHasConsented: (val: boolean) => void;
  allowAiTransmission: boolean;
  currentMood: MoodType | null;
  setCurrentMood: (mood: MoodType | null) => void;
  completedModules: string[];
  toggleModuleCompleted: (moduleId: string) => void;
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, "id" | "date">) => void;
  deleteJournalEntry: (id: string) => void;
  clearAllJournal: () => void;
  storyCards: StoryCard[];
  activeStoryCard: StoryCard | null;
  setActiveStoryCard: (card: StoryCard | null) => void;
  addStoryCard: (card: Omit<StoryCard, "id" | "date">) => StoryCard;
  updateStoryCard: (id: string, updates: Partial<StoryCard>) => void;
  deleteStoryCard: (id: string) => void;
  clearAllStoryCards: () => void;
  supportContacts: SupportContact[];
  addSupportContact: (contact: Omit<SupportContact, "id">) => void;
  deleteSupportContact: (id: string) => void;
  growthTasks: GrowthTask[];
  toggleGrowthTask: (taskId: string) => void;
  addGrowthTask: (title: string) => void;
  referralTickets: ReferralTicket[];
  createReferralTicket: (ticket: Omit<ReferralTicket, "id" | "date" | "status">) => void;
  isAiConfigured: boolean;
  checkAiConfiguration: () => Promise<boolean>;
  resetAllSessionData: () => void;
  checkInEmotions: string[];
  setCheckInEmotions: React.Dispatch<React.SetStateAction<string[]>>;
  reflectionMessages: SavedMessage[];
  setReflectionMessages: React.Dispatch<React.SetStateAction<SavedMessage[]>>;
  practiceSessions: Record<string, SavedMessage[]>;
  setPracticeSessions: React.Dispatch<React.SetStateAction<Record<string, SavedMessage[]>>>;
  storageNotice: string;

}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const publicPage = isPublicRoute(usePathname());
  if (isLoading && !publicPage) return <p role="status" className="p-6 text-sm">Memuat akunmu...</p>;
  return <AccountAppProvider key={user?.email.toLowerCase() || "guest"}>{children}</AccountAppProvider>;
};

const AccountAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const publicPage = isPublicRoute(usePathname());
  const userName = user?.displayName || "Kawan";
  const userAgeRange = user?.ageBand || "15-18 tahun";
  const allowAiTransmission = user?.consent.aiProcessingConsent ?? false;
  const [hasConsented, setHasConsented] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [storyCards, setStoryCards] = useState<StoryCard[]>([]);
  const [activeStoryCard, setActiveStoryCard] = useState<StoryCard | null>(null);
  const [supportContacts, setSupportContacts] = useState<SupportContact[]>([]);
  const [growthTasks, setGrowthTasks] = useState<GrowthTask[]>([]);
  const [referralTickets, setReferralTickets] = useState<ReferralTicket[]>([]);
  const [isAiConfigured, setIsAiConfigured] = useState(false);

  const [checkInEmotions, setCheckInEmotions] = useState<string[]>([]);
  const [reflectionMessages, setReflectionMessages] = useState<SavedMessage[]>([]);
  const [practiceSessions, setPracticeSessions] = useState<Record<string, SavedMessage[]>>({});
  const [resetVersion, setResetVersion] = useState(0);
  const [ready, setReady] = useState(false);
  const [storageNotice, setStorageNotice] = useState(user ? "" : "Masuk ke akun agar catatan dan percakapan tersimpan di browser ini.");
  const [canSave, setCanSave] = useState(true);

  useEffect(() => {
    if (user) {
      try {
        const saved = readAccountData(localStorage, user.email);
        setHasConsented(saved.hasConsented);
        setCurrentMood(saved.currentMood);
        setCompletedModules(saved.completedModules);
        setJournalEntries(saved.journalEntries);
        setStoryCards(saved.storyCards);
        setActiveStoryCard(saved.storyCards.find(c => c.id === saved.activeStoryCardId) || null);
        setSupportContacts(saved.supportContacts);
        setGrowthTasks(saved.growthTasks);
        setReferralTickets(saved.referralTickets);
        setCheckInEmotions(saved.checkInEmotions);
        setReflectionMessages(saved.reflectionMessages);
        setPracticeSessions(saved.practiceSessions);
      } catch {
        setCanSave(false);
        setStorageNotice("Data tersimpan belum bisa dibaca. Data lama tidak ditimpa; perubahan sesi ini belum tersimpan. Kamu bisa mencoba memuat ulang atau mereset data di Pengaturan.");
      }
    }
    // Discard the old unscoped check-in so it cannot follow another account.
    try { sessionStorage.removeItem("sela:checkin_emotions"); } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !user || !canSave) return;
    try {
      writeAccountData(localStorage, user.email, {
        version: 1, hasConsented, currentMood, completedModules, journalEntries, storyCards,
        activeStoryCardId: activeStoryCard?.id || null, supportContacts, growthTasks,
        referralTickets, checkInEmotions, reflectionMessages, practiceSessions,
      });
      setStorageNotice("");
    } catch {
      setStorageNotice("Perubahan belum tersimpan di browser. Ruang penyimpanan mungkin penuh atau diblokir. Ekspor datamu sebelum menutup halaman.");
    }
  }, [ready, user?.email, canSave, hasConsented, currentMood, completedModules, journalEntries, storyCards, activeStoryCard, supportContacts, growthTasks, referralTickets, checkInEmotions, reflectionMessages, practiceSessions]);

  // Check backend AI configuration status
  const checkAiConfiguration = async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/health");
      if (res.ok) {
        const data = await res.json();
        setIsAiConfigured(!!data.isConfigured);
        return !!data.isConfigured;
      }
    } catch {
      setIsAiConfigured(false);
    }
    return false;
  };

  useEffect(() => {
    checkAiConfiguration();
  }, []);

  const toggleModuleCompleted = (moduleId: string) => {
    setCompletedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const addJournalEntry = (entry: Omit<JournalEntry, "id" | "date">) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: "j-" + Date.now(),
      date: new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    setJournalEntries((prev) => [newEntry, ...prev]);
  };

  const deleteJournalEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const clearAllJournal = () => {
    setJournalEntries([]);
  };

  const addSupportContact = (contact: Omit<SupportContact, "id">) => {
    const newContact: SupportContact = {
      ...contact,
      id: "c-" + Date.now(),
    };
    setSupportContacts((prev) => [...prev, newContact]);
  };

  const deleteSupportContact = (id: string) => {
    setSupportContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const addGrowthTask = (title: string) => {
    if (!title.trim()) return;
    setGrowthTasks(prev => [...prev, { id: "task-" + Date.now(), title: title.trim(), category: "Target Pribadi", completed: false }]);
  };

  const toggleGrowthTask = (taskId: string) => {
    setGrowthTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const createReferralTicket = (ticket: Omit<ReferralTicket, "id" | "date" | "status">) => {
    const newTicket: ReferralTicket = {
      ...ticket,
      id: "TICKET-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleString("id-ID"),
      status: "simulasi_dibuat",
    };
    setReferralTickets((prev) => [newTicket, ...prev]);
  };

  const addStoryCard = (card: Omit<StoryCard, "id" | "date">): StoryCard => {
    const newCard: StoryCard = {
      ...card,
      id: "sc-" + Date.now(),
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
    setStoryCards((prev) => [newCard, ...prev]);
    setActiveStoryCard(newCard);
    return newCard;
  };

  const updateStoryCard = (id: string, updates: Partial<StoryCard>) => {
    setStoryCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    if (activeStoryCard?.id === id) {
      setActiveStoryCard((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteStoryCard = (id: string) => {
    setStoryCards((prev) => prev.filter((c) => c.id !== id));
    if (activeStoryCard?.id === id) {
      setActiveStoryCard(null);
    }
  };

  const clearAllStoryCards = () => {
    setStoryCards([]);
    setActiveStoryCard(null);
  };

  const resetAllSessionData = () => {
    setResetVersion(value => value + 1);
    setHasConsented(false);
    setCurrentMood(null);
    setCompletedModules([]);
    setJournalEntries([]);
    setStoryCards([]);
    setActiveStoryCard(null);
    try { sessionStorage.removeItem("sela:checkin_emotions"); } catch {}
    setSupportContacts([]);
    setGrowthTasks([]);
    setCheckInEmotions([]);
    setReflectionMessages([]);
    setPracticeSessions({});
    setCanSave(true);
    setReferralTickets([]);
  };

  if (!ready && !publicPage) return <p role="status" className="p-6 text-sm">Memuat catatanmu...</p>;

  return (
    <AppContext.Provider
      value={{
        userName,
        userAgeRange,
        hasConsented,
        setHasConsented,
        allowAiTransmission,
        currentMood,
        setCurrentMood,
        completedModules,
        toggleModuleCompleted,
        journalEntries,
        addJournalEntry,
        deleteJournalEntry,
        clearAllJournal,
        storyCards,
        activeStoryCard,
        setActiveStoryCard,
        addStoryCard,
        updateStoryCard,
        deleteStoryCard,
        clearAllStoryCards,
        supportContacts,
        addSupportContact,
        deleteSupportContact,
        growthTasks,
        toggleGrowthTask,
        addGrowthTask,
        referralTickets,
        createReferralTicket,
        isAiConfigured,
        checkAiConfiguration,
        resetAllSessionData,
        checkInEmotions, setCheckInEmotions, reflectionMessages, setReflectionMessages, practiceSessions, setPracticeSessions, storageNotice,
      }}
    >
      <React.Fragment key={resetVersion}>{children}</React.Fragment>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
