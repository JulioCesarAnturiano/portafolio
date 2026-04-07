import { useState } from 'react'
import { motion } from 'framer-motion'

const SkillCard = ({ skill, index, isHovered, onHover, onLeave }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.05,
        type: "spring",
        stiffness: 150,
        damping: 15
      }}
      className="perspective-[2000px]"
      onMouseEnter={() => {
        onHover()
        setShowTooltip(true)
      }}
      onMouseLeave={() => {
        onLeave()
        setShowTooltip(false)
      }}
    >
      <motion.div
        className="relative preserve-3d cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: isHovered ? -5 : 35,
          rotateY: isHovered ? 5 : -15,
          y: isHovered ? -15 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20 
        }}
      >
        {/* Isometric Cube Container */}
        <div className="relative w-full aspect-square">
          {/* Main cube face (top) */}
          <div 
            className={`
              absolute inset-0 rounded-2xl overflow-hidden
              bg-gradient-to-br ${skill.color}
              border-2 border-white/10
            `}
            style={{
              transform: 'translateZ(30px)',
              boxShadow: isHovered 
                ? `0 25px 50px -12px ${skill.glowColor}, 0 0 40px ${skill.glowColor}`
                : `0 20px 40px -10px rgba(0,0,0,0.8)`
            }}
          >
            {/* Shine/gloss effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50" />
            
            {/* Content on top face */}
            <div className="relative h-full flex flex-col items-center justify-center p-4">
              {/* Icon */}
              <motion.div
                className="text-4xl md:text-5xl mb-2 drop-shadow-lg filter"
                animate={{ 
                  rotateZ: isHovered ? [0, -10, 10, 0] : 0,
                }}
                transition={{ duration: 0.4 }}
              >
                {skill.icon}
              </motion.div>
              
              {/* Name */}
              <h3 className="text-white font-bold text-xs md:text-sm text-center drop-shadow-lg leading-tight">
                {skill.name}
              </h3>
            </div>

            {/* Top highlight edge */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/30" />
          </div>

          {/* Right side face */}
          <div 
            className={`
              absolute top-0 right-0 w-[30px] h-full
              bg-gradient-to-br ${skill.color}
              opacity-60
              border-r-2 border-b-2 border-white/5
            `}
            style={{
              transform: 'rotateY(90deg) translateZ(0px) translateX(15px)',
              transformOrigin: 'right',
              filter: 'brightness(0.7)'
            }}
          />

          {/* Bottom face (shadow area) */}
          <div 
            className={`
              absolute bottom-0 left-0 right-0 h-[30px]
              bg-gradient-to-br ${skill.color}
              opacity-40
              border-b-2 border-white/5
            `}
            style={{
              transform: 'rotateX(-90deg) translateZ(0px) translateY(15px)',
              transformOrigin: 'bottom',
              filter: 'brightness(0.5)'
            }}
          />

          {/* Shadow on ground */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 w-[120%] h-[120%] rounded-full bg-black/40 blur-xl"
            style={{
              transform: 'translateZ(-50px) rotateX(90deg)',
              top: '100%',
            }}
            animate={{
              scale: isHovered ? 1.3 : 1,
              opacity: isHovered ? 0.6 : 0.4
            }}
          />
        </div>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ 
            opacity: showTooltip ? 1 : 0, 
            y: showTooltip ? 0 : 10,
            scale: showTooltip ? 1 : 0.9
          }}
          transition={{ duration: 0.2 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none whitespace-nowrap"
          style={{ transform: 'translateZ(100px)' }}
        >
          <div className="px-4 py-2 bg-dark-900 border-2 border-dark-700 rounded-xl shadow-2xl backdrop-blur-sm">
            <p className="text-white text-sm font-bold mb-0.5">{skill.name}</p>
            <p className="text-dark-400 text-xs">{skill.description}</p>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-dark-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${skill.color}`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <span className="text-xs text-dark-500">{skill.level}%</span>
            </div>
          </div>
          {/* Tooltip arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-dark-900 border-l-2 border-t-2 border-dark-700 rotate-45" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default SkillCard
