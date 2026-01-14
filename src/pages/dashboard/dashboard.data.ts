import type { AtRiskRow, Performer, LeaderboardRow } from "./dashboard.types";

export const DASHBOARD_DEFAULT_CLASS = "All students";

export const CLASSES = ["All students", "Grade 5 - A", "Grade 5 - B", "Grade 6 - A"] as const;

export const comprehensionTrend = [
  { week: "Week 1", score: 62 },
  { week: "Week 2", score: 64 },
  { week: "Week 3", score: 66 },
  { week: "Week 4", score: 68 },
  { week: "Week 5", score: 71 },
  { week: "Week 6", score: 78 },
];

export const vocabularyBars = [
  { name: "A. Smith", words: 90 },
  { name: "L. Davis", words: 70 },
  { name: "S. John", words: 120 },
  { name: "S. Wilson", words: 85 },
];

export const genreDistribution = [
  { genre: "Fantasy", value: 30 },
  { genre: "Sci-Fi", value: 20 },
  { genre: "Mystery", value: 18 },
  { genre: "Biography", value: 16 },
  { genre: "Historical", value: 16 },
];

export const consistencyTrend = [
  { name: "A. Smith", days: 2 },
  { name: "L. Davis", days: 4 },
  { name: "S. John", days: 3 },
  { name: "S. Wilson", days: 2 },
  { name: "S. White", days: 5 },
  { name: "K. Brown", days: 6 },
];

export const classGrowthTrend = [
  { month: "Jan", avg: 58 },
  { month: "Feb", avg: 60 },
  { month: "Mar", avg: 62 },
  { month: "Apr", avg: 64 },
  { month: "May", avg: 67 },
  { month: "Jun", avg: 70 },
  { month: "Jul", avg: 72 },
  { month: "Aug", avg: 74 },
  { month: "Sep", avg: 76 },
  { month: "Oct", avg: 78 },
  { month: "Nov", avg: 80 },
  { month: "Dec", avg: 82 },
];

export const atRiskRows: AtRiskRow[] = [
  { id: "1", student: "Emily Chen", riskFactor: "Low comprehension", flag: "High" },
  { id: "2", student: "David Lee", riskFactor: "Inconsistent reading", flag: "Medium" },
  { id: "3", student: "Sarah Khan", riskFactor: "Vocabulary gap", flag: "Low" },
  { id: "4", student: "Michael Bell", riskFactor: "Lack of engagement", flag: "High" },
  { id: "5", student: "Jessica Wong", riskFactor: "Low scores", flag: "Medium" },
];

export const topPerformers: Performer[] = [
  { name: "Oliver Green", subtitle: "Higher Growth", badge: "🏆" },
  { name: "Sophia White", subtitle: "Most Books Read", badge: "📚" },
  { name: "Liam Black", subtitle: "Star Comprehension", badge: "⭐" },
];

export const leaderboardRows: LeaderboardRow[] = [
  { rank: 1, student: "Ayesha Khan", score: 8 },
  { rank: 2, student: "Omer Malik", score: 8 },
  { rank: 3, student: "Sara Ahmed", score: 8 },
  { rank: 4, student: "Fatimah Noor", score: 8 },
  { rank: 5, student: "Fatimah Noor (2)", score: 8 },
];
