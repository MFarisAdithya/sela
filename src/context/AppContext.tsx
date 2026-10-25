"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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

const defaultStoryCards: StoryCard[] = [
  {
    id: "sc-1",
    title: "Bicara dengan Orang Tua Soal Minat Jurusan",
    date: "25 Oktober 2026",
    facts: "Jurusan yang kuinginkan berbeda dari rencana orang tua, dan nilai semester ini menurun karena merasa terbebani.",
    feelings: "Cemas mengecewakan keluarga, lelah memendam sendiri, takut disalahkan jika terbuka.",
    needs: "Didengarkan dengan tenang tanpa langsung dihakimi, dan diberi ruang mendiskusikan opsi secara realistis.",
    openingLine: "Ayah/Ibu, ada hal penting tentang perkuliahan yang ingin aku obrolkan dengan tenang saat Ayah/Ibu ada waktu senggang.",
    targetPerson: "Orang Tua",
  },
  {
    id: "sc-2",
    title: "Konsultasi Kendala Tugas ke Dosen/Guru",
    date: "24 Oktober 2026",
    facts: "Tiga tugas besar memiliki tenggat bersamaan minggu ini, sementara kondisi fisik sedang tidak fit.",
    feelings: "Kewalahan, takut dianggap mencari alasan atau tidak bertanggung jawab.",
    needs: "Konsultasi prioritas pengerjaan tugas atau kemungkinan dispensasi perpanjangan tenggat.",
    openingLine: "Selamat pagi Bapak/Ibu, mohon izin meminta waktu sebentar untuk berkonsultasi mengenai progres dan kendala tugas saya.",
    targetPerson: "Guru / Dosen",
  },
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
  const [storyCards, setStoryCards] = useState<StoryCard[]>(defaultStoryCards);
  const [activeStoryCard, setActiveStoryCard] = useState<StoryCard | null>(defaultStoryCards[0]);
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
    setUserName("Alex");
    setHasConsented(false);
    setCurrentMood(null);
    setCompletedModules([]);
    setJournalEntries([]);
    setStoryCards(defaultStoryCards);
    setActiveStoryCard(defaultStoryCards[0]);
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
