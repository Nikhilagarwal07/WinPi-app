// File: backend/quizQuestions.js

export const questions = [
  {
    questionText: "What is the primary goal of the Pi Network?",
    answers: [
      { answerText: "To create a new cryptocurrency for everyday people", isCorrect: true },
      { answerText: "To compete with Bitcoin", isCorrect: false },
      { answerText: "To be a social media platform", isCorrect: false },
      { answerText: "To sell computer hardware", isCorrect: false },
    ],
    reward: 20,
  },
  {
    questionText: "How do users 'mine' Pi on their mobile phones?",
    answers: [
      { answerText: "By solving complex math problems", isCorrect: false },
      { answerText: "By contributing to the network's security with daily check-ins", isCorrect: true },
      { answerText: "By watching advertisements", isCorrect: false },
      { answerText: "By playing other games", isCorrect: false },
    ],
    reward: 20,
  },
  {
    questionText: "What is the term for a user who invited you to the Pi Network?",
    answers: [
      { answerText: "Ambassador", isCorrect: false },
      { answerText: "Contributor", isCorrect: false },
      { answerText: "Your Referrer or Inviter", isCorrect: true },
      { answerText: "Node Operator", isCorrect: false },
    ],
    reward: 20,
  },
  {
    questionText: "True or False: Pi Network is currently in its 'Enclosed Mainnet' phase.",
    answers: [
      { answerText: "True", isCorrect: true },
      { answerText: "False", isCorrect: false },
    ],
    reward: 20,
  },
  {
    questionText: "Which of these is NOT a core value of the Pi Network?",
    answers: [
      { answerText: "Decentralization", isCorrect: false },
      { answerText: "Accessibility", isCorrect: false },
      { answerText: "User-centric design", isCorrect: false },
      { answerText: "Centralized control for maximum profit", isCorrect: true },
    ],
    reward: 20,
  },
];