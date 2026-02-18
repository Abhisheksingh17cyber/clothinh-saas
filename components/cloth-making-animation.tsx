"use client"

import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
  oldX: number
  oldY: number
  pinned: boolean
}

interface Stick {
  p0: number
  p1: number
  length: number
}

export function ClothMakingAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })
  const pointsRef = useRef<Point[]>([])
  const sticksRef = useRef<Stick[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initCloth()
    }

    const cols = 30
    const rows = 20
    const spacing = 18

    function initCloth() {
      const points: Point[] = []
      const sticks: Stick[] = []

      const startX = (canvas!.width - cols * spacing) / 2
      const startY = 80

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = startX + x * spacing
          const py = startY + y * spacing
          points.push({
            x: px,
            y: py,
            oldX: px,
            oldY: py,
            pinned: y === 0 && x % 3 === 0,
          })
        }
      }

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x
          if (x < cols - 1) {
            sticks.push({
              p0: i,
              p1: i + 1,
              length: spacing,
            })
          }
          if (y < rows - 1) {
            sticks.push({
              p0: i,
              p1: i + cols,
              length: spacing,
            })
          }
        }
      }

      pointsRef.current = points
      sticksRef.current = sticks
    }

    function updatePoints() {
      const gravity = 0.3
      const friction = 0.98
      const mouseRadius = 60
      const points = pointsRef.current

      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        if (p.pinned) continue

        const vx = (p.x - p.oldX) * friction
        const vy = (p.y - p.oldY) * friction

        p.oldX = p.x
        p.oldY = p.y
        p.x += vx
        p.y += vy + gravity

        // Mouse interaction
        if (mouseRef.current.isDown) {
          const dx = p.x - mouseRef.current.x
          const dy = p.y - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius
            p.x += dx * force * 0.1
            p.y += dy * force * 0.1
          }
        }

        // Wind effect
        const time = Date.now() * 0.001
        p.x += Math.sin(time + p.y * 0.02) * 0.3
      }
    }

    function constrainSticks() {
      const sticks = sticksRef.current
      const points = pointsRef.current

      for (let iter = 0; iter < 3; iter++) {
        for (let i = 0; i < sticks.length; i++) {
          const s = sticks[i]
          const p0 = points[s.p0]
          const p1 = points[s.p1]

          const dx = p1.x - p0.x
          const dy = p1.y - p0.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const diff = (s.length - dist) / dist * 0.5

          const offsetX = dx * diff
          const offsetY = dy * diff

          if (!p0.pinned) {
            p0.x -= offsetX
            p0.y -= offsetY
          }
          if (!p1.pinned) {
            p1.x += offsetX
            p1.y += offsetY
          }
        }
      }
    }

    function drawCloth() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const points = pointsRef.current
      const sticks = sticksRef.current

      // Draw fabric mesh
      for (let i = 0; i < sticks.length; i++) {
        const s = sticks[i]
        const p0 = points[s.p0]
        const p1 = points[s.p1]

        const stress = Math.abs(
          Math.sqrt((p1.x - p0.x) ** 2 + (p1.y - p0.y) ** 2) - s.length
        )

        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.strokeStyle = `rgba(196, 168, 130, ${Math.max(0.03, 0.12 - stress * 0.01)})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw needle & thread animation
      const time = Date.now() * 0.0008
      const needleX = canvas.width * 0.3 + Math.sin(time) * 200
      const needleY = canvas.height * 0.4 + Math.cos(time * 1.3) * 100

      // Thread trail
      ctx.beginPath()
      ctx.moveTo(needleX - 100, needleY + 50)
      for (let i = 0; i < 8; i++) {
        const t = i / 8
        const cx = needleX - 100 + t * 200
        const cy = needleY + 50 + Math.sin(t * Math.PI * 4 + time * 2) * 15
        ctx.lineTo(cx, cy)
      }
      ctx.strokeStyle = "rgba(196, 168, 130, 0.15)"
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Needle
      ctx.save()
      ctx.translate(needleX, needleY)
      ctx.rotate(Math.sin(time) * 0.3 + Math.PI / 4)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(12, -12)
      ctx.strokeStyle = "rgba(196, 168, 130, 0.25)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Needle eye
      ctx.beginPath()
      ctx.arc(0, 0, 1.5, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(196, 168, 130, 0.3)"
      ctx.fill()
      ctx.restore()

      // Second needle on right side
      const needle2X = canvas.width * 0.7 + Math.cos(time * 0.7) * 150
      const needle2Y = canvas.height * 0.6 + Math.sin(time * 1.1) * 80

      ctx.beginPath()
      ctx.moveTo(needle2X - 80, needle2Y + 30)
      for (let i = 0; i < 6; i++) {
        const t = i / 6
        const cx = needle2X - 80 + t * 160
        const cy = needle2Y + 30 + Math.sin(t * Math.PI * 3 + time * 1.5) * 12
        ctx.lineTo(cx, cy)
      }
      ctx.strokeStyle = "rgba(196, 168, 130, 0.1)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Spinning spool decoration
      const spoolX = canvas.width * 0.15
      const spoolY = canvas.height * 0.7
      ctx.save()
      ctx.translate(spoolX, spoolY)
      ctx.rotate(time * 2)
      ctx.beginPath()
      ctx.arc(0, 0, 20, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(196, 168, 130, 0.08)"
      ctx.lineWidth = 3
      ctx.stroke()
      for (let i = 0; i < 6; i++) {
        ctx.beginPath()
        ctx.moveTo(0, 0)
        const angle = (i / 6) * Math.PI * 2
        ctx.lineTo(Math.cos(angle) * 15, Math.sin(angle) * 15)
        ctx.strokeStyle = "rgba(196, 168, 130, 0.06)"
        ctx.lineWidth = 1
        ctx.stroke()
      }
      ctx.restore()

      // Second spool
      const spool2X = canvas.width * 0.85
      const spool2Y = canvas.height * 0.3
      ctx.save()
      ctx.translate(spool2X, spool2Y)
      ctx.rotate(-time * 1.5)
      ctx.beginPath()
      ctx.arc(0, 0, 15, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(196, 168, 130, 0.06)"
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.restore()

      // Floating thread particles
      for (let i = 0; i < 12; i++) {
        const px = (canvas.width * ((i * 0.13 + Math.sin(time * 0.5 + i)) % 1))
        const py = (canvas.height * ((i * 0.11 + Math.cos(time * 0.3 + i * 2)) % 1))
        ctx.beginPath()
        ctx.arc(px, py, 1, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(196, 168, 130, 0.1)"
        ctx.fill()
      }
    }

    function animate() {
      updatePoints()
      constrainSticks()
      drawCloth()
      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleMouseDown = () => {
      mouseRef.current.isDown = true
    }

    const handleMouseUp = () => {
      mouseRef.current.isDown = false
    }

    window.addEventListener("resize", resizeCanvas)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mouseup", handleMouseUp)

    resizeCanvas()
    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto z-0"
      aria-hidden="true"
    />
  )
}
