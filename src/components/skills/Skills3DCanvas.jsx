import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, Html } from '@react-three/drei'
import { Suspense, useRef, useMemo, useState, useCallback } from 'react'
import * as THREE from 'three'

// Colores característicos por tecnología
const techColors = {
  html: { main: '#e34f26', dark: '#c13818', glow: '#ff6b3d' },
  css: { main: '#264de4', dark: '#1a3bb5', glow: '#4d7aff' },
  javascript: { main: '#f7df1e', dark: '#c9b500', glow: '#ffe94d' },
  typescript: { main: '#3178c6', dark: '#235a9e', glow: '#5a9cf5' },
  react: { main: '#61dafb', dark: '#3db8d9', glow: '#8ae8ff' },
  tailwind: { main: '#06b6d4', dark: '#0891a8', glow: '#3dd6f0' },
  nodejs: { main: '#339933', dark: '#267326', glow: '#4dcc4d' },
  express: { main: '#404040', dark: '#2a2a2a', glow: '#666666' },
  php: { main: '#777bb4', dark: '#5a5d8c', glow: '#9a9dd4' },
  laravel: { main: '#ff2d20', dark: '#cc1a0f', glow: '#ff5c52' },
  postgresql: { main: '#336791', dark: '#264d6d', glow: '#4d8ac2' },
  mysql: { main: '#4479a1', dark: '#335d7a', glow: '#5d9dd4' },
  git: { main: '#f05032', dark: '#c13a22', glow: '#ff7a5c' },
  github: { main: '#24292e', dark: '#1a1e22', glow: '#4a5560' },
  docker: { main: '#2496ed', dark: '#1a75c2', glow: '#52b0ff' },
  flutter: { main: '#02569b', dark: '#01406f', glow: '#3a8fd4' },
}

const techIcons = {
  html: 'HTML',
  css: 'CSS',
  javascript: 'JS',
  typescript: 'TS',
  react: '⚛',
  tailwind: '🌊',
  nodejs: 'N',
  express: 'Ex',
  php: 'PHP',
  laravel: 'L',
  postgresql: 'PG',
  mysql: 'SQL',
  git: 'Git',
  github: '🐱',
  docker: '🐳',
  flutter: 'F',
}

// Premium animated keycap component with enhanced animations
const SkillCube = ({ skill, position, index, onHover, onUnhover, onClick, mousePosition }) => {
  const groupRef = useRef()
  const glowRef = useRef()
  
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)
  
  // Animation state refs for smooth interpolation
  const anim = useRef({
    y: 0,
    targetY: 0,
    scale: 1,
    targetScale: 1,
    rotX: 0,
    targetRotX: 0,
    rotZ: 0,
    targetRotZ: 0,
    glow: 0,
    targetGlow: 0,
    pressProgress: 0,
  })
  
  // Unique idle animation parameters per cube - makes each feel alive
  const idleParams = useMemo(() => ({
    floatSpeed: 0.5 + Math.random() * 0.4,
    floatAmplitude: 0.06 + Math.random() * 0.05,
    floatOffset: Math.random() * Math.PI * 2,
    floatSpeed2: 0.3 + Math.random() * 0.2,
    rotateSpeed: 0.12 + Math.random() * 0.08,
    rotateAmplitude: 0.012 + Math.random() * 0.008,
    rotateOffset: Math.random() * Math.PI * 2,
  }), [])
  
  const colors = techColors[skill.id] || { main: '#666666', dark: '#444444', glow: '#888888' }
  const icon = techIcons[skill.id] || skill.icon

  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    const a = anim.current
    
    // === IDLE ANIMATION - Organic floating ===
    const idleY = Math.sin(time * idleParams.floatSpeed + idleParams.floatOffset) * idleParams.floatAmplitude
    const idleY2 = Math.cos(time * idleParams.floatSpeed2 + idleParams.floatOffset * 0.7) * idleParams.floatAmplitude * 0.4
    
    // Subtle idle rotation
    const idleRotX = Math.sin(time * idleParams.rotateSpeed + idleParams.rotateOffset) * idleParams.rotateAmplitude
    const idleRotZ = Math.cos(time * idleParams.rotateSpeed * 0.7 + idleParams.rotateOffset) * idleParams.rotateAmplitude * 0.6
    
    // === HOVER ANIMATION TARGETS ===
    if (hovered) {
      a.targetY = 0.22
      a.targetScale = 1.1
      a.targetGlow = 1
      
      // Tilt towards mouse for realistic feel
      if (mousePosition) {
        const tiltStrength = 0.1
        a.targetRotX = -mousePosition.y * tiltStrength
        a.targetRotZ = mousePosition.x * tiltStrength
      }
    } else {
      a.targetY = 0
      a.targetScale = 1
      a.targetRotX = 0
      a.targetRotZ = 0
      a.targetGlow = 0
    }
    
    // === PRESS ANIMATION - Key press effect ===
    if (pressed) {
      a.pressProgress = THREE.MathUtils.lerp(a.pressProgress, 1, 0.35)
    } else {
      // Elastic bounce back
      a.pressProgress = THREE.MathUtils.lerp(a.pressProgress, 0, 0.12)
    }
    const pressOffset = Math.sin(a.pressProgress * Math.PI) * -0.25
    
    // === SMOOTH INTERPOLATION (LERP) - Different speeds for natural feel ===
    const posLerp = 0.07
    const scaleLerp = 0.09
    const rotLerp = 0.05
    const glowLerp = 0.1
    
    a.y = THREE.MathUtils.lerp(a.y, a.targetY, posLerp)
    a.scale = THREE.MathUtils.lerp(a.scale, a.targetScale, scaleLerp)
    a.rotX = THREE.MathUtils.lerp(a.rotX, a.targetRotX, rotLerp)
    a.rotZ = THREE.MathUtils.lerp(a.rotZ, a.targetRotZ, rotLerp)
    a.glow = THREE.MathUtils.lerp(a.glow, a.targetGlow, glowLerp)
    
    // === APPLY TRANSFORMS ===
    groupRef.current.position.y = position[1] + a.y + idleY + idleY2 + pressOffset
    groupRef.current.scale.setScalar(a.scale)
    groupRef.current.rotation.x = a.rotX + idleRotX
    groupRef.current.rotation.z = a.rotZ + idleRotZ
    
    // === MATERIAL GLOW ANIMATION ===
    if (glowRef.current) {
      glowRef.current.emissiveIntensity = 0.08 + a.glow * 0.6
    }
  })

  const handlePointerEnter = useCallback((e) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
    onHover?.(skill)
  }, [skill, onHover])

  const handlePointerLeave = useCallback(() => {
    setHovered(false)
    setPressed(false)
    document.body.style.cursor = 'default'
    onUnhover?.()
  }, [onUnhover])

  const handlePointerDown = useCallback(() => setPressed(true), [])
  const handlePointerUp = useCallback(() => setPressed(false), [])

  const handleClick = useCallback(() => {
    console.log(`Clicked: ${skill.name}`, skill)
    onClick?.(skill)
  }, [skill, onClick])

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
    >
      {/* Key socket/well */}
      <RoundedBox args={[1.08, 0.6, 1.08]} radius={0.1} smoothness={4} position={[0, -0.3, 0]}>
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} metalness={0} />
      </RoundedBox>
      
      {/* Main keycap body */}
      <RoundedBox args={[1, 0.85, 1]} radius={0.14} smoothness={4} position={[0, 0.15, 0]} castShadow>
        <meshStandardMaterial color={colors.dark} roughness={0.65} metalness={0.08} />
      </RoundedBox>
      
      {/* Top surface */}
      <RoundedBox args={[0.88, 0.15, 0.88]} radius={0.1} smoothness={4} position={[0, 0.62, 0]} castShadow>
        <meshStandardMaterial color={colors.main} roughness={0.5} metalness={0.12} />
      </RoundedBox>

      {/* Glow edge - animated emissive */}
      <RoundedBox args={[0.92, 0.02, 0.92]} radius={0.08} smoothness={4} position={[0, 0.71, 0]}>
        <meshStandardMaterial 
          ref={glowRef}
          color={colors.glow}
          roughness={0.3}
          metalness={0.2}
          emissive={colors.glow}
          emissiveIntensity={0.08}
        />
      </RoundedBox>

      {/* Icon */}
      <Html position={[0, 0.85, 0]} center distanceFactor={8} style={{ pointerEvents: 'none', userSelect: 'none' }}>
        <div style={{
          fontSize: icon.length > 2 ? '14px' : '22px',
          fontWeight: 'bold',
          color: '#fff',
          textShadow: `0 2px 8px ${colors.glow}`,
          opacity: 0.95,
        }}>
          {icon}
        </div>
      </Html>

      {/* Dynamic point light on hover */}
      <pointLight 
        position={[0, 1.2, 0]} 
        intensity={hovered ? 0.7 : 0} 
        distance={3} 
        color={colors.glow}
        decay={2}
      />
    </group>
  )
}

// Global parallax camera rig - reacts to mouse
const CameraRig = ({ children }) => {
  const groupRef = useRef()
  const { mouse } = useThree()
  const smoothMouse = useRef({ x: 0, y: 0 })
  
  useFrame(() => {
    if (!groupRef.current) return
    
    // Very smooth mouse tracking
    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mouse.x, 0.025)
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, mouse.y, 0.025)
    
    // Apply subtle parallax rotation
    groupRef.current.rotation.y = smoothMouse.current.x * 0.1
    groupRef.current.rotation.x = smoothMouse.current.y * 0.05
  })

  return <group ref={groupRef}>{children}</group>
}

// Hook to track mouse position for individual cube tilting
const useMousePosition = () => {
  const { mouse } = useThree()
  const smoothPos = useRef({ x: 0, y: 0 })
  
  useFrame(() => {
    smoothPos.current.x = THREE.MathUtils.lerp(smoothPos.current.x, mouse.x, 0.04)
    smoothPos.current.y = THREE.MathUtils.lerp(smoothPos.current.y, mouse.y, 0.04)
  })
  
  return smoothPos.current
}

const Skills3DScene = ({ skills, onSkillHover, onSkillClick }) => {
  const groupRef = useRef()
  const mousePos = useMousePosition()

  // Gentle floating for entire keyboard - compound motion
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      groupRef.current.position.y = 
        Math.sin(time * 0.18) * 0.04 + 
        Math.cos(time * 0.12) * 0.025
    }
  })

  // Grid layout with organic variation
  const positions = useMemo(() => {
    const result = []
    const rowSizes = [5, 5, 4, 4]
    let skillIndex = 0
    const spacingX = 1.18
    const spacingZ = 1.15
    
    for (let row = 0; row < rowSizes.length && skillIndex < skills.length; row++) {
      const cols = Math.min(rowSizes[row], skills.length - skillIndex)
      const startX = -(cols - 1) * spacingX / 2
      
      for (let col = 0; col < cols && skillIndex < skills.length; col++) {
        const offsetX = (Math.random() - 0.5) * 0.03
        const offsetZ = (Math.random() - 0.5) * 0.03
        result.push([startX + col * spacingX + row * 0.12 + offsetX, 0, row * spacingZ + offsetZ])
        skillIndex++
      }
    }
    return result
  }, [skills.length])

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[-5, 12, 8]} intensity={1.1} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[8, 8, -5]} intensity={0.4} color="#a0c4ff" />
      <pointLight position={[0, 3, -8]} intensity={0.5} color="#ffd4a0" />

      {/* Parallax wrapper */}
      <CameraRig>
        <group ref={groupRef} position={[0, -0.5, 0]} rotation={[0.55, 0.65, 0]}>
          {/* Shadow plane */}
          <mesh position={[0.5, -0.65, 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[12, 10]} />
            <shadowMaterial opacity={0.25} />
          </mesh>

          {/* Animated keys */}
          {skills.map((skill, index) => (
            <SkillCube
              key={skill.id}
              skill={skill}
              position={positions[index] || [0, 0, 0]}
              index={index}
              onHover={onSkillHover}
              onClick={onSkillClick}
              mousePosition={mousePos}
            />
          ))}
        </group>
      </CameraRig>
    </>
  )
}

const Loader = () => (
  <Html center>
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
      <p className="text-white/50 text-sm font-light">Cargando...</p>
    </div>
  </Html>
)

const Skills3DCanvas = ({ skills }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [clickedSkill, setClickedSkill] = useState(null)

  if (!skills || skills.length === 0) return null

  return (
    <div className="relative w-full h-full">
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #000 0%, #0a0a0a 50%, #000 100%)' }}>
        <Canvas
          shadows
          camera={{ position: [-5, 9, 12], fov: 32 }}
          dpr={[1, 2]}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
          raycaster={{ params: { Line: { threshold: 0.15 } } }}
          style={{ touchAction: 'none' }}
        >
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['#000000', 20, 40]} />
          <Suspense fallback={<Loader />}>
            <Skills3DScene skills={skills} onSkillHover={setHoveredSkill} onSkillClick={setClickedSkill} />
          </Suspense>
        </Canvas>
      </div>

      {/* Glassmorphism hint - pointer-events-none so it doesn't block canvas */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="px-6 py-3 rounded-2xl border border-white/10" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)' }}>
          <p className="text-white/60 text-sm font-light text-center">
            {hoveredSkill 
              ? <span className="text-white/90">{hoveredSkill.name} <span className="text-white/40">— {hoveredSkill.description}</span></span>
              : 'Haz hover sobre las teclas • Click para más info'
            }
          </p>
        </div>
      </div>

      {/* Click modal */}
      {clickedSkill && (
        <div className="absolute inset-0 z-20 flex items-center justify-center" onClick={() => setClickedSkill(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div 
            className="relative z-10 p-8 rounded-3xl border border-white/10 max-w-sm mx-4"
            style={{ background: 'rgba(20,20,20,0.95)', backdropFilter: 'blur(20px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4" style={{ background: techColors[clickedSkill.id]?.main || '#666' }}>
              {techIcons[clickedSkill.id] || clickedSkill.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{clickedSkill.name}</h3>
            <p className="text-white/60 mb-4">{clickedSkill.description}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${clickedSkill.level}%`, background: `linear-gradient(90deg, ${techColors[clickedSkill.id]?.main}, ${techColors[clickedSkill.id]?.glow})` }} />
              </div>
              <span className="text-white/80 text-sm">{clickedSkill.level}%</span>
            </div>
            <button className="mt-6 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 transition-colors" onClick={() => setClickedSkill(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Skills3DCanvas
