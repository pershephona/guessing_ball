export type Locale = "ru" | "en";

export const answers: Record<Locale, string[]> = {
  ru: [
    "Да",
    "Нет",
    "Возможно",
    "Двигайся в том же направлении",
    "Не могу сказать точно",
    "Скорее всего нет",
    "Скорее всего да",
    "Тебе нужно рассмотреть другие варианты",
  ],
  en: [
    "Yes",
    "No",
    "Maybe",
    "Keep going the same way",
    "Cannot predict now",
    "Most likely not",
    "Most likely yes",
    "You should consider other options",
  ],
};

export const ui = {
  ru: {
    title: "Шар предсказаний",
    subtitle: "Задай вопрос и нажми на шар",
    prompt: "Задай свой вопрос...",
    initial: "Лучше не рассказывать сейчас",
    shaking: "...",
    hint: "Нажми на шар, чтобы получить ответ",
  },
  en: {
    title: "Magic 8 Ball",
    subtitle: "Ask a question and tap the ball",
    prompt: "Ask your question...",
    initial: "Better not tell you now",
    shaking: "...",
    hint: "Tap the ball to get an answer",
  },
} satisfies Record<Locale, Record<string, string>>;
