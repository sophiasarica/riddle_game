import { Riddle } from '../types';

export const riddles: Riddle[] = [
  {
    id: 1,
    question: "I have a head and a tail, but no body. What am I?",
    answer: "coin",
    hint: "You use this to buy things at the store",
    category: "objects",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "What has hands but can't clap?",
    answer: "clock",
    hint: "It tells you what time it is",
    category: "objects",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "I'm tall when I'm young and short when I'm old. What am I?",
    answer: "candle",
    hint: "It gives light and melts when you light it",
    category: "objects",
    difficulty: "easy"
  },
  {
    id: 4,
    question: "What has a face and two hands but no arms or legs?",
    answer: "clock",
    hint: "You look at this to know what time it is",
    category: "objects",
    difficulty: "easy"
  },
  {
    id: 5,
    question: "I'm full of holes but still hold water. What am I?",
    answer: "sponge",
    hint: "You use this to clean dishes",
    category: "objects",
    difficulty: "easy"
  },
  {
    id: 6,
    question: "What has a neck but no head?",
    answer: "bottle",
    hint: "You drink from this container",
    category: "objects",
    difficulty: "easy"
  },
  {
    id: 7,
    question: "I'm orange and I'm a fruit. Monkeys love me! What am I?",
    answer: "banana",
    hint: "It's yellow when ripe and grows in bunches",
    category: "food",
    difficulty: "easy"
  },
  {
    id: 8,
    question: "What has four legs but can't walk?",
    answer: "table",
    hint: "You put things on top of this furniture",
    category: "objects",
    difficulty: "easy"
  },
  {
    id: 9,
    question: "I'm red and round and you can eat me. What am I?",
    answer: "apple",
    hint: "It's a fruit that keeps the doctor away",
    category: "food",
    difficulty: "easy"
  },
  {
    id: 10,
    question: "What has keys but no locks, space but no room, and you can enter but not go inside?",
    answer: "keyboard",
    hint: "You use this to type on a computer",
    category: "objects",
    difficulty: "medium"
  },
  {
    id: 11,
    question: "I'm a bird but I can't fly. I'm black and white. What am I?",
    answer: "penguin",
    hint: "I live in cold places and waddle when I walk",
    category: "animals",
    difficulty: "easy"
  },
  {
    id: 12,
    question: "What has a heart that doesn't beat?",
    answer: "artichoke",
    hint: "It's a green vegetable with many leaves",
    category: "food",
    difficulty: "medium"
  },
  {
    id: 13,
    question: "I'm green and I hop. I eat carrots. What am I?",
    answer: "rabbit",
    hint: "I have long ears and a fluffy tail",
    category: "animals",
    difficulty: "easy"
  },
  {
    id: 14,
    question: "What has a bark but no bite?",
    answer: "tree",
    hint: "It's tall and has leaves and branches",
    category: "nature",
    difficulty: "easy"
  },
  {
    id: 15,
    question: "I'm round and I bounce. You play with me. What am I?",
    answer: "ball",
    hint: "You can throw, catch, or kick me",
    category: "objects",
    difficulty: "easy"
  },
  {
    id: 16,
    question: "What has a thumb and four fingers but is not alive?",
    answer: "glove",
    hint: "You wear this on your hand when it's cold",
    category: "objects",
    difficulty: "easy"
  },
  {
    id: 17,
    question: "I'm yellow and I give light. I'm in the sky during the day. What am I?",
    answer: "sun",
    hint: "It's a big bright star that makes day and night",
    category: "nature",
    difficulty: "easy"
  },
  {
    id: 18,
    question: "What has a spine but no bones?",
    answer: "book",
    hint: "You read this to learn new things",
    category: "school",
    difficulty: "easy"
  },
  {
    id: 19,
    question: "I'm white and I fall from the sky in winter. What am I?",
    answer: "snow",
    hint: "It's cold and you can make snowballs with it",
    category: "nature",
    difficulty: "easy"
  },
  {
    id: 20,
    question: "What has a head, a tail, is brown, and has no legs?",
    answer: "penny",
    hint: "It's a small coin worth one cent",
    category: "objects",
    difficulty: "easy"
  }
];

export const getRandomRiddles = (count: number = 10): Riddle[] => {
  const shuffled = [...riddles].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getRiddlesByCategory = (category: Riddle['category']): Riddle[] => {
  return riddles.filter(riddle => riddle.category === category);
};

export const getRiddlesByDifficulty = (difficulty: Riddle['difficulty']): Riddle[] => {
  return riddles.filter(riddle => riddle.difficulty === difficulty);
};
