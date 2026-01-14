export type ChallengeStatus = "active" | "upcoming" | "completed";

export type Challenge = {
  id: string;
  title: string;
  participantsCount: number;
  dueDate: string; // YYYY-MM-DD
  progressPct: number; // 0..100
  status: ChallengeStatus;
  description: string;
};

export type Achievement = {
  id: string;
  studentName: string;
  text: string;
  dateLabel: string; // e.g. "May 22, 2024"
  avatarUrl?: string;
};

export type LeaderboardEntry = {
  rank: number;
  studentName: string;
  booksRead: number;
  pagesRead: number;
  wordsRead: number;
  timeSpentHrs: number;
  newWordsLearned: number;
  avgScorePoints: number;
};

export type LeaderboardDataset = {
  key: string; // used in dropdown
  label: string;
  top3: Array<{
    studentName: string;
    rankLabel: string; // Rank 1
    booksReadLabel: string; // "15 Books Read"
    isWinner?: boolean;
  }>;
  rows: LeaderboardEntry[];
};
