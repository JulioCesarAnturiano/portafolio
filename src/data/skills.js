// Skills - Edita esta lista con tus habilidades
// Cada skill tiene: id, name, icon (emoji o texto), color (clase tailwind), level (1-100), category

export const skills = [
  // Frontend
  {
    id: "html",
    name: "HTML5",
    icon: "🌐",
    color: "from-orange-500 to-orange-600",
    glowColor: "rgba(249, 115, 22, 0.5)",
    level: 95,
    category: "frontend",
    description: "Semántica, accesibilidad y SEO"
  },
  {
    id: "css",
    name: "CSS3",
    icon: "🎨",
    color: "from-blue-500 to-blue-600",
    glowColor: "rgba(59, 130, 246, 0.5)",
    level: 90,
    category: "frontend",
    description: "Flexbox, Grid, Animaciones"
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "⚡",
    color: "from-yellow-400 to-yellow-500",
    glowColor: "rgba(250, 204, 21, 0.5)",
    level: 92,
    category: "frontend",
    description: "ES6+, Async/Await, DOM"
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "📘",
    color: "from-blue-600 to-blue-700",
    glowColor: "rgba(37, 99, 235, 0.5)",
    level: 85,
    category: "frontend",
    description: "Tipado estático, Interfaces"
  },
  {
    id: "react",
    name: "React",
    icon: "⚛️",
    color: "from-cyan-400 to-cyan-500",
    glowColor: "rgba(34, 211, 238, 0.5)",
    level: 90,
    category: "frontend",
    description: "Hooks, Context, Redux"
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: "💨",
    color: "from-teal-400 to-teal-500",
    glowColor: "rgba(45, 212, 191, 0.5)",
    level: 88,
    category: "frontend",
    description: "Utility-first CSS"
  },

  // Backend
  {
    id: "nodejs",
    name: "Node.js",
    icon: "🟢",
    color: "from-green-500 to-green-600",
    glowColor: "rgba(34, 197, 94, 0.5)",
    level: 88,
    category: "backend",
    description: "APIs, Microservicios"
  },
  {
    id: "express",
    name: "Express",
    icon: "🚂",
    color: "from-gray-500 to-gray-600",
    glowColor: "rgba(107, 114, 128, 0.5)",
    level: 85,
    category: "backend",
    description: "REST APIs, Middleware"
  },
  {
    id: "php",
    name: "PHP",
    icon: "🐘",
    color: "from-indigo-500 to-indigo-600",
    glowColor: "rgba(99, 102, 241, 0.5)",
    level: 80,
    category: "backend",
    description: "Backend tradicional"
  },
  {
    id: "laravel",
    name: "Laravel",
    icon: "🔺",
    color: "from-red-500 to-red-600",
    glowColor: "rgba(239, 68, 68, 0.5)",
    level: 82,
    category: "backend",
    description: "MVC, Eloquent ORM"
  },

  // Database
  {
    id: "postgresql",
    name: "PostgreSQL",
    icon: "🐘",
    color: "from-blue-700 to-blue-800",
    glowColor: "rgba(29, 78, 216, 0.5)",
    level: 85,
    category: "database",
    description: "SQL avanzado, Optimización"
  },
  {
    id: "mysql",
    name: "MySQL",
    icon: "🐬",
    color: "from-orange-500 to-blue-500",
    glowColor: "rgba(249, 115, 22, 0.5)",
    level: 85,
    category: "database",
    description: "Diseño de esquemas"
  },

  // Tools & DevOps
  {
    id: "git",
    name: "Git",
    icon: "📂",
    color: "from-orange-600 to-red-600",
    glowColor: "rgba(234, 88, 12, 0.5)",
    level: 90,
    category: "tools",
    description: "Control de versiones"
  },
  {
    id: "github",
    name: "GitHub",
    icon: "🐱",
    color: "from-gray-700 to-gray-800",
    glowColor: "rgba(55, 65, 81, 0.5)",
    level: 88,
    category: "tools",
    description: "Colaboración, CI/CD"
  },
  {
    id: "docker",
    name: "Docker",
    icon: "🐳",
    color: "from-blue-500 to-blue-600",
    glowColor: "rgba(59, 130, 246, 0.5)",
    level: 75,
    category: "tools",
    description: "Contenedores, Compose"
  },

  // Mobile
  {
    id: "flutter",
    name: "Flutter",
    icon: "📱",
    color: "from-sky-400 to-blue-500",
    glowColor: "rgba(56, 189, 248, 0.5)",
    level: 70,
    category: "mobile",
    description: "Apps multiplataforma"
  },
]

// Categorías para filtrar
export const skillCategories = [
  { id: "all", name: "Todas" },
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "database", name: "Base de Datos" },
  { id: "tools", name: "Herramientas" },
  { id: "mobile", name: "Mobile" },
]
