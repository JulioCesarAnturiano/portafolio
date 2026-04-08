import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, Html } from '@react-three/drei'
import { Suspense, useRef, useMemo, useState, useCallback, useEffect } from 'react'
import * as THREE from 'three'

// ============================================
// CONFIGURATION - Technology colors and icons
// ============================================
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
  github: { main: '#181717', dark: '#0d0d0d', glow: '#4a5560' },
  docker: { main: '#2496ed', dark: '#1a75c2', glow: '#52b0ff' },
  flutter: { main: '#02569b', dark: '#01406f', glow: '#3a8fd4' },
}

const techIcons = {
  html: 'HTML', css: 'CSS', javascript: 'JS', typescript: 'TS',
  react: '⚛', tailwind: '🌊', nodejs: 'Node', express: 'Ex',
  php: 'PHP', laravel: 'L', postgresql: 'PG', mysql: 'SQL',
  git: 'Git', github: '🐙', docker: '🐳', flutter: 'F',
}

// ============================================
// KEYBOARD STATES PER SECTION
// ============================================
const keyboardStates = {
  hero: {
    position: [4.5, 0.5, 0],
    rotation: [0.5, -0.4, 0.1],
    scale: 0.75,
  },
  skills: {
    // Fixed, stable presentation position - centered and slightly tilted for showcase
    position: [0, -0.3, 0],
    rotation: [0.5, 0.12, 0],
    scale: 1.05,
  },
  projects: {
    position: [-4, -0.5, 1],
    rotation: [0.4, 0.5, -0.05],
    scale: 0.6,
  },
  about: {
    position: [4, -1, 2],
    rotation: [0.35, -0.35, 0.05],
    scale: 0.55,
  },
  contact: {
    position: [3.5, 0.5, 1],
    rotation: [0.45, -0.3, 0],
    scale: 0.6,
  },
}

// ============================================
// SINGLE KEYCAP COMPONENT - Uniform DSA/XDA Style (like reference)
// ============================================
const Keycap = ({ skill, localPosition, isInteractive, onHover, onUnhover, onClick, mousePosition }) => {
  const groupRef = useRef()
  const glowRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  const anim = useRef({
    y: 0, targetY: 0,
    scale: 1, targetScale: 1,
    glow: 0, targetGlow: 0,
    pressProgress: 0,
  })

  const idleParams = useMemo(() => ({
    floatSpeed: 0.4 + Math.random() * 0.3,
    floatAmplitude: 0.006 + Math.random() * 0.004,
    floatOffset: Math.random() * Math.PI * 2,
  }), [])

  const colors = techColors[skill.id] || { main: '#666', dark: '#444', glow: '#888' }
  const icon = techIcons[skill.id] || skill.icon

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.elapsedTime
    const a = anim.current

    // Subtle idle float
    const idleY = Math.sin(time * idleParams.floatSpeed + idleParams.floatOffset) * idleParams.floatAmplitude

    // Hover targets
    if (hovered && isInteractive) {
      a.targetY = 0.1
      a.targetScale = 1.05
      a.targetGlow = 1
    } else {
      a.targetY = 0
      a.targetScale = 1
      a.targetGlow = 0
    }

    // Press animation
    if (pressed) {
      a.pressProgress = THREE.MathUtils.lerp(a.pressProgress, 1, 0.4)
    } else {
      a.pressProgress = THREE.MathUtils.lerp(a.pressProgress, 0, 0.15)
    }
    const pressOffset = Math.sin(a.pressProgress * Math.PI) * -0.08

    // Smooth lerp
    a.y = THREE.MathUtils.lerp(a.y, a.targetY, 0.08)
    a.scale = THREE.MathUtils.lerp(a.scale, a.targetScale, 0.1)
    a.glow = THREE.MathUtils.lerp(a.glow, a.targetGlow, 0.12)

    // Apply
    groupRef.current.position.y = localPosition[1] + a.y + idleY + pressOffset
    groupRef.current.scale.setScalar(a.scale)

    if (glowRef.current) {
      glowRef.current.emissiveIntensity = 0.03 + a.glow * 0.4
    }
  })

  const handlePointerOver = useCallback((e) => {
    if (!isInteractive) return
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
    onHover?.(skill)
  }, [skill, onHover, isInteractive])

  const handlePointerOut = useCallback((e) => {
    e.stopPropagation()
    setHovered(false)
    setPressed(false)
    document.body.style.cursor = 'default'
    onUnhover?.()
  }, [onUnhover])

  const handlePointerDown = useCallback((e) => {
    if (!isInteractive) return
    e.stopPropagation()
    setPressed(true)
  }, [isInteractive])

  const handlePointerUp = useCallback((e) => {
    e.stopPropagation()
    setPressed(false)
  }, [])

  const handleClick = useCallback((e) => {
    if (!isInteractive) return
    e.stopPropagation()
    onClick?.(skill)
  }, [skill, onClick, isInteractive])

  return (
    <group ref={groupRef} position={localPosition}>
      {/* Hit area */}
      {isInteractive && (
        <mesh
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onClick={handleClick}
        >
          <boxGeometry args={[0.68, 0.5, 0.68]} />
          <meshBasicMaterial visible={false} />
        </mesh>
      )}

      {/* Keycap - simple rounded cube */}
      <RoundedBox 
        args={[0.65, 0.4, 0.65]} 
        radius={0.1} 
        smoothness={5} 
        position={[0, 0, 0]} 
        castShadow
      >
        <meshStandardMaterial 
          ref={glowRef}
          color={colors.main} 
          roughness={0.4} 
          metalness={0.08}
          emissive={colors.glow}
          emissiveIntensity={0.02}
        />
      </RoundedBox>

      {/* Concave dish on top - subtle rounded depression */}
      <mesh position={[0, 0.18, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.22, 20, 20, 0, Math.PI * 2, 0, Math.PI / 3]} />
        <meshStandardMaterial 
          color={colors.dark} 
          roughness={0.3} 
          metalness={0.1}
        />
      </mesh>

      {/* Icon label */}
      <Html
        position={[0, 0.32, 0]}
        center
        distanceFactor={6}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
        zIndexRange={[0, 0]}
      >
        <div style={{
          fontSize: icon.length > 2 ? '8px' : '11px',
          fontWeight: '700',
          color: '#fff',
          textShadow: `0 1px 6px ${colors.glow}`,
          opacity: 0.9,
          pointerEvents: 'none',
          fontFamily: 'system-ui, sans-serif',
        }}>
          {icon}
        </div>
      </Html>

      {/* Hover light */}
      {isInteractive && (
        <pointLight
          position={[0, 0.5, 0]}
          intensity={hovered ? 0.3 : 0}
          distance={1.2}
          color={colors.glow}
          decay={2}
        />
      )}
    </group>
  )
}

// ============================================
// KEYBOARD BASE - Minimal tight fit
// ============================================
const KeyboardBase = ({ width, depth }) => {
  const pad = 0.12  // Margen mínimo
  const caseW = width + pad
  const caseD = depth + pad
  const caseH = 0.32
  
  return (
    <group position={[0, -0.1, 0]}>
      {/* Case body */}
      <RoundedBox 
        args={[caseW, caseH, caseD]} 
        radius={0.1} 
        smoothness={4} 
        receiveShadow 
        castShadow
      >
        <meshStandardMaterial color="#0f0f0f" roughness={0.45} metalness={0.12} />
      </RoundedBox>

      {/* Key plate recess */}
      <RoundedBox 
        args={[caseW - 0.08, 0.08, caseD - 0.08]} 
        radius={0.06} 
        smoothness={3} 
        position={[0, caseH / 2 + 0.01, 0]}
      >
        <meshStandardMaterial color="#080808" roughness={0.9} metalness={0.05} />
      </RoundedBox>
    </group>
  )
}

// ============================================
// COMPLETE KEYBOARD ASSEMBLY
// ============================================
const SkillKeyboard = ({ skills, activeSection, onSkillHover, onSkillUnhover, onSkillClick }) => {
  const keyboardRef = useRef()
  const hasReachedSkills = useRef(false)
  const targetRef = useRef({
    position: new THREE.Vector3(...keyboardStates.hero.position),
    rotation: new THREE.Euler(...keyboardStates.hero.rotation),
    scale: keyboardStates.hero.scale,
  })

  // Calculate keyboard layout - organized grid like a real macropad
  const { keyPositions, dimensions } = useMemo(() => {
    const positions = []
    // Compact macropad layout - tight grid
    const rowConfigs = [
      { keys: 6, offsetX: 0 },      // Row 1
      { keys: 6, offsetX: 0 },      // Row 2
      { keys: 6, offsetX: 0 },      // Row 3
      { keys: 6, offsetX: 0 },      // Row 4
    ]
    const spacingX = 0.75  // Tight spacing
    const spacingZ = 0.75
    let skillIndex = 0

    // Calculate actual rows needed based on skills count
    const totalSkills = skills.length
    const keysPerRow = 4
    const actualRows = Math.ceil(totalSkills / keysPerRow)
    
    // Center offset for Z axis
    const centerOffsetZ = -(actualRows - 1) * spacingZ / 2

    for (let row = 0; row < actualRows && skillIndex < skills.length; row++) {
      const cols = Math.min(keysPerRow, skills.length - skillIndex)
      const startX = -(cols - 1) * spacingX / 2

      for (let col = 0; col < cols && skillIndex < skills.length; col++) {
        positions.push({
          skill: skills[skillIndex],
          position: [startX + col * spacingX, 0, centerOffsetZ + row * spacingZ],
        })
        skillIndex++
      }
    }

    // Calculate exact dimensions based on actual layout
    const maxCols = Math.min(keysPerRow, skills.length)
    const actualWidth = (maxCols - 1) * spacingX + 0.68  // width of keys
    const actualDepth = (actualRows - 1) * spacingZ + 0.68  // depth of keys

    return {
      keyPositions: positions,
      dimensions: { width: actualWidth, depth: actualDepth }
    }
  }, [skills])

  // Update target state based on active section
  useEffect(() => {
    const state = keyboardStates[activeSection] || keyboardStates.hero
    targetRef.current.position.set(...state.position)
    targetRef.current.rotation.set(...state.rotation)
    targetRef.current.scale = state.scale
    
    // Track if we've entered skills section
    if (activeSection === 'skills') {
      hasReachedSkills.current = true
    } else {
      hasReachedSkills.current = false
    }
  }, [activeSection])

  // Animate keyboard to target state
  useFrame((state) => {
    if (!keyboardRef.current) return

    const time = state.clock.elapsedTime
    const target = targetRef.current
    const lerpSpeed = 0.025
    const isSkillsSection = activeSection === 'skills'

    // Position lerp
    keyboardRef.current.position.x = THREE.MathUtils.lerp(keyboardRef.current.position.x, target.position.x, lerpSpeed)
    keyboardRef.current.position.y = THREE.MathUtils.lerp(keyboardRef.current.position.y, target.position.y, lerpSpeed)
    keyboardRef.current.position.z = THREE.MathUtils.lerp(keyboardRef.current.position.z, target.position.z, lerpSpeed)

    // Rotation lerp
    keyboardRef.current.rotation.x = THREE.MathUtils.lerp(keyboardRef.current.rotation.x, target.rotation.x, lerpSpeed)
    keyboardRef.current.rotation.y = THREE.MathUtils.lerp(keyboardRef.current.rotation.y, target.rotation.y, lerpSpeed)
    keyboardRef.current.rotation.z = THREE.MathUtils.lerp(keyboardRef.current.rotation.z, target.rotation.z, lerpSpeed)

    // Scale lerp
    const currentScale = keyboardRef.current.scale.x
    const newScale = THREE.MathUtils.lerp(currentScale, target.scale, lerpSpeed)
    keyboardRef.current.scale.setScalar(newScale)

    // Idle floating animation - DISABLED in Skills section for stability
    if (!isSkillsSection) {
      const idleY = Math.sin(time * 0.3) * 0.03 + Math.cos(time * 0.2) * 0.02
      const idleRotX = Math.sin(time * 0.15) * 0.008
      const idleRotZ = Math.cos(time * 0.12) * 0.005

      keyboardRef.current.position.y += idleY
      keyboardRef.current.rotation.x += idleRotX
      keyboardRef.current.rotation.z += idleRotZ
    } else {
      // In Skills: only very subtle breathing effect (almost imperceptible)
      const subtleBreath = Math.sin(time * 0.4) * 0.003
      keyboardRef.current.position.y += subtleBreath
    }
  })

  const isInteractive = activeSection === 'skills'

  return (
    <group ref={keyboardRef} position={keyboardStates.hero.position}>
      {/* Keyboard case */}
      <KeyboardBase width={dimensions.width} depth={dimensions.depth} />

      {/* All keycaps - positioned inside the case */}
      <group position={[0, 0.12, 0]}>
        {keyPositions.map(({ skill, position }, index) => (
          <Keycap
            key={skill.id}
            skill={skill}
            localPosition={position}
            isInteractive={isInteractive}
            onHover={onSkillHover}
            onUnhover={onSkillUnhover}
            onClick={onSkillClick}
          />
        ))}
      </group>

      {/* Subtle ambient lighting */}
      <pointLight position={[0, 0.6, 0]} intensity={0.06} distance={2.5} color="#2a2a4a" decay={2} />
    </group>
  )
}

// ============================================
// CAMERA RIG WITH PARALLAX
// ============================================
const CameraRig = ({ children, activeSection }) => {
  const groupRef = useRef()
  const { mouse } = useThree()
  const smoothMouse = useRef({ x: 0, y: 0 })

  // Adjust parallax intensity based on section
  const parallaxIntensity = activeSection === 'skills' ? 0.08 : 0.04

  useFrame(() => {
    if (!groupRef.current) return

    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mouse.x, 0.02)
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, mouse.y, 0.02)

    groupRef.current.rotation.y = smoothMouse.current.x * parallaxIntensity
    groupRef.current.rotation.x = smoothMouse.current.y * (parallaxIntensity * 0.5)
  })

  return <group ref={groupRef}>{children}</group>
}

// ============================================
// MAIN SCENE
// ============================================
const KeyboardScene = ({ skills, activeSection, onSkillHover, onSkillUnhover, onSkillClick }) => {
  return (
    <>
      {/* Lighting setup - optimized for depth and premium look */}
      <ambientLight intensity={0.25} />
      
      {/* Main key light - creates primary shadows */}
      <directionalLight
        position={[-5, 10, 6]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0005}
      />
      
      {/* Fill light - softer, from opposite side */}
      <directionalLight position={[6, 5, -4]} intensity={0.35} color="#a8c8ff" />
      
      {/* Rim light - highlights edges */}
      <directionalLight position={[-3, 3, -8]} intensity={0.25} color="#ffd8b0" />
      
      {/* Top down fill for keycaps */}
      <pointLight position={[0, 6, 2]} intensity={0.3} distance={12} color="#ffffff" decay={2} />
      
      {/* Subtle colored accents */}
      <pointLight position={[-5, 2, 4]} intensity={0.15} distance={8} color="#4a6a9a" decay={2} />
      <pointLight position={[5, 2, 4]} intensity={0.15} distance={8} color="#6a4a8a" decay={2} />

      {/* Main keyboard with parallax wrapper */}
      <CameraRig activeSection={activeSection}>
        <SkillKeyboard
          skills={skills}
          activeSection={activeSection}
          onSkillHover={onSkillHover}
          onSkillUnhover={onSkillUnhover}
          onSkillClick={onSkillClick}
        />
      </CameraRig>

      {/* Floor shadow receiver */}
      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
    </>
  )
}

// ============================================
// LOADER
// ============================================
const Loader = () => (
  <Html center>
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
      <p className="text-white/50 text-sm font-light tracking-wide">Cargando teclado...</p>
    </div>
  </Html>
)

// ============================================
// MAIN EXPORTED COMPONENT
// ============================================
const PersistentKeyboard = ({ skills, activeSection }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [clickedSkill, setClickedSkill] = useState(null)

  if (!skills || skills.length === 0) return null

  return (
    <div className="fixed inset-0" style={{ zIndex: 1 }}>
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, #0a0a1a 0%, #000000 50%, #000000 100%)',
        }}
      />

      {/* Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 5, 14], fov: 35 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        style={{ touchAction: 'none' }}
        eventSource={document.documentElement}
        eventPrefix="client"
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 15, 35]} />
        <Suspense fallback={<Loader />}>
          <KeyboardScene
            skills={skills}
            activeSection={activeSection}
            onSkillHover={setHoveredSkill}
            onSkillUnhover={() => setHoveredSkill(null)}
            onSkillClick={setClickedSkill}
          />
        </Suspense>
      </Canvas>

      {/* Skill info tooltip - only in skills section */}
      {activeSection === 'skills' && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div
            className="px-6 py-3 rounded-2xl border border-white/10"
            style={{ background: 'rgba(10,10,20,0.8)', backdropFilter: 'blur(16px)' }}
          >
            <p className="text-white/60 text-sm font-light text-center">
              {hoveredSkill ? (
                <span className="text-white/90">
                  {hoveredSkill.name}
                  <span className="text-white/40 ml-2">— {hoveredSkill.description}</span>
                </span>
              ) : (
                'Haz hover sobre las teclas • Click para más info'
              )}
            </p>
          </div>
        </div>
      )}

      {/* Click modal */}
      {clickedSkill && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center"
          onClick={() => setClickedSkill(null)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative z-10 p-8 rounded-3xl border border-white/10 max-w-sm mx-4"
            style={{ background: 'rgba(15,15,25,0.95)', backdropFilter: 'blur(20px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
              style={{ background: techColors[clickedSkill.id]?.main || '#666' }}
            >
              {techIcons[clickedSkill.id] || clickedSkill.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{clickedSkill.name}</h3>
            <p className="text-white/60 mb-4">{clickedSkill.description}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${clickedSkill.level}%`,
                    background: `linear-gradient(90deg, ${techColors[clickedSkill.id]?.main}, ${techColors[clickedSkill.id]?.glow})`,
                  }}
                />
              </div>
              <span className="text-white/80 text-sm">{clickedSkill.level}%</span>
            </div>
            <button
              className="mt-6 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
              onClick={() => setClickedSkill(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PersistentKeyboard
