import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ChevronRight } from 'lucide-react'
import { projects, projectCategories } from '../../data/projects'

const copy = {
  es: {
    featured: 'Destacado',
    titleTop: 'Trabajo destacado',
    title: 'Proyectos',
    subtitle: 'Una selección de proyectos que demuestran mis habilidades.',
    moreGithub: 'Ver más en GitHub',
    learnMore: 'Ver detalle',
    detailsTitle: 'Detalle del proyecto',
    highlights: 'Puntos clave',
    close: 'Cerrar',
    projectContent: {
      1: {
        title: 'Plataforma Electoral RunoH',
        description: 'Plataforma web en tiempo real para monitoreo de votos y validación de actas electorales desplegada para la elección municipal del 22 de marzo de 2026. Sistema productivo co-desarrollado para operación electoral en vivo con control de acceso por roles.',
        highlights: [
          'Monitoreo de papeletas en tiempo real durante la elección',
          'Acceso por roles (administradores, delegados, supervisores)',
          'Flujo electoral y validación de actas',
          'APIs backend con integridad y trazabilidad de datos',
          'Reporte transparente durante el proceso de votación',
        ],
      },
      2: {
        title: 'ColcaTrufis - Plataforma Municipal de Transporte',
        description: 'Plataforma full-stack multimodal construida con el Gobierno Autónomo Municipal de Colcapirhua. Incluye app móvil multiplataforma con mapas y geolocalización GPS en tiempo real.',
        highlights: [
          'Integración de servicios GPS',
          'App móvil multiplataforma (Flutter)',
          'Geolocalización con GeoJSON y Nominatim',
          'APIs REST para datos espaciales',
          'Paneles administrativos para gestión de transporte',
        ],
      },
      3: {
        title: 'Captura de Movimiento por Webcam para Animación 3D',
        description: 'Sistema markerless de motion capture usando webcam y MediaPipe Pose para animación 3D. Aplica matemáticas con cuaterniones y transformaciones 3D para rotaciones por hueso en Blender, exportando animaciones JSON sin hardware especializado.',
        highlights: [
          'Captura markerless usando webcam',
          'Transformaciones 3D y cuaterniones',
          'Exportación FBX con estructura de 5 huesos',
          'Sin hardware especializado',
          'Estimación de pose en tiempo real',
        ],
      },
      4: {
        title: 'Librería de Estructuras de Datos y Sistema de Gestión',
        description: 'Implementación en Java de estructuras de datos personalizadas: árboles binarios, listas doblemente enlazadas, conjuntos, mapas y grafos desde cero. Aplicadas en un sistema de gestión de proyectos con dependencias y flujos.',
        highlights: [
          'Árboles binarios y listas doblemente enlazadas',
          'Conjuntos, mapas y grafos custom',
          'Dependencias y flujos de proyectos',
          'Todo implementado desde cero',
        ],
      },
      5: {
        title: 'Librería NLP de Comandos y Plataforma Web de Artes Marciales',
        description: 'Librería PHP con regex para detectar patrones de lenguaje natural y disparar acciones de voz/video. Integrada en una plataforma Laravel de gestión de artes marciales con SQL Server y SQLite.',
        highlights: [
          'Procesamiento de comandos en lenguaje natural',
          'Integración de voz y video',
          'Plataforma web en Laravel',
          'Soporte de doble base de datos (SQL Server y SQLite)',
        ],
      },
      6: {
        title: 'Desarrollo de Juegos - RPG en Godot 4',
        description: 'Desarrollo de juegos estilo RPG desde cero en Godot 4, incluyendo lógica, mecánicas, sistemas de estado e interfaz. Integración de modelado 3D (Blender) y pixel art en experiencias interactivas completas.',
        highlights: [
          'Mecánicas RPG y sistemas de estado',
          'Integración de modelado 3D (Blender)',
          'Assets de pixel art',
          'Experiencias interactivas end-to-end',
        ],
      },
    },
  },
  en: {
    featured: 'Featured',
    titleTop: 'Featured work',
    title: 'Projects',
    subtitle: 'A selection of projects that showcase my skills.',
    moreGithub: 'See more on GitHub',
    learnMore: 'View details',
    detailsTitle: 'Project details',
    highlights: 'Highlights',
    close: 'Close',
  },
}

const withLocaleProject = (project, lang) => {
  if (lang !== 'es') return project
  const localized = copy.es.projectContent?.[project.id]
  if (!localized) return project
  return {
    ...project,
    title: localized.title || project.title,
    description: localized.description || project.description,
    highlights: localized.highlights || project.highlights,
  }
}

const ProjectCard = ({ project, index, lang = 'es', onOpen }) => {
  const t = copy[lang] || copy.es
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative h-full bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden"
        onClick={() => onOpen?.(project)}
        whileHover={{ 
          y: -6, 
          borderColor: 'rgba(255,255,255,0.2)',
          transition: { duration: 0.3 }
        }}
      >
        {/* Image placeholder */}
        <div className="relative h-40 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.4 }}
              className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl text-white font-bold shadow-xl"
            >
              {project.title.charAt(0)}
            </motion.div>
          </div>

          {project.featured && (
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-white text-black text-xs font-semibold rounded-full">
              {t.featured}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 flex items-center justify-center gap-3"
          >
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white text-black rounded-xl hover:bg-white/90 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={20} />
              </motion.a>
            )}
          </motion.div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-white/50 text-sm mb-3 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-white/5 text-white/60 text-xs rounded-lg border border-white/10"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-0.5 text-white/40 text-xs">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onOpen?.(project)
            }}
            className="mt-4 inline-flex items-center gap-2 text-primary-300 hover:text-primary-200 text-sm font-medium"
          >
            {t.learnMore}
            <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>
    </motion.article>
  )
}

const Projects = ({ lang = 'es', githubUrl }) => {
  const t = copy[lang] || copy.es
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const localizedProjects = projects.map((project) => withLocaleProject(project, lang))
  const filteredProjects = activeCategory === 'all'
    ? localizedProjects
    : localizedProjects.filter(project => project.category === activeCategory)
  const categories =
    lang === 'en'
      ? projectCategories
      : projectCategories.map((category) => {
          const names = {
            all: 'Todos',
            fullstack: 'Full Stack',
            research: 'Investigación',
            academic: 'Académico',
            game: 'Game Dev',
          }
          return { ...category, name: names[category.id] || category.name }
        })

  return (
    <section id="projects" className="relative min-h-screen flex items-center py-24 overflow-hidden">

      <div className="container-custom relative z-10">
        {/* Right-aligned content to leave space for keyboard on left */}
        <div className="ml-auto max-w-4xl">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.span 
              className="inline-block text-primary-400 text-sm font-medium tracking-widest uppercase mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t.titleTop}
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t.title}
            </motion.h2>
            <motion.p 
              className="text-white/50 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t.subtitle}
            </motion.p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} lang={lang} onOpen={setSelectedProject} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View more button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-10"
          >
            <motion.a
              href={githubUrl || 'https://github.com/JulioCesarAnturiano'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white font-medium rounded-xl border border-white/10 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={18} />
              {t.moreGithub}
            </motion.a>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/15 bg-[#09090b] p-6"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-primary-300 text-sm uppercase tracking-wider">{t.detailsTitle}</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{selectedProject.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-3 py-1.5 rounded-lg border border-white/20 text-white/80 hover:text-white hover:border-white/40"
                >
                  {t.close}
                </button>
              </div>

              <p className="text-white/70 mb-5">{selectedProject.description}</p>

              <div className="mb-5">
                <h4 className="text-white font-semibold mb-2">{t.highlights}</h4>
                <ul className="space-y-2">
                  {(selectedProject.highlights || []).map((item) => (
                    <li key={item} className="text-white/70 text-sm flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg border border-white/15 text-white/70 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
