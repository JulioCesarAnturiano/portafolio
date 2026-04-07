// Proyectos - Edita esta lista con tus proyectos
export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Plataforma de comercio electrónico completa con carrito de compras, pasarela de pagos, panel de administración y gestión de inventario.",
    image: "/projects/ecommerce.jpg", // Puedes agregar imágenes en public/projects/
    tags: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
    category: "fullstack",
    github: "https://github.com/tuusuario/ecommerce",
    demo: "https://ecommerce-demo.com",
    featured: true,
    highlights: [
      "Autenticación con JWT",
      "Integración con Stripe",
      "Dashboard admin completo",
      "Responsive design"
    ]
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Aplicación de gestión de tareas estilo Kanban con drag & drop, colaboración en tiempo real y notificaciones.",
    image: "/projects/taskapp.jpg",
    tags: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    category: "frontend",
    github: "https://github.com/tuusuario/taskapp",
    demo: "https://taskapp-demo.com",
    featured: true,
    highlights: [
      "Drag & drop intuitivo",
      "Tiempo real con WebSockets",
      "Filtros y búsqueda avanzada",
      "Tema oscuro/claro"
    ]
  },
  {
    id: 3,
    title: "API REST Blog",
    description: "API RESTful para un sistema de blog con autenticación, roles de usuario, comentarios y sistema de likes.",
    image: "/projects/api.jpg",
    tags: ["Node.js", "Express", "MongoDB", "JWT", "Docker"],
    category: "backend",
    github: "https://github.com/tuusuario/blog-api",
    demo: "https://api-docs.com",
    featured: false,
    highlights: [
      "Documentación Swagger",
      "Rate limiting",
      "Validación con Joi",
      "Tests con Jest"
    ]
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Sitio web de portafolio personal con animaciones 3D, diseño moderno y optimizado para SEO.",
    image: "/projects/portfolio.jpg",
    tags: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
    category: "frontend",
    github: "https://github.com/tuusuario/portfolio",
    demo: "https://tuportfolio.com",
    featured: true,
    highlights: [
      "Animaciones fluidas",
      "Skills interactivos",
      "100% responsive",
      "Performance optimizada"
    ]
  },
  {
    id: 5,
    title: "Chat Application",
    description: "Aplicación de chat en tiempo real con salas, mensajes privados, emojis y compartir archivos.",
    image: "/projects/chat.jpg",
    tags: ["React", "Socket.io", "Node.js", "Redis"],
    category: "fullstack",
    github: "https://github.com/tuusuario/chat-app",
    demo: "https://chat-demo.com",
    featured: false,
    highlights: [
      "Mensajería en tiempo real",
      "Salas públicas y privadas",
      "Historial de mensajes",
      "Indicador de escritura"
    ]
  },
  {
    id: 6,
    title: "Weather Dashboard",
    description: "Dashboard del clima con pronóstico extendido, mapas interactivos y alertas meteorológicas.",
    image: "/projects/weather.jpg",
    tags: ["React", "OpenWeather API", "Chart.js", "Geolocation"],
    category: "frontend",
    github: "https://github.com/tuusuario/weather-app",
    demo: "https://weather-demo.com",
    featured: false,
    highlights: [
      "Pronóstico 7 días",
      "Gráficos interactivos",
      "Geolocalización",
      "PWA instalable"
    ]
  }
]

// Categorías de proyectos
export const projectCategories = [
  { id: "all", name: "Todos" },
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "fullstack", name: "Full Stack" },
]
