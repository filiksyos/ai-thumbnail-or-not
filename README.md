# AI Thumbnail or Not - YouTube Thumbnail Guessing Game

Test your ability to spot AI-generated YouTube thumbnails! This interactive game challenges you to distinguish between real YouTube thumbnails and AI-generated ones.

## 🎮 How to Play

1. Enter your username on the home page
2. Click "Start game" to begin
3. You'll see two thumbnails side by side
4. Click the thumbnail you think is **AI-generated**
5. If you're correct, you'll see the real YouTube video embed and can watch it!
6. If you're wrong, game over - but you can try again!
7. Build up your score and compete for the highest record

## ✨ Features

- **Split-screen thumbnail comparison** - Two thumbnails displayed side by side
- **YouTube video embed** - Click the correct thumbnail to reveal and play the real video
- **Score tracking** - Personal and global records stored locally
- **Responsive design** - Works on desktop and mobile devices
- **Clean UI** - Modern design with smooth animations and feedback

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to play the game.

## 🛠️ Tech Stack

- **Next.js 13** - React framework with Pages Router
- **TypeScript** - Type safety
- **SCSS** - Styling with variables and responsive breakpoints
- **React Hooks** - State management
- **LocalStorage** - Score persistence

## 📝 How It Works

- One thumbnail is real (linked to a YouTube video)
- One thumbnail is AI-generated
- The game randomly positions them on left or right
- Click the AI-generated one to score a point and see the real video
- Choose wrong and the game ends!

## 🎨 Customization

You can easily customize the game by:

1. Adding your own YouTube videos and AI-generated thumbnails
2. Modifying the scoring system
3. Adjusting the styling in the SCSS files

Based on [ai-or-not-next-js](https://github.com/adrisantos11/ai-or-not-next-js) by Adrián Santos Mena
