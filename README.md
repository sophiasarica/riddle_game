# 🧩 Riddle Quest - Fun Brain Teasers for 5th Graders

A mobile-first, browser-based riddle game designed specifically for 5th graders with accessibility features for autistic children who are especially interested in technology.

## ✨ Features

- **🎯 Age-Appropriate Content**: Riddles written at a 5th-grade reading level
- **♿ Accessibility First**: Built with autistic children in mind
- **📱 Mobile-First Design**: Optimized for phones and tablets
- **🎨 Calming Visual Design**: Soft colors and clear typography
- **🔊 Sound Effects**: Optional audio feedback (can be disabled)
- **⚙️ Customizable Settings**: High contrast, large text, reduced motion options
- **🎮 Easy Gameplay**: Simple interface with clear instructions

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd riddle_game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎮 How to Play

1. **Read the Riddle**: Each riddle is designed to be fun and challenging for 5th graders
2. **Type Your Answer**: Enter your answer in the text box
3. **Check Your Answer**: Click "Check Answer" or press Enter
4. **Get Help**: Use the hint button if you need a little help
5. **Complete All Riddles**: Finish all riddles to see your final score!

## ♿ Accessibility Features

### For Autistic Children

- **Clear Instructions**: Step-by-step guidance throughout the game
- **Visual Feedback**: Immediate, clear responses to actions
- **Consistent Layout**: Predictable interface design
- **Calming Colors**: Soft, non-overwhelming color palette
- **Reduced Motion**: Option to minimize animations
- **Sound Control**: Ability to turn off sound effects

### General Accessibility

- **High Contrast Mode**: Enhanced visibility for users with visual impairments
- **Large Text Option**: Increased font sizes for better readability
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **CSS3**: Modern styling with CSS custom properties
- **Web Audio API**: Simple sound effects

## 📱 Mobile-First Design

The game is designed with mobile devices as the primary target:

- **Responsive Layout**: Adapts to all screen sizes
- **Touch-Friendly**: Large buttons and touch targets
- **Fast Loading**: Optimized for mobile networks
- **Offline Capable**: Works without internet connection

## 🎨 Design Principles

### Color Palette
- **Primary**: Calming blue (#4A90E2)
- **Secondary**: Fresh green (#7ED321)
- **Accent**: Warm orange (#F5A623)
- **Background**: Soft gray (#F8F9FA)
- **Text**: Dark blue-gray (#2C3E50)

### Typography
- **Font**: System fonts for optimal performance
- **Sizes**: Scalable from 14px to 32px
- **Line Height**: 1.6 for comfortable reading

## 🚀 Deployment

### GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

### Other Platforms

The built files in the `dist` folder can be deployed to any static hosting service:
- Netlify
- Vercel
- AWS S3
- Firebase Hosting

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

### Project Structure

```
src/
├── components/          # React components
│   ├── AccessibilityPanel.tsx
│   ├── GameBoard.tsx
│   ├── GameComplete.tsx
│   ├── GameProgress.tsx
│   ├── RiddleCard.tsx
│   └── WelcomeScreen.tsx
├── data/               # Game data
│   └── riddles.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main app component
├── App.css             # Main styles
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🎯 Riddle Categories

- **Animals**: Fun animal-themed riddles
- **Nature**: Outdoor and natural world puzzles
- **Objects**: Everyday item brain teasers
- **Food**: Delicious food-related riddles
- **School**: Educational and classroom themes
- **Fun**: General entertainment riddles

## 🔧 Customization

### Adding New Riddles

Edit `src/data/riddles.ts` to add new riddles:

```typescript
{
  id: 21,
  question: "Your new riddle here?",
  answer: "answer",
  hint: "Optional hint",
  category: "objects",
  difficulty: "easy"
}
```

### Modifying Accessibility Settings

Update `src/types/index.ts` to add new accessibility options.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have suggestions for improvement, please open an issue on GitHub.

---

**Made with ❤️ for 5th graders and their families**
