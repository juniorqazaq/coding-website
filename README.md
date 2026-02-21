<div align="center">

# 🚀 Tamasha

### Gamified Programming Education Platform

*Learn to code. Level up. Conquer challenges. Become an Architect.*

<br />

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5-orange?style=flat-square)](https://zustand-demo.pmnd.rs/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-black?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

</div>

---

**Tamasha** is an interactive, gamified coding education platform where learners earn XP, level up, maintain streaks, and compete on leaderboards — all while mastering real programming skills through structured lessons and a hands-on coding arena.

> Built with a modern React 18 + TypeScript stack. Fully responsive. Dark/Light theme. No backend required (mock-ready architecture for fast iteration).

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🖥️ Screenshots](#️-screenshots)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🎮 Gamification System](#-gamification-system)
- [🛣️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🎓 Learning
| Feature | Description |
|---|---|
| 📖 Interactive Lessons | Markdown-rendered lessons with syntax-highlighted code blocks |
| 🧩 Coding Arena | Solve problems organized by topic and difficulty |
| 📚 Course Catalog | Browse and enroll in multi-track programming courses |
| 🗺️ Learning Map | Visual roadmap showing your progress through the curriculum |

### 🏆 Gamification
| Feature | Description |
|---|---|
| ⚡ XP System | Earn XP for completing lessons, daily quests, and solving problems |
| 📈 Level Progression | 6 levels from **Новичок** to **Архитектор** |
| 🔥 Daily Streaks | Maintain your streak to stay consistent |
| 🏅 Achievements | Unlock badges for hitting milestones |
| 🥇 Leaderboard | Compete weekly with other learners |
| 🎉 Level-Up Animations | Confetti + modal celebration on level-up |

### 🛠️ Productivity
| Feature | Description |
|---|---|
| ⏱️ Pomodoro Timer | Built-in 25/5 focus timer with XP reward on completion |
| 📝 Study Workspace | Distraction-free focus mode with notes + AI tutor chat |
| ⌨️ Command Palette | `Ctrl+K` / `Cmd+K` quick navigation across the entire app |
| 🤖 AI Assistant | Contextual learning widget powered by a configurable assistant |
| 🌗 Dark / Light Theme | Smooth system-aware theme toggle |
| 📱 Fully Responsive | Optimized for mobile, tablet, and desktop |

---

## 🖥️ Screenshots

> 📸 **Screenshots coming soon** — run locally with `npm run dev` to see the full experience.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 18.x`
- **npm** `>= 9.x`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/juniorqazaq/coding-website.git
cd coding-website

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
# Output is in the /dist directory
npm run preview  # Preview the production build locally
```

---

## 📁 Project Structure

<details>
<summary><strong>Click to expand</strong></summary>

```
tamasha/
├── components/               # Reusable UI components
│   ├── skeletons/            # Skeleton loading placeholders
│   ├── AchievementToast.tsx  # Achievement unlock notification
│   ├── CommandPalette.tsx    # Ctrl+K quick search/navigation
│   ├── DailyQuests.tsx       # Daily quest panel
│   ├── ErrorBoundary.tsx     # Global error boundary
│   ├── Layout.tsx            # Authenticated app shell (sidebar)
│   ├── Leaderboard.tsx       # Weekly rankings widget
│   ├── LessonPlayer.tsx      # Markdown lesson renderer
│   ├── LevelUpModal.tsx      # Level-up celebration modal
│   ├── PageLoader.tsx        # Lazy route fallback spinner
│   ├── ProtectedRoute.tsx    # Auth guard wrapper
│   ├── StreakCalendar.tsx    # Monthly streak heatmap
│   └── XPPopup.tsx           # XP gain floating toast
│
├── pages/                    # Route-level page components
│   ├── Dashboard.tsx         # Main user dashboard
│   ├── Courses.tsx           # Course catalog
│   ├── CodingArena.tsx       # Topic/difficulty selector
│   ├── CodingGame.tsx        # Problem-solving interface
│   ├── ProblemList.tsx       # Filterable problem list
│   ├── Profile.tsx           # User profile & stats
│   ├── StudyWorkspace.tsx    # Focus room (timer + notes + AI)
│   ├── Onboarding.tsx        # New user onboarding flow
│   ├── Login.tsx / Register.tsx
│   └── ...
│
├── stores/                   # Zustand global state
│   ├── useUserStore.ts       # XP, level, streak, study minutes
│   ├── useAuthStore.ts       # Authentication state
│   ├── useProgressStore.ts   # Lesson completion tracking
│   ├── useAchievementStore.ts
│   └── useLeaderboardStore.ts
│
├── services/                 # Mock API layer (swap for real API)
│   ├── auth.ts
│   ├── courses.ts
│   ├── progress.ts
│   └── problems.ts
│
├── data/                     # Static course and coding data
│   ├── python-course-data.ts
│   └── coding-data.ts
│
├── utils/                    # Shared utility functions
│   └── index.ts              # formatTime, delay, etc.
│
├── types.ts                  # Global TypeScript interfaces
└── App.tsx                   # Router + lazy-loaded routes
```

</details>

---

## 🎮 Gamification System

Learners progress through 6 levels as they accumulate XP. Each completed lesson, quest, and focus session rewards XP.

| Level | 🏅 Title | ⚡ XP Required |
|:---:|---|:---:|
| 1 | 🌱 Новичок | 0 XP |
| 2 | 🔧 Разработчик | 500 XP |
| 3 | 💡 Инженер | 1 500 XP |
| 4 | 🚀 Сеньор | 3 500 XP |
| 5 | 🏗️ Лид | 7 000 XP |
| 6 | 🏛️ Архитектор | 15 000 XP |

**XP sources:**
- ✅ Completing a lesson → `+50 XP`
- 🗓️ Daily quest → `+25–100 XP`
- ⏱️ Pomodoro session (25 min) → `+10 XP`
- 💻 Solving a coding problem → `+20–75 XP`
- 🔥 Streak bonus → `+5 XP/day`

---

## 🛣️ Roadmap

- [ ] 🗄️ **Backend integration** — Supabase (auth, database, real-time)
- [ ] ⚙️ **Real code execution** — Judge0 API sandbox
- [ ] 🤖 **AI Assistant** — Claude / OpenAI streaming responses
- [ ] 📱 **Mobile app** — React Native port
- [ ] ⚔️ **Multiplayer duels** — real-time coding battles
- [ ] 🌐 **Internationalization** — multi-language support (KZ, EN, RU)
- [ ] 📊 **Analytics dashboard** — detailed learning statistics

---

## 🤝 Contributing

Contributions are welcome and appreciated!

```bash
# Fork → Clone → Branch → PR
git checkout -b feature/my-feature
git commit -m "feat: add my feature"
git push origin feature/my-feature
# Open a Pull Request on GitHub
```

Please follow conventional commits and ensure `npm run build` passes before opening a PR.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

Made with ❤️ by **Tamasha Team**

⭐ Star this repo if you find it useful!

</div>
