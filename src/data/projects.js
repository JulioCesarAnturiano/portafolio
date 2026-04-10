// Proyectos - Proyectos reales de Julio Cesar Anturiano Enlate
export const projects = [
  {
    id: 1,
    title: "Electoral Subnacionales",
    description: "Web platform for vote monitoring and electoral record validation deployed for Subnacionales operations, with role-based access control and public demo access.",
    image: "/projects/electoral.jpg",
    tags: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "JWT"],
    category: "fullstack",
    verified: true,
    github: null,
    demo: null,
    apkUrl: "/apk/Alcaldia.apk",
    featured: true,
    highlights: [
      "Real-time ballot monitoring during live elections",
      "Role-based access (administrators, delegates, supervisors)",
      "Electoral workflow & record validation",
      "Backend APIs ensuring data integrity & traceability",
      "Supported transparent reporting during voting process"
    ]
  },
  {
    id: 2,
    title: "ColcaTrufis - Municipal Transportation Platform",
    description: "Full-stack multimodal transportation platform built in collaboration with the Autonomous Municipal Government of Colcapirhua. Cross-platform mobile app with integrated mapping capabilities, real-time GPS tracking, deployed backend at https://moviruta.colcapirhua.gob.bo/ and APK distribution for field testing.",
    image: "/projects/colcatrufis.jpg",
    tags: ["Laravel 10", "Flutter", "MySQL", "PHP 8.1", "REST API", "GeoJSON"],
    category: "fullstack",
    verified: true,
    github: null,
    demo: null,
    backendUrl: "https://moviruta.colcapirhua.gob.bo/",
    apkUrl: "/apk/colcaTrufis.apk",
    featured: true,
    highlights: [
      "GPS Location Services integration",
      "Cross-platform mobile app (FlutterDart)",
      "GeoJSON & Nominatim geolocation",
      "RESTful APIs for spatial data",
      "Administrative panels for transport officials"
    ]
  },
  {
    id: 8,
    title: "Cooperativa Eléctrica - Field App Demo",
    description: "Flutter mobile app demo for electricians in an electrical cooperative. Includes login, routes, client mapping, meter readings, preaviso generation and Bluetooth thermal printing without requiring a backend connection.",
    image: "/projects/colcatrufis.jpg",
    tags: ["Flutter", "Dart", "Provider", "Bluetooth BLE", "Geolocator", "ESC/POS"],
    category: "mobile",
    verified: true,
    github: null,
    demo: null,
    backendUrl: null,
    apkUrl: "/apk/ElectricidaCoperativa.apk",
    featured: false,
    highlights: [
      "Electrician login and route viewing",
      "Client location on map",
      "Meter reading capture",
      "Preaviso generation and thermal printing",
      "Bluetooth printer pairing and reconnect"
    ]
  },
  {
    id: 3,
    title: "Webcam-Based Motion Capture for 3D Animation",
    description: "Markerless motion capture system using webcam and MediaPipe Pose for 3D animation. Applies quaternion mathematics and 3D coordinate transforms for per-bone rotations in Blender, exporting structured JSON animation data without specialized hardware.",
    image: "/projects/mocap.jpg",
    tags: ["Python", "MediaPipe", "OpenCV", "NumPy", "Blender", "Linear Algebra"],
    category: "research",
    verified: true,
    github: null,
    demo: null,
    downloadFiles: [
      {
        label: "motion_capture.json",
        url: "/graficacion2/motion_capture.json"
      },
      {
        label: "capture_mocap_backend.py",
        url: "/graficacion2/capture_mocap_backend.py"
      }
    ],
    featured: true,
    highlights: [
      "Markerless motion capture using webcam",
      "Quaternion & 3D coordinate transforms",
      "Exports FBX with 5 bones structure",
      "No specialized hardware required",
      "Real-time pose estimation"
    ]
  },
  {
    id: 4,
    title: "Custom Data Structures Library & Project Management System",
    description: "Java-based implementation of custom data structures including binary trees, doubly linked lists, custom sets, maps, and graphs from scratch. Applied these structures in a project management system with dependencies and workflows.",
    image: "/projects/datastructures.jpg",
    tags: ["Java", "OOP", "Algorithms", "Graph Theory", "Data Structures"],
    category: "academic",
    verified: false,
    github: null,
    demo: null,
    featured: false,
    highlights: [
      "Binary trees & doubly linked lists",
      "Custom sets, maps & graphs",
      "Project dependencies & workflows",
      "Built entirely from scratch"
    ]
  },
  {
    id: 5,
    title: "NLP Command Library & Martial Arts Web Platform",
    description: "PHP library using regex for natural language pattern detection, triggering actions from voice and video commands. Applied in a Laravel platform for martial arts management with SQL Server & SQLite backends.",
    image: "/projects/nlp-martial.jpg",
    tags: ["PHP", "Laravel", "NLP", "Regex", "SQL Server", "SQLite"],
    category: "fullstack",
    verified: false,
    github: null,
    demo: null,
    featured: false,
    highlights: [
      "Natural language command processing",
      "Voice & video integration",
      "Laravel web platform",
      "Dual database support (SQL Server & SQLite)"
    ]
  },
  {
    id: 6,
    title: "Game Development - Godot 4 RPG",
    description: "Developed RPG-style games from scratch in Godot 4 including logic, mechanics, state systems and UI. Integrated 3D modelling (Blender) and pixel art into end-to-end interactive experiences.",
    image: "/projects/godot-game.jpg",
    tags: ["Godot 4", "GDScript", "Blender", "Pixel Art", "3D Modelling"],
    category: "game",
    verified: false,
    github: null,
    demo: null,
    featured: false,
    highlights: [
      "RPG game mechanics & state systems",
      "3D modelling integration (Blender)",
      "Pixel art assets",
      "End-to-end interactive experiences"
    ]
  },
  {
    id: 9,
    title: "AI Symptom-Guidance Chatbot (Healthcare-Oriented Prototype)",
    description: "Independent healthcare-oriented prototype that uses NLP and LLM concepts to provide approximate symptom guidance with a structured and responsible response flow.",
    image: "/projects/ai-symptom-chatbot.jpg",
    tags: ["Python", "NLP", "LLM Concepts", "Database Integration"],
    category: "research",
    verified: false,
    github: null,
    demo: null,
    featured: false,
    highlights: [
      "Built an AI-based chatbot connected to a database for user-reported symptom guidance",
      "Designed structured symptom-to-response logic focused on clarity and responsible language",
      "Applied NLP and LLM concepts to improve user comprehension",
      "Bridged software engineering with healthcare-oriented problem solving",
      "Continues evolving through iterative model and logic improvements"
    ]
  }
]

// Categorías de proyectos
export const projectCategories = [
  { id: "all", name: "All" },
  { id: "fullstack", name: "Full Stack" },
  { id: "mobile", name: "Mobile" },
  { id: "research", name: "Research" },
  { id: "academic", name: "Academic" },
  { id: "game", name: "Game Dev" },
]
