/**
 * BinaryParticles.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A Three.js-based background layer for the Hero section.
 *
 * Architecture:
 *   • WebGLRenderer  – renders into a full-screen canvas (z-index 1)
 *   • PerspectiveCamera  – orthographic-like, positioned at z=5
 *   • Scene  – holds 40–60 Sprite objects
 *   • Each Sprite uses a CanvasTexture of a single text label
 *     (hex values like "0x7f", "0xff", and RE keywords like "ELF", "ASM")
 *   • Mouse movement shifts the camera slightly for a parallax feel
 *   • Each particle has its own velocity, phase, and fade cycle
 *
 * Kept lightweight:
 *   • No geometry buffers (Sprites are billboarded quads internally)
 *   • Textures are tiny 128×32 canvas bitmaps, generated once at init
 *   • requestAnimationFrame loop cancels on unmount
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ── Token pool ────────────────────────────────────────────────────────────────
const HEX_TOKENS = [
  '0x7f', '0x90', '0xff', '0x41', '0x00', '0xaa',
  '0x0d', '0x1b', '0x4c', '0x7c', '0xde', '0xad',
  '0xbe', '0xef', '0xc0', '0xfe',
]
const RE_TOKENS = ['ELF', 'ASM', 'CFG', 'RIP', 'RBP', 'NOP', 'XOR', 'JMP']
const ALL_TOKENS = [...HEX_TOKENS, ...HEX_TOKENS, ...HEX_TOKENS, ...RE_TOKENS] // hex 3× more common

// ── Neon green palette (varying opacity for depth) ────────────────────────────
const COLORS = [
  '#00FF41', // bright acid green
  '#22c55e', // tailwind green-500
  '#4ade80', // tailwind green-400
  '#00e639', // mid green
]

// ── Build a CanvasTexture for a single text label ─────────────────────────────
function makeTextTexture(text: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 36
  const ctx = canvas.getContext('2d')!

  // Transparent background
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Pick a random green shade
  ctx.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)]
  ctx.font = `500 14px "JetBrains Mono", "Courier New", monospace`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// ── Particle data stored alongside each Sprite ────────────────────────────────
interface ParticleData {
  vx: number   // horizontal velocity
  vy: number   // vertical velocity
  vz: number   // depth drift (subtle)
  phase: number // fade phase offset (0–2π)
  speed: number // individual animation speed
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function BinaryParticles() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth
    const H = mount.clientHeight

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: false,       // not needed for text sprites
      alpha: true,            // transparent background (hero bg shows through)
    })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)   // fully transparent
    mount.appendChild(renderer.domElement)

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene()

    // Perspective camera positioned to view a ±10 unit world
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    camera.position.set(0, 0, 14)

    // ── Spawn particles ───────────────────────────────────────────────────────
    const PARTICLE_COUNT = 50
    const sprites: THREE.Sprite[] = []
    const particleData: ParticleData[] = []

    // Reuse SpriteMaterial per unique label to reduce draw calls
    const materialCache = new Map<string, THREE.SpriteMaterial>()

    function getMaterial(label: string): THREE.SpriteMaterial {
      if (materialCache.has(label)) return materialCache.get(label)!
      const mat = new THREE.SpriteMaterial({
        map: makeTextTexture(label),
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,  // neon glow effect
      })
      materialCache.set(label, mat)
      return mat
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const label = ALL_TOKENS[Math.floor(Math.random() * ALL_TOKENS.length)]
      const sprite = new THREE.Sprite(getMaterial(label).clone()) // clone so opacity is independent

      // Spread across the visible frustum (-12..12 x, -7..7 y, -3..0 z)
      sprite.position.set(
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 4 - 1,
      )

      // Scale: text sprite world size
      const scale = 0.55 + Math.random() * 0.45
      sprite.scale.set(scale * 2.2, scale * 0.65, 1)

      // Start at random opacity
      sprite.material.opacity = Math.random() * 0.25 + 0.05

      scene.add(sprite)
      sprites.push(sprite)

      particleData.push({
        vx: (Math.random() - 0.5) * 0.003,
        vy: (Math.random() - 0.5) * 0.003 + 0.001,  // slight upward drift
        vz: (Math.random() - 0.5) * 0.001,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.5,
      })
    }

    // ── Mouse parallax ────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const cameraTarget = { x: 0, y: 0 }

    const onMouseMove = (e: MouseEvent) => {
      // Normalize to -1..1
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // ── Resize handler ────────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ────────────────────────────────────────────────────────
    let rafId: number
    let t = 0

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      t += 0.016  // ~60fps tick

      // Smooth camera parallax (lerp toward mouse position)
      cameraTarget.x += (mouse.x * 0.6 - cameraTarget.x) * 0.04
      cameraTarget.y += (mouse.y * 0.3 - cameraTarget.y) * 0.04
      camera.position.x = cameraTarget.x
      camera.position.y = cameraTarget.y

      // Update each particle
      sprites.forEach((sprite, i) => {
        const d = particleData[i]
        const pos = sprite.position

        // Drift movement
        pos.x += d.vx
        pos.y += d.vy
        pos.z += d.vz

        // Wrap around world bounds so particles never disappear
        if (pos.x >  13) pos.x = -13
        if (pos.x < -13) pos.x =  13
        if (pos.y >   8) pos.y =  -8
        if (pos.y <  -8) pos.y =   8

        // Pulsing opacity — sine wave, max 0.30 so it stays subtle
        const fade = Math.sin(t * d.speed + d.phase) * 0.5 + 0.5
        sprite.material.opacity = fade * 0.28 + 0.04
      })

      renderer.render(scene, camera)
    }
    animate()

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)

      // Dispose textures and materials
      materialCache.forEach(mat => {
        mat.map?.dispose()
        mat.dispose()
      })
      sprites.forEach(s => s.material.dispose())
      renderer.dispose()

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}   // sits above grid-bg (z:0) but below hero content (z:10)
    />
  )
}
