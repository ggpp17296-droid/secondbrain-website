import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface VaultProject {
  id: string;
  name: string;
  status: string;
  startDate?: string;
  progress?: number;
  tags?: string[];
  description?: string;
  content?: string;
  tasks?: Array<{
    title: string;
    completed: boolean;
  }>;
  tasksCompleted: number;
  totalTasks: number;
}

export interface VaultCard {
  id: string;
  type: string;
  title: string;
  tags?: string[];
  createdAt?: string;
  relatedCards?: string[];
  content?: string;
  summary?: string;
}

export interface VaultData {
  profile: {
    name: string;
    location?: string;
    startDate?: string;
    bio?: string;
    content?: string;
  };
  dailyLogs: Array<{
    date: string;
    title: string;
    tags?: string[];
    highlights?: string[];
    content?: string;
    tasksCompleted?: number;
    cardsCreated?: number;
  }>;
  projects: VaultProject[];
  cards: VaultCard[];
}

export interface LearningStats {
  daysSinceStart: number;
  currentDay: number;
  currentWeek: number;
  tasksCompleted: number;
  totalTasks: number;
  projectsCount: number;
  cardsCount: number;
  totalLearningHours: number;
  notesCount: number;
}

function readProjectData<T>(fileName: string): T {
  const filePath = join(process.cwd(), "..", "data", fileName);
  return JSON.parse(readFileSync(filePath, "utf8")) as T;
}

export function getVaultData() {
  return readProjectData<VaultData>("vault-data.json");
}

export function getLearningStats() {
  return readProjectData<LearningStats>("learning-stats.json");
}
