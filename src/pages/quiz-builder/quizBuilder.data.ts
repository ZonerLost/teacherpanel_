import type { GeneratedQuestion } from "./quizBuilder.types";

export const SUBJECTS = ["Biology", "Chemistry", "Physics", "Mathematics", "English"] as const;
export const GRADE_LEVELS = ["Grade 5", "Grade 6", "Grade 7", "Grade 8"] as const;
export const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

export const defaultPrompt =
  "Generate 5 multiple-choice questions about the process of photosynthesis, including inputs, outputs, and key organelles involved.";

export function mockGenerateQuestions(count: number): GeneratedQuestion[] {
  const base: GeneratedQuestion[] = [
    {
      id: crypto.randomUUID(),
      question: "Which organelle is primarily responsible for photosynthesis?",
      choices: [
        { id: crypto.randomUUID(), text: "Mitochondria" },
        { id: crypto.randomUUID(), text: "Chloroplast" },
        { id: crypto.randomUUID(), text: "Ribosome" },
        { id: crypto.randomUUID(), text: "Nucleus" },
      ],
      correctChoiceId: "",
      explanation: "Photosynthesis occurs in chloroplasts where chlorophyll captures light energy.",
    },
    {
      id: crypto.randomUUID(),
      question: "What is the main gas taken in during photosynthesis?",
      choices: [
        { id: crypto.randomUUID(), text: "Oxygen (O₂)" },
        { id: crypto.randomUUID(), text: "Carbon dioxide (CO₂)" },
        { id: crypto.randomUUID(), text: "Nitrogen (N₂)" },
        { id: crypto.randomUUID(), text: "Hydrogen (H₂)" },
      ],
      correctChoiceId: "",
      explanation: "Plants take in CO₂ which is used to form glucose.",
    },
    {
      id: crypto.randomUUID(),
      question: "Which product is made during photosynthesis?",
      choices: [
        { id: crypto.randomUUID(), text: "Glucose" },
        { id: crypto.randomUUID(), text: "Lactic acid" },
        { id: crypto.randomUUID(), text: "Ethanol" },
        { id: crypto.randomUUID(), text: "Urea" },
      ],
      correctChoiceId: "",
      explanation: "Glucose is produced and stored as chemical energy.",
    },
  ];

  // set correct answers
  base[0].correctChoiceId = base[0].choices[1].id;
  base[1].correctChoiceId = base[1].choices[1].id;
  base[2].correctChoiceId = base[2].choices[0].id;

  // repeat to reach count
  const out: GeneratedQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const pick = base[i % base.length];
    out.push({
      ...pick,
      id: crypto.randomUUID(),
      choices: pick.choices.map((c) => ({ ...c, id: crypto.randomUUID() })),
    });
    // adjust correctChoiceId after cloning
    const correctIdx = pick.choices.findIndex((c) => c.id === pick.correctChoiceId);
    out[out.length - 1].correctChoiceId = out[out.length - 1].choices[correctIdx]?.id ?? out[out.length - 1].choices[0].id;
  }
  return out;
}
