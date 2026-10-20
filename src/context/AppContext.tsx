"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface JournalEntry {
  id: string;
  date: string;
  prompt: string;
  content: string;
  reflectedByAi?: boolean;
}

export interface TrustedContact {
  id: string;
  name: string;
  role: string;
  category: "sahabat" | "keluarga" | "guru_bk" | "konselor" | "profesional";
}

export interface GrowthTask {
  id: string;
  text: string;
  category: string;
  completed: boolean;
}

export interface ReferralTicket {
  id: string;
  targetRole: string;
  sharedFields: string[];
  summaryNote: string;
  createdAt: string;
}

interface AppContextType {
  userName: string;
  setUserName: (name: string) => void;
  hasConsented: boolean;
  setHasConsented: (consented: boolean) => void;
  isAiActive: boolean;
  setIsAiActive: (active: boolean) => void;
  currentMood: string | null;
  setCurrentMood: (mood: string | null) => void;
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, "id" | "date">) => void;
  deleteJournalEntry: (id: string) => void;
  clearAllJournals: () => void;
  completedModules: string[];
  toggleModuleComplete: (moduleId: string) => void;
  trustedContacts: TrustedContact[];
  addTrustedContact: (contact: Omit<TrustedContact, "id">) => void;
  growthTasks: GrowthTask[];
  toggleGrowthTask: (taskId: string) => void;
  referralTickets: ReferralTicket[];
  addReferralTicket: (ticket: Omit<ReferralTicket, "id" | "createdAt">) => void;
  resetAllSessionData: () => void;
}

const defaultGrowthTasks: GrowthTask[] = [
  { id: "gt-1", text: "Menulis 1 refleksi singkat tentang perasaan hari ini", category: "Refleksi", completed: true },
  { id: "gt-2", text: "Menyelesaikan modul 'Mengenali & Memvalidasi Emosi Diri'", category: "Belajar", completed: true },
  { id: "gt-3", text: "Mengirim pesan kabar ke 1 teman atau orang terpercaya", category: "Dukungan", completed: false },
  { id: "gt-4", text: "Mempraktikkan kalimat asertif 'Saya merasa...' saat berkomunikasi", category: "Life Skills", completed: false },
];

const defaultContacts: TrustedContact[] = [
  { id: "tc-1", name: "Rian (Teman Sebaya)", role: "Sahabat Dekat", category: "sahabat" },
  { id: "tc-2", name: "Ibu / Bibi", role: "Keluarga Inti", category: "keluarga" },
  { id: "tc-3", name: "Bu Rahma, S.Pd", role: "Guru BK Sekolah", category: "guru_bk" },
  { id: "tc-4", name: "Fasilitator PIK-R", role: "Konselor Sebaya Remaja", category: "konselor" },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string>("Alex");
  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [isAiActive, setIsAiActive] = useState<boolean>(false);
  const [currentMood, setCurrentMood] = useState<string | null>("senang");
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: "j-1",
      date: "Hari ini",
      prompt: "Apa hal yang membuatmu merasa aman atau bersyukur hari ini?",
      content: "Hari ini aku berhasil menyelesaikan tugas sekolah tepat waktu dan meluangkan 10 menit untuk istirahat tanpa melihat media sosial.",
      reflectedByAi: false,
    },
  ]);
  const [completedModules, setCompletedModules] = useState<string[]>(["mod-1", "mod-2"]);
  const [trustedContacts, setTrustedContacts] = useState<TrustedContact[]>(defaultContacts);
  const [growthTasks, setGrowthTasks] = useState<GrowthTask[]>(defaultGrowthTasks);
  const [referralTickets, setReferralTickets] = useState<ReferralTicket[]>([]);

  // Load from sessionStorage safely on mount
  useEffect(() => {
    try {
      const storedConsent = sessionStorage.getItem("fc_consent");
      if (storedConsent) setHasConsented(storedConsent === "true");

      const storedMood = sessionStorage.getItem("fc_mood");
      if (storedMood) setCurrentMood(storedMood);

      const storedAiMode = sessionStorage.getItem("fc_ai_mode");
      if (storedAiMode) setIsAiActive(storedAiMode === "active");

      const storedName = sessionStorage.getItem("fc_name");
      if (storedName) setUserName(storedName);
    } catch {
      // sessionStorage not available (e.g. private mode restriction)
    }
  }, []);

  const handleSetHasConsented = (consented: boolean) => {
    setHasConsented(consented);
    try {
      sessionStorage.setItem("fc_consent", String(consented));
    } catch {}
  };

  const handleSetAiActive = (active: boolean) => {
    setIsAiActive(active);
    try {
      sessionStorage.setItem("fc_ai_mode", active ? "active" : "demo");
    } catch {}
  };

  const handleSetMood = (mood: string | null) => {
    setCurrentMood(mood);
    try {
      if (mood) sessionStorage.setItem("fc_mood", mood);
      else sessionStorage.removeItem("fc_mood");
    } catch {}
  };

  const handleSetName = (name: string) => {
    setUserName(name);
    try {
      sessionStorage.setItem("fc_name", name);
    } catch {}
  };

  const addJournalEntry = (entry: Omit<JournalEntry, "id" | "date">) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: "j-" + Date.now(),
      date: new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "short",
      }),
    };
    setJournalEntries((prev) => [newEntry, ...prev]);
  };

  const deleteJournalEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAllJournals = () => {
    setJournalEntries([]);
  };

  const toggleModuleComplete = (moduleId: string) => {
    setCompletedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const addTrustedContact = (contact: Omit<TrustedContact, "id">) => {
    const newContact: TrustedContact = {
      ...contact,
      id: "tc-" + Date.now(),
    };
    setTrustedContacts((prev) => [...prev, newContact]);
  };

  const toggleGrowthTask = (taskId: string) => {
    setGrowthTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const addReferralTicket = (ticket: Omit<ReferralTicket, "id" | "createdAt">) => {
    const newTicket: ReferralTicket = {
      ...ticket,
      id: "ref-" + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };
    setReferralTickets((prev) => [newTicket, ...prev]);
  };

  const resetAllSessionData = () => {
    setHasConsented(false);
    setIsAiActive(false);
    setCurrentMood("senang");
    setJournalEntries([]);
    setCompletedModules(["mod-1"]);
    setTrustedContacts(defaultContacts);
    setGrowthTasks(defaultGrowthTasks);
    setReferralTickets([]);
    try {
      sessionStorage.clear();
    } catch {}
  };

  return (
    <AppContext.Provider
      value={{
        userName,
        setUserName: handleSetName,
        hasConsented,
        setHasConsented: handleSetHasConsented,
        isAiActive,
        setIsAiActive: handleSetAiActive,
        currentMood,
        setCurrentMood: handleSetMood,
        journalEntries,
        addJournalEntry,
        deleteJournalEntry,
        clearAllJournals,
        completedModules,
        toggleModuleComplete,
        trustedContacts,
        addTrustedContact,
        growthTasks,
        toggleGrowthTask,
        referralTickets,
        addReferralTicket,
        resetAllSessionData,
      }}
    >
      {children}
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
