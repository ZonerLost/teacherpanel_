import type { Achievement, Challenge, LeaderboardDataset } from "./challenges.types";

export const initialChallenges: Challenge[] = [
  {
    id: "ch1",
    title: "Spring Reading Spree",
    participantsCount: 25,
    dueDate: "2024-05-31",
    progressPct: 75,
    status: "active",
    description: "Encourage daily reading with streaks and weekly milestones.",
  },
  {
    id: "ch2",
    title: "Summer Story Quest",
    participantsCount: 18,
    dueDate: "2024-08-15",
    progressPct: 0,
    status: "upcoming",
    description: "Students explore genres and complete short reflections.",
  },
  {
    id: "ch3",
    title: "Fantasy Book Marathon",
    participantsCount: 22,
    dueDate: "2024-06-30",
    progressPct: 40,
    status: "active",
    description: "A month-long fantasy reading challenge with rewards.",
  },
  {
    id: "ch4",
    title: "Mystery Novel Challenge",
    participantsCount: 15,
    dueDate: "2024-07-20",
    progressPct: 0,
    status: "upcoming",
    description: "Mystery reading + simple quiz checkpoints.",
  },
  {
    id: "ch5",
    title: "Sci-Fi Saga",
    participantsCount: 30,
    dueDate: "2024-05-25",
    progressPct: 88,
    status: "active",
    description: "Track progress weekly and celebrate top readers.",
  },
  {
    id: "ch6",
    title: "Historical Tales",
    participantsCount: 20,
    dueDate: "2024-04-10",
    progressPct: 100,
    status: "completed",
    description: "Completed challenge based on historical reading content.",
  },
];

export const leaderboardDatasets: LeaderboardDataset[] = [
  {
    key: "spring",
    label: "Spring Reading Spree",
    top3: [
      { studentName: "Alice Johnson", rankLabel: "Rank 1", booksReadLabel: "15 Books Read", isWinner: true },
      { studentName: "Bob Smith", rankLabel: "Rank 2", booksReadLabel: "12 Books Read" },
      { studentName: "Charlie Brown", rankLabel: "Rank 3", booksReadLabel: "10 Books Read" },
    ],
    rows: [
      { rank: 1, studentName: "Alice Johnson", booksRead: 15, pagesRead: 1500, wordsRead: 300660, timeSpentHrs: 24, newWordsLearned: 22345, avgScorePoints: 150 },
      { rank: 2, studentName: "Bob Smith", booksRead: 12, pagesRead: 1265, wordsRead: 220455, timeSpentHrs: 22, newWordsLearned: 22045, avgScorePoints: 120 },
      { rank: 3, studentName: "Charlie Brown", booksRead: 10, pagesRead: 1098, wordsRead: 110298, timeSpentHrs: 11, newWordsLearned: 11029, avgScorePoints: 100 },
      { rank: 4, studentName: "Diana Ross", booksRead: 9, pagesRead: 945, wordsRead: 8920, timeSpentHrs: 9, newWordsLearned: 8920, avgScorePoints: 90 },
      { rank: 5, studentName: "Ethan Hunt", booksRead: 8, pagesRead: 824, wordsRead: 8245, timeSpentHrs: 8, newWordsLearned: 8245, avgScorePoints: 80 },
      { rank: 6, studentName: "Fiona Apple", booksRead: 7, pagesRead: 765, wordsRead: 7657, timeSpentHrs: 7, newWordsLearned: 7657, avgScorePoints: 70 },
      { rank: 7, studentName: "George Washington", booksRead: 6, pagesRead: 610, wordsRead: 6110, timeSpentHrs: 6, newWordsLearned: 6110, avgScorePoints: 60 },
    ],
  },
  {
    key: "sciFi",
    label: "Sci-Fi Saga",
    top3: [
      { studentName: "Oliver Green", rankLabel: "Rank 1", booksReadLabel: "14 Books Read", isWinner: true },
      { studentName: "Sophia White", rankLabel: "Rank 2", booksReadLabel: "11 Books Read" },
      { studentName: "Liam Black", rankLabel: "Rank 3", booksReadLabel: "9 Books Read" },
    ],
    rows: [
      { rank: 1, studentName: "Oliver Green", booksRead: 14, pagesRead: 1410, wordsRead: 280100, timeSpentHrs: 23, newWordsLearned: 21010, avgScorePoints: 145 },
      { rank: 2, studentName: "Sophia White", booksRead: 11, pagesRead: 1215, wordsRead: 210010, timeSpentHrs: 18, newWordsLearned: 19000, avgScorePoints: 118 },
      { rank: 3, studentName: "Liam Black", booksRead: 9, pagesRead: 980, wordsRead: 150000, timeSpentHrs: 12, newWordsLearned: 12000, avgScorePoints: 96 },
    ],
  },
];

export const initialAchievements: Achievement[] = [
  { id: "a1", studentName: "Alice Johnson", text: "Completed Sci-Fi Saga Challenge!", dateLabel: "May 22, 2024" },
  { id: "a2", studentName: "Charlie Brown", text: "Read 10 books in a month!", dateLabel: "May 18, 2024" },
  { id: "a3", studentName: "Diana Ross", text: "Top reader for Spring Reading Spree!", dateLabel: "May 15, 2024" },
];
