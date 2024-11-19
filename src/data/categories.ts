export const categories = [
  {
    id: "science",
    name: "Science",
    questions: [
      {
        id: "science-1",
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correctAnswer: 0,
        points: 100,
        isCompleted: false
      },
      {
        id: "science-2",
        question: "Which planet has the most moons?",
        options: ["Mars", "Jupiter", "Saturn", "Uranus"],
        correctAnswer: 1,
        points: 200,
        isCompleted: false
      },
      {
        id: "science-3",
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Platinum"],
        correctAnswer: 2,
        points: 300,
        isCompleted: false
      },
      {
        id: "science-4",
        question: "What is the speed of light in miles per second?",
        options: ["186,282", "150,000", "200,000", "175,000"],
        correctAnswer: 0,
        points: 400,
        isCompleted: false
      },
      {
        id: "science-5",
        question: "What is the smallest unit of matter?",
        options: ["Atom", "Quark", "Electron", "Molecule"],
        correctAnswer: 1,
        points: 500,
        isCompleted: false
      },
      {
        id: "science-6",
        question: "What is the name of the theoretical force carrier particle of gravity?",
        options: ["Graviton", "Higgs Boson", "Neutrino", "Tachyon"],
        correctAnswer: 0,
        points: 1000,
        isCompleted: false
      }
    ]
  },
  {
    id: "history",
    name: "History",
    questions: [
      {
        id: "history-1",
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: 2,
        points: 100,
        isCompleted: false
      },
      {
        id: "history-2",
        question: "Who was the first President of the United States?",
        options: ["John Adams", "Thomas Jefferson", "Benjamin Franklin", "George Washington"],
        correctAnswer: 3,
        points: 200,
        isCompleted: false
      },
      {
        id: "history-3",
        question: "Which empire was ruled by the Aztecs?",
        options: ["Incan", "Mayan", "Mexican", "Mesopotamian"],
        correctAnswer: 2,
        points: 300,
        isCompleted: false
      },
      {
        id: "history-4",
        question: "Who wrote 'The Art of War'?",
        options: ["Sun Tzu", "Confucius", "Lao Tzu", "Buddha"],
        correctAnswer: 0,
        points: 400,
        isCompleted: false
      },
      {
        id: "history-5",
        question: "Which civilization built the pyramids of Giza?",
        options: ["Romans", "Greeks", "Persians", "Egyptians"],
        correctAnswer: 3,
        points: 500,
        isCompleted: false
      },
      {
        id: "history-6",
        question: "Who deciphered Egyptian hieroglyphs using the Rosetta Stone?",
        options: ["Howard Carter", "Jean-François Champollion", "Heinrich Schliemann", "Arthur Evans"],
        correctAnswer: 1,
        points: 1000,
        isCompleted: false
      }
    ]
  },
  {
    id: "geography",
    name: "Geography",
    questions: Array(6).fill(null).map((_, i) => ({
      id: `geography-${i + 1}`,
      question: `Geography Question ${i + 1}`,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 0,
      points: i === 5 ? 1000 : (i + 1) * 100,
      isCompleted: false
    }))
  },
  {
    id: "sports",
    name: "Sports",
    questions: Array(6).fill(null).map((_, i) => ({
      id: `sports-${i + 1}`,
      question: `Sports Question ${i + 1}`,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 0,
      points: i === 5 ? 1000 : (i + 1) * 100,
      isCompleted: false
    }))
  },
  {
    id: "entertainment",
    name: "Entertainment",
    questions: Array(6).fill(null).map((_, i) => ({
      id: `entertainment-${i + 1}`,
      question: `Entertainment Question ${i + 1}`,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 0,
      points: i === 5 ? 1000 : (i + 1) * 100,
      isCompleted: false
    }))
  },
  {
    id: "literature",
    name: "Literature",
    questions: Array(6).fill(null).map((_, i) => ({
      id: `literature-${i + 1}`,
      question: `Literature Question ${i + 1}`,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 0,
      points: i === 5 ? 1000 : (i + 1) * 100,
      isCompleted: false
    }))
  }
];