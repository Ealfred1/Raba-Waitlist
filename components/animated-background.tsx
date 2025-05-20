"use client"

import { useEffect, useRef } from "react"

interface LogoInstance {
  x: number
  y: number
  rotation: number
  scale: number
  skewX: number
  skewY: number
  opacity: number
  // Movement parameters
  speedX: number
  speedY: number
  rotationSpeed: number
  maxDistance: number
  originalX: number
  originalY: number
  movementAngle: number
  movementProgress: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    // Generate random logo instances
    const generateLogos = () => {
      const logoCount = Math.max(20, Math.floor((window.innerWidth * window.innerHeight) / 40000))
      return Array.from({ length: logoCount }, () => {
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight
        return {
          x,
          y,
          rotation: Math.random() * 360,
          scale: 0.1 + Math.random() * 0.3,
          skewX: (Math.random() - 0.5) * 0.3,
          skewY: (Math.random() - 0.5) * 0.3,
          opacity: 0.05 + Math.random() * 0.1,
          // Movement parameters - very slow speeds
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          maxDistance: 20 + Math.random() * 30, // Maximum distance to move from original position
          originalX: x,
          originalY: y,
          movementAngle: Math.random() * Math.PI * 2, // Random angle for circular movement
          movementProgress: Math.random() * Math.PI * 2, // Random starting point in the movement cycle
        }
      })
    }

    let logos = generateLogos()

    // Load the logo image
    const logoImage = new Image()
    logoImage.src = "/raba-logo.png"
    logoImage.crossOrigin = "anonymous"

    // Animation function
    const animate = () => {
      if (!canvas || !ctx || !logoImage.complete) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw dark overlay
      ctx.fillStyle = "rgba(26, 26, 26, 0.95)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw each logo instance
      logos.forEach((logo) => {
        // Update movement progress
        logo.movementProgress += 0.001 // Very slow movement

        // Calculate new position using circular/wave motion
        logo.x = logo.originalX + Math.cos(logo.movementProgress) * logo.maxDistance * Math.cos(logo.movementAngle)
        logo.y = logo.originalY + Math.sin(logo.movementProgress) * logo.maxDistance * Math.sin(logo.movementAngle)

        // Slowly rotate
        logo.rotation += logo.rotationSpeed

        ctx.save()

        // Position and transform
        ctx.translate(logo.x, logo.y)
        ctx.rotate((logo.rotation * Math.PI) / 180)
        ctx.scale(logo.scale, logo.scale)
        ctx.transform(1, logo.skewY, logo.skewX, 1, 0, 0)

        // Set opacity
        ctx.globalAlpha = logo.opacity

        // Draw the logo
        ctx.drawImage(logoImage, -logoImage.width / 2, -logoImage.height / 2)

        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // Initial setup
    resizeCanvas()
    window.addEventListener("resize", () => {
      resizeCanvas()
      logos = generateLogos() // Regenerate logos on resize
    })

    // Start animation when image is loaded
    if (logoImage.complete) {
      animate()
    } else {
      logoImage.onload = animate
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
