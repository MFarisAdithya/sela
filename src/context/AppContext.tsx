"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type MoodType = "sangat-sedih" | "sedih" | "biasa" | "senang" | "bersemangat";

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
  setUserName: (name: string) => void;
  userAgeRange: string;
  setUserAgeRange: (age: string) => void;
  hasConsented: boolean;
  setHasConsented: (val: boolean) => void;
  allowAiTransmission: boolean;
  setAllowAiTransmission: (val: boolean) => void;
  currentMood: MoodType | null;
  setCurrentMood: (mood: MoodType | null) => void;
  completedModules: string[];
  toggleModuleCompleted: (moduleId: string) => void;
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, "id" | "date">) => void;
  deleteJournalEntry: (id: string) => void;
  clearAllJournal: () => void;
  supportContacts: SupportContact[];
  addSupportContact: (contact: Omit<SupportContact, "id">) => void;
  deleteSupportContact: (id: string) => void;
  growthTasks: GrowthTask[];
  toggleGrowthTask: (taskId: string) => void;
  referralTickets: ReferralTicket[];
  createReferralTicket: (ticket: Omit<ReferralTicket, "id" | "date" | "status">) => void;
  isAiConfigured: boolean;
  checkAiConfiguration: () => Promise<boolean>;
  resetAllSessionData: () => void;
}

const defaultTasks: GrowthTask[] = [
  { id: "task-1", title: "Menulis satu hal yang disyukuri di catatan pribadi", category: "Refleksi", completed: true },
  { id: "task-2", title: "Menyapa satu sahabat atau teman terdekat", category: "Dukungan sosial", completed: true },
  { id: "task-3", title: "Membaca modul Komunikasi Asertif selama 3 menit", category: "Life skills", completed: false },
  { id: "task-4", title: "Mencoba latihan pernapasan saat merasa lelah", category: "Regulasi diri", completed: false },
];

const defaultContacts: SupportContact[] = [
  { id: "c-1", name: "Rian (Sahabat)", role: "Teman dekat sekolah", category: "sahabat" },
  { id: "c-2", name: "Ibu Rahma", role: "Guru BK Sekolah", category: "sekolah" },
  { id: "c-3", name: "Kak Dimas", role: "Konselor Sebaya PIK-R", category: "profesional" },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState("Alex");
  const [userAgeRange, setUserAgeRange] = useState("16-18 tahun");
  const [hasConsented, setHasConsented] = useState(false);
  const [allowAiTransmission, setAllowAiTransmission] = useState(true);
  const [currentMood, setCurrentMood] = useState<MoodType | null>("biasa");
  const [completedModules, setCompletedModules] = useState<string[]>(["mod-1"]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [supportContacts, setSupportContacts] = useState<SupportContact[]>(defaultContacts);
  const [growthTasks, setGrowthTasks] = useState<GrowthTask[]>(defaultTasks);
  const [referralTickets, setReferralTickets] = useState<ReferralTicket[]>([]);
  const [isAiConfigured, setIsAiConfigured] = useState(false);

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

  const resetAllSessionData = () => {
    setUserName("Alex");
    setHasConsented(false);
    setCurrentMood(null);
    setCompletedModules([]);
    setJournalEntries([]);
    setSupportContacts(defaultContacts);
    setGrowthTasks(defaultTasks.map((t) => ({ ...t, completed: false })));
    setReferralTickets([]);
  };

  return (
    <AppContext.Provider
      value={{
        userName,
        setUserName,
        userAgeRange,
        setUserAgeRange,
        hasConsented,
        setHasConsented,
        allowAiTransmission,
        setAllowAiTransmission,
        currentMood,
        setCurrentMood,
        completedModules,
        toggleModuleCompleted,
        journalEntries,
        addJournalEntry,
        deleteJournalEntry,
        clearAllJournal,
        supportContacts,
        addSupportContact,
        deleteSupportContact,
        growthTasks,
        toggleGrowthTask,
        referralTickets,
        createReferralTicket,
        isAiConfigured,
        checkAiConfiguration,
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
