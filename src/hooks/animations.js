// Premium animation variants for Framer Motion
// Reusable across all sections for consistent, cinematic feel

// Easing curves for premium feel
export const easings = {
  smooth: [0.6, 0.01, 0.05, 0.95],
  smoothOut: [0.16, 1, 0.3, 1],
  smoothIn: [0.4, 0, 1, 1],
  elastic: [0.68, -0.55, 0.265, 1.55],
  bounce: [0.175, 0.885, 0.32, 1.275],
}

// Section reveal - main wrapper for each section
export const sectionReveal = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easings.smooth,
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

// Fade up - standard element entrance
export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easings.smoothOut,
    },
  },
}

// Fade up with scale - more impactful entrance
export const fadeUpScale = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easings.smoothOut,
    },
  },
}

// Fade in only - subtle entrance
export const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easings.smooth,
    },
  },
}

// Scale in - for impactful elements
export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: easings.smoothOut,
    },
  },
}

// Stagger container - wraps items that should appear sequentially
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Stagger container fast - quicker stagger
export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
}

// Stagger item - individual staggered element
export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easings.smoothOut,
    },
  },
}

// Card entrance - for project cards
export const cardReveal = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easings.smoothOut,
    },
  },
}

// Hero specific - dramatic entrance
export const heroTitle = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: easings.smoothOut,
    },
  },
}

export const heroSubtitle = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: easings.smoothOut,
    },
  },
}

export const heroDescription = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.5,
      ease: easings.smoothOut,
    },
  },
}

export const heroButtons = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.7,
      ease: easings.smoothOut,
    },
  },
}

// Skills section - dramatic entrance
export const skillsReveal = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: easings.smoothOut,
    },
  },
}

// Slide from sides
export const slideFromLeft = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: easings.smoothOut,
    },
  },
}

export const slideFromRight = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: easings.smoothOut,
    },
  },
}

// Viewport settings for consistent behavior
export const viewportSettings = {
  once: true,
  amount: 0.2,
  margin: "-50px",
}

export const viewportSettingsEager = {
  once: true,
  amount: 0.1,
  margin: "-100px",
}

// Hover animations for interactive elements
export const buttonHover = {
  scale: 1.03,
  transition: { duration: 0.2, ease: easings.smooth },
}

export const buttonTap = {
  scale: 0.97,
}

export const cardHover = {
  y: -8,
  transition: { duration: 0.3, ease: easings.smoothOut },
}

// Background transitions
export const backgroundFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: easings.smooth },
  },
}
