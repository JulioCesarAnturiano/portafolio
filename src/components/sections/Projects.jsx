import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ChevronRight } from 'lucide-react'
import { projects, projectCategories } from '../../data/projects'
import { 
  sectionReveal, 
  fadeUp, 
  staggerContainer, 
  cardReveal, 
  viewportSettings,
  easings 
} from '../../hooks/animations'

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.article
      layout
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative h-full bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden transition-colors duration-500"
        whileHover={{ 
          y: -8, 
          borderColor: 'rgba(255,255,255,0.2)',
          transition: { duration: 0.3, ease: easings.smoothOut }
        }}
      >
        {/* Image placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10" />
          
          {/* Project icon/placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, ease: easings.smoothOut }}
              className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl flex items-center justify-center text-4xl text-white font-bold shadow-xl"
            >
              {project.title.charAt(0)}
            </motion.div>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-white text-black text-xs font-semibold rounded-full">
              Destacado
            </div>
          )}

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 flex items-center justify-center gap-4"
          >
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={24} />
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white text-black rounded-xl hover:bg-white/90 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={24} />
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-white/50 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-white/5 text-white/60 text-xs rounded-lg border border-white/10"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2.5 py-1 text-white/40 text-xs">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Highlights */}
          {project.highlights && (
            <div className="pt-4 border-t border-white/10">
              <ul className="space-y-1">
                {project.highlights.slice(0, 2).map((highlight, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/50 text-sm">
                    <ChevronRight size={14} className="text-primary-500" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </motion.article>
  )
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory)

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      {/* Background overlay */}
      <motion.div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      <div className="container-custom relative z-10">
        {/* Section Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={sectionReveal}
          className="text-center mb-16"
        >
          <motion.span 
            variants={fadeUp}
            className="inline-block text-primary-400 text-sm font-medium tracking-widest uppercase mb-4"
          >
            Trabajo que me enorgullece
          </motion.span>
          <motion.h2 
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Mis Proyectos
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="text-white/50 max-w-xl mx-auto"
          >
            Una selección de proyectos que demuestran mis habilidades.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: easings.smoothOut }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {projectCategories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.3 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View more button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: easings.smoothOut }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/tuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white font-medium rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            Ver más en GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
