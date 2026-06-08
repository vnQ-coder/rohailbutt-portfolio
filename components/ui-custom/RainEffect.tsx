'use client'

import { useEffect, useRef } from 'react'

const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ'
const FONT_SIZE = 14
const FADE_FILL = 'rgba(6, 12, 10, 0.07)'
const LEAD_COLOR = 'rgba(220, 255, 240, 1)'
const CANVAS_OPACITY = 0.22

interface Drop {
  y: number
  speed: number
}

function randomSpeed(): number {
  return 0.3 + Math.random() * 0.7
}

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

function initDrops(colCount: number, existing?: Drop[]): Drop[] {
  const drops: Drop[] = []
  for (let i = 0; i < colCount; i++) {
    if (existing && i < existing.length) {
      drops.push(existing[i])
    } else {
      drops.push({
        y: -(Math.random() * 100),
        speed: randomSpeed(),
      })
    }
  }
  return drops
}

export function RainEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let colCount = Math.floor(width / FONT_SIZE)
    let drops: Drop[] = initDrops(colCount)
    let rafId = 0
    let paused = false

    canvas.width = width
    canvas.height = height

    function draw() {
      ctx!.fillStyle = FADE_FILL
      ctx!.fillRect(0, 0, width, height)

      ctx!.font = `${FONT_SIZE}px monospace`
      ctx!.fillStyle = LEAD_COLOR

      for (let col = 0; col < drops.length; col++) {
        const drop = drops[col]
        const x = col * FONT_SIZE
        const y = drop.y * FONT_SIZE

        ctx!.fillText(randomChar(), x, y)

        drop.y += drop.speed

        if (y > height) {
          drop.y = -(Math.random() * 100)
          drop.speed = randomSpeed()
        }
      }
    }

    function loop() {
      if (!paused) {
        draw()
      }
      rafId = requestAnimationFrame(loop)
    }

    function onResize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas!.width = width
      canvas!.height = height
      const newColCount = Math.floor(width / FONT_SIZE)
      drops = initDrops(newColCount, drops)
      colCount = newColCount
    }

    function onVisibilityChange() {
      paused = document.visibilityState === 'hidden'
    }

    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)

    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100vw',
        height: '100vh',
        opacity: CANVAS_OPACITY,
      }}
    />
  )
}
