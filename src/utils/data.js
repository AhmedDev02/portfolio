import awaImg from "@/assets/projectsImages/awa.png";
import worldWiseImg from "@/assets/projectsImages/worldwise.png";
import reactQuizImg from "@/assets/projectsImages/reactquiz.png";
import usePopcornImg from "@/assets/projectsImages/usepopcorn.png";
import eatAndSplitImg from "@/assets/projectsImages/eat-and-split.png";
import subway2DImg from "@/assets/projectsImages/2d-subway.png";
import awaNativeImg from "@/assets/projectsImages/awa-native.png";
import maptyImg from "@/assets/projectsImages/mapty.png";
import bankistWebsiteImg from "@/assets/projectsImages/bankist-website.png";
import bankistImg from "@/assets/projectsImages/bankist.png";
import guessMyNumberImg from "@/assets/projectsImages/guess-my-number.png";
import pigGameImg from "@/assets/projectsImages/pig-game.png";
import spaceGameImg from "@/assets/projectsImages/space-game.png";

export const arrayOfProjects = [
  {
    id: 1,
    title: "AWA – Real Estate Booking Platform",
    image: awaImg,
    technologyUsed: [
      "WordPress",
      "PHP",
      "Custom Plugins",
      "REST API",
      "PayPal Integration",
      "Push Notifications",
      "UI/UX",
      "Security",
    ],
    description:
      "Full real-life booking platform for reserving homes, villas, and properties. Features real-time data processing, secure payment integration, booking management, and automated notifications similar to Booking.com.",
    github: "",
    liveDemo: "",
    date: "Jul 2023 – Sep 2023",
    role: "Full-Stack WordPress Developer",
    tags: ["Booking", "Payments", "Real Estate"],
  },

  {
    id: 2,
    title: "World Wise",
    image: worldWiseImg,
    technologyUsed: [
      "React",
      "Vite",
      "React Router",
      "ESLint",
      "Custom Hooks",
      "CSS",
      "Geolocation API",
      "State Management",
      "Performance Optimization",
    ],
    description:
      "Responsive web app with dynamic routing, clean UI, real-time interactivity, and geolocation. Built with Vite for instant HMR, ESLint for code quality, and custom CSS for a modern UI.",
    github: "",
    liveDemo: "",
    date: "Jul 2024 – Aug 2024",
    role: "Front-End Developer",
    tags: ["React", "Routing", "Geolocation"],
  },

  {
    id: 3,
    title: "React Quiz",
    image: reactQuizImg,
    technologyUsed: [
      "React",
      "JavaScript",
      "Context API",
      "JSON Server",
      "CSS",
      "Dark Mode",
      "Timer",
      "High Score Tracking",
    ],
    description:
      "Interactive quiz application with timing, scoring, dark mode, and local JSON data fetching. Tracks user progress and maintains a high score system using React hooks and context.",
    github: "",
    liveDemo: "",
    date: "Jun 2024 – Jul 2024",
    role: "React Developer",
    tags: ["Quiz", "State Management", "UI/UX"],
  },

  {
    id: 4,
    title: "usePopcorn",
    image: usePopcornImg,
    technologyUsed: [
      "React",
      "OMDB API",
      "Custom Hooks",
      "Local Storage",
      "State Management",
      "Responsive Design",
    ],
    description:
      "Movie library app allowing users to search for movies, view details, and rate them using a custom rating component. Includes persistent storage, dynamic searching, and real-time updates.",
    github: "",
    liveDemo: "",
    date: "May 2024 – Jun 2024",
    role: "Front-End Developer",
    tags: ["Movies", "API Integration", "Local Storage"],
  },

  {
    id: 5,
    title: "Eat & Split",
    image: eatAndSplitImg,
    technologyUsed: [
      "React",
      "JavaScript",
      "CSS",
      "State Management",
      "UI Design",
    ],
    description:
      "React app for managing friends and splitting expenses. Users can add friends, select someone, split bills, and track balances with a clean interactive interface.",
    github: "",
    liveDemo: "",
    date: "Apr 2024",
    role: "React Developer",
    tags: ["Finance", "Friends", "UI"],
  },

  {
    id: 6,
    title: "2D Subway Game",
    image: subway2DImg,
    technologyUsed: [
      "Java",
      "JavaFX",
      "Object-Oriented Programming",
      "Animation",
      "Data Persistence",
    ],
    description:
      "2D endless runner game where players collect coins, avoid obstacles, and continue using collected currency. Stores high scores and uses object-oriented architecture with JavaFX graphics.",
    github: "",
    liveDemo: "",
    date: "Nov 2023 – Jan 2024",
    role: "Java Developer",
    tags: ["Game", "Java", "OOP"],
  },

  {
    id: 7,
    title: "AWA – Front-End Booking Website",
    image: awaNativeImg,
    technologyUsed: ["HTML", "CSS", "SASS", "Bootstrap", "JavaScript"],
    description:
      "Front-end booking system for browsing properties, calculating reservation costs, selecting duration, and processing mock payments with receipt generation.",
    github: "",
    liveDemo: "",
    date: "Jul 2023 – Sep 2023",
    role: "Front-End Developer",
    tags: ["Booking", "Frontend", "UI"],
  },

  {
    id: 8,
    title: "Mapty",
    image: maptyImg,
    technologyUsed: [
      "JavaScript",
      "HTML",
      "CSS",
      "Leaflet.js",
      "Local Storage",
      "OOP",
    ],
    description:
      "Interactive fitness-tracking application for running and cycling. Users can log workouts, track metrics, and visualize them on a map with real-time geolocation. Data persists locally for workout history.",
    github: "",
    liveDemo: "",
    date: "Jun 2023 – Jul 2023",
    role: "Front-End Developer",
    tags: ["Fitness", "Maps", "Geolocation"],
  },

  {
    id: 9,
    title: "Bankist Website",
    image: bankistWebsiteImg,
    technologyUsed: [
      "JavaScript",
      "HTML",
      "CSS",
      "Intersection Observer API",
      "Smooth Scrolling",
      "Lazy Loading",
    ],
    description:
      "Modern banking website showcasing features, operations, and testimonials. Includes smooth scrolling, sticky navigation, lazy-loaded images, tabbed components, and modal interactions.",
    github: "",
    liveDemo: "",
    date: "May 2023",
    role: "Frontend Developer",
    tags: ["UI/UX", "Scrolling", "Animations"],
  },

  {
    id: 10,
    title: "Bankist",
    image: bankistImg,
    technologyUsed: [
      "JavaScript",
      "HTML",
      "CSS",
      "OOP",
      "Date & Time Formatting",
    ],
    description:
      "Interactive banking application simulating real financial operations including login, transfers, loan requests, interest calculation, and secure account closure with session timeout.",
    github: "",
    liveDemo: "",
    date: "Apr 2023",
    role: "JavaScript Developer",
    tags: ["Finance", "Transactions", "Logic"],
  },

  {
    id: 11,
    title: "Guess My Number",
    image: guessMyNumberImg,
    technologyUsed: ["JavaScript", "HTML", "CSS", "DOM Manipulation"],
    description:
      "Simple number guessing game where users guess a random number from 1 to 20. Features scoring, feedback messages, and a reset capability to replay.",
    github: "",
    liveDemo: "",
    date: "Mar 2023",
    role: "Frontend Game Developer",
    tags: ["Game", "JS Basics", "DOM"],
  },

  {
    id: 12,
    title: "Pig Game",
    image: pigGameImg,
    technologyUsed: ["JavaScript", "HTML", "CSS", "State Management"],
    description:
      "Two-player dice game where players take turns rolling and holding to reach 100 points without rolling a 1. Real-time UI updates and turn state tracking.",
    github: "",
    liveDemo: "",
    date: "Mar 2023",
    role: "Frontend Game Developer",
    tags: ["Game", "Dice", "State"],
  },

  {
    id: 13,
    title: "Space Game",
    image: spaceGameImg,
    technologyUsed: ["JavaScript", "HTML", "CSS", "Animation"],
    description:
      "Two-player competitive shooting game featuring lifebars, health tracking, and real-time bullet collisions. Players battle to deplete opponent’s lifebar.",
    github: "",
    liveDemo: "",
    date: "Feb 2022",
    role: "Game Developer",
    tags: ["Shooter", "Canvas", "Animation"],
  },
];
