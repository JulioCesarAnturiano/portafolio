import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Html } from '@react-three/drei'
import * as THREE from 'three'

const SkillCube3D = ({ skill, position, index }) => {
  const groupRef = useRef()
  const keycapRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Keycap dimensions - rounded like mechanical keyboard
  const keyWidth = 1.6
  const keyDepth = 1.6
  const keyHeight = 0.7
  const baseHeight = 0.4

  // Animation for key press effect
  useFrame((state) => {
    if (keycapRef.current) {
      // Target Y position - press down when hovered
      const targetY = hovered ? -0.25 : 0
      keycapRef.current.position.y = THREE.MathUtils.lerp(
        keycapRef.current.position.y,
        targetY,
        0.12
      )

      // Subtle idle animation
      if (!hovered) {
        const offset = Math.sin(state.clock.elapsedTime * 0.4 + index * 0.2) * 0.015
        keycapRef.current.position.y += offset
      }
    }
  })

  // Parse gradient colors
  const getColorFromGradient = (gradientClass) => {
    const colorMap = {
      'from-orange-500': '#f97316',
      'from-blue-500': '#3b82f6',
      'from-yellow-400': '#facc15',
      'from-blue-600': '#2563eb',
      'from-cyan-400': '#22d3ee',
      'from-teal-400': '#2dd4bf',
      'from-green-500': '#22c55e',
      'from-gray-500': '#6b7280',
      'from-indigo-500': '#6366f1',
      'from-red-500': '#ef4444',
      'from-blue-700': '#1d4ed8',
      'from-orange-600': '#ea580c',
      'from-gray-700': '#374151',
      'from-sky-400': '#38bdf8',
    }
    const colorKey = skill.color.split(' ')[0]
    return colorMap[colorKey] || '#3b82f6'
  }

  const baseColor = getColorFromGradient(skill.color)

  return (
    <group ref={groupRef} position={position}>
      {/* Base/Socket of the key - dark cavity */}
      <RoundedBox
        args={[keyWidth + 0.15, baseHeight, keyDepth + 0.15]}
        radius={0.2}
        smoothness={4}
        position={[0, -baseHeight / 2 - 0.15, 0]}
      >
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.3}
          roughness={0.9}
        />
      </RoundedBox>

      {/* Inner glow when pressed */}
      {hovered && (
        <mesh position={[0, -0.35, 0]}>
          <boxGeometry args={[keyWidth - 0.3, 0.08, keyDepth - 0.3]} />
          <meshBasicMaterial color={baseColor} transparent opacity={0.6} />
        </mesh>
      )}

      {/* Keycap - very rounded like mechanical keyboard */}
      <group ref={keycapRef}>
        {/* Main keycap body */}
        <RoundedBox
          args={[keyWidth, keyHeight, keyDepth]}
          radius={0.25}
          smoothness={4}
          position={[0, keyHeight / 2, 0]}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={(e) => {
            e.stopPropagation()
            setHovered(false)
            setClicked(false)
            document.body.style.cursor = 'default'
          }}
          onClick={(e) => {
            e.stopPropagation()
            setClicked(!clicked)
          }}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={baseColor}
            metalness={0.2}
            roughness={0.3}
            emissive={hovered ? baseColor : '#000000'}
            emissiveIntensity={hovered ? 0.4 : 0}
          />
        </RoundedBox>

        {/* Top surface highlight */}
        <RoundedBox
          args={[keyWidth - 0.2, 0.06, keyDepth - 0.2]}
          radius={0.2}
          smoothness={4}
          position={[0, keyHeight - 0.01, 0]}
        >
          <meshStandardMaterial
            color={baseColor}
            metalness={0.1}
            roughness={0.4}
            emissive={hovered ? baseColor : '#000000'}
            emissiveIntensity={hovered ? 0.5 : 0.1}
          />
        </RoundedBox>

        {/* HTML Label on top of key */}
        <Html
          position={[0, keyHeight + 0.1, 0]}
          center
          distanceFactor={10}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div 
            className="flex flex-col items-center justify-center"
            style={{ 
              width: '60px',
            }}
          >
            <div className="text-2xl">
              {skill.icon}
            </div>
            <div 
              className="text-white text-[9px] font-bold text-center mt-0.5"
              style={{
                textShadow: '0 1px 3px rgba(0,0,0,1)',
                whiteSpace: 'nowrap',
              }}
            >
              {skill.name}
            </div>
          </div>
        </Html>
      </group>

      {/* Info popup when clicked */}
      {clicked && (
        <Html
          position={[0, 2.5, 0]}
          center
          distanceFactor={10}
          style={{
            pointerEvents: 'none',
          }}
        >
          <div 
            className="bg-black/95 backdrop-blur-sm rounded-xl p-3 border shadow-2xl"
            style={{
              borderColor: baseColor,
              boxShadow: `0 0 30px ${baseColor}50`,
              minWidth: '140px',
            }}
          >
            <div className="text-white font-bold text-sm mb-1">{skill.name}</div>
            <div className="text-gray-400 text-xs mb-2">{skill.description}</div>
            <div className="w-full bg-gray-800 rounded-full h-1.5">
              <div 
                className="h-1.5 rounded-full"
                style={{ 
                  width: `${skill.level}%`,
                  backgroundColor: baseColor,
                }}
              />
            </div>
            <div className="text-gray-500 text-[10px] mt-1">{skill.level}%</div>
          </div>
        </Html>
      )}

      {/* Glow light when hovered */}
      {hovered && (
        <pointLight
          position={[0, 1, 0]}
          intensity={2}
          distance={4}
          color={baseColor}
        />
      )}
    </group>
  )
}

export default SkillCube3D
