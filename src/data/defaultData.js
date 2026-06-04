export const defaultProfile = {
  name: "Mohammad Saud",
  role: "Android App Developer",
  email: "mohammadsaudattari@gmail.com",
  formReceiver: "abskills.institute@gmail.com",
  location: "Pakistan",
  photoUrl: "/assets/profile-3d.svg",
  headline: "Building premium Android experiences with modern UI and clean architecture.",
  description: "I develop production-ready Android applications using Kotlin, XML, Jetpack Compose, Firebase, APIs, Room, MVVM, clean architecture, and modern Material design. My focus is smooth user experience, scalable code, and polished app interfaces that feel premium.",
  years: "3+",
  apps: "12+",
  clients: "8+",
  github: "#",
  linkedin: "#"
};

export const defaultSkills = [
  "Kotlin",
  "Java",
  "XML UI",
  "Jetpack Compose",
  "Material 3",
  "MVVM",
  "Firebase",
  "REST API",
  "Retrofit",
  "Room Database",
  "Coroutines",
  "Dependency Injection",
  "AdMob",
  "Play Console",
  "In-App Purchases",
  "Git & GitHub"
];

export const defaultProjects = [
  {
    id: "calcbook",
    title: "CalcBook",
    category: "Productivity / Calculator",
    shortDescription: "A smart calculator notebook app for formulas, notes, calculation history, and daily work productivity.",
    description: "CalcBook is a clean and modern calculator notebook app designed for daily calculation workflows. It combines quick math, note taking, formula history, theme support, and a focused writing experience in one smooth Android interface.",
    appLink: "https://example.com/calcbook",
    headerImage: "/assets/projects/calcbook-header.svg",
    screenshots: [
      "/assets/screens/calcbook-1.svg",
      "/assets/screens/calcbook-2.svg",
      "/assets/screens/calcbook-3.svg"
    ],
    technologies: ["Kotlin", "XML", "Room", "MVVM", "Material Design"],
    featured: true
  },
  {
    id: "weight-loss-planner",
    title: "Weight Loss Planner",
    category: "Health & Fitness",
    shortDescription: "A health planning app for weight goals, routine tracking, progress charts, and lifestyle planning.",
    description: "Weight Loss Planner helps users manage weight goals with a simple routine tracker, progress visuals, planning tools, and motivation-friendly UI. The app is built to make health tracking easy and visually clear.",
    appLink: "https://example.com/weight-loss-planner",
    headerImage: "/assets/projects/weight-loss-planner-header.svg",
    screenshots: [
      "/assets/screens/weight-loss-planner-1.svg",
      "/assets/screens/weight-loss-planner-2.svg",
      "/assets/screens/weight-loss-planner-3.svg"
    ],
    technologies: ["Kotlin", "XML", "Firebase", "Charts", "Material UI"],
    featured: true
  },
  {
    id: "spell-pronounce-advanced-english-dictionary",
    title: "Spell & Pronounce Advanced English Dictionary",
    category: "Education / Dictionary",
    shortDescription: "An advanced learning app with dictionary, pronunciation, spelling support, and vocabulary tools.",
    description: "This app helps users improve English with spell checking, pronunciation, meanings, and practical learning support. It combines dictionary features with audio guidance and study-oriented tools for better language learning.",
    appLink: "https://example.com/dictionary",
    headerImage: "/assets/projects/dictionary-header.svg",
    screenshots: [
      "/assets/screens/dictionary-1.svg",
      "/assets/screens/dictionary-2.svg",
      "/assets/screens/dictionary-3.svg"
    ],
    technologies: ["Kotlin", "XML", "Text To Speech", "API", "SQLite"],
    featured: true
  }
];

export const demoAdmin = {
  email: "admin@portfolio.com",
  password: "admin123"
};
