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
  // Type (0: Raba logo, 1: Solana, 2: Tether)
  type: number
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
      const logoCount = Math.max(15, Math.floor((window.innerWidth * window.innerHeight) / 60000))
      const solanaCount = Math.max(5, Math.floor(logoCount / 4))
      const tetherCount = Math.max(5, Math.floor(logoCount / 4))
      const rabaCount = logoCount - solanaCount - tetherCount

      const logos: LogoInstance[] = []

      // Add Raba logos
      for (let i = 0; i < rabaCount; i++) {
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight
        logos.push({
          x,
          y,
          rotation: Math.random() * 360,
          scale: 0.1 + Math.random() * 0.2,
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
          type: 0, // Raba logo
        })
      }

      // Add Solana logos
      for (let i = 0; i < solanaCount; i++) {
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight
        logos.push({
          x,
          y,
          rotation: Math.random() * 360,
          scale: 0.15 + Math.random() * 0.25,
          skewX: (Math.random() - 0.5) * 0.2,
          skewY: (Math.random() - 0.5) * 0.2,
          opacity: 0.1 + Math.random() * 0.15,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          maxDistance: 30 + Math.random() * 40,
          originalX: x,
          originalY: y,
          movementAngle: Math.random() * Math.PI * 2,
          movementProgress: Math.random() * Math.PI * 2,
          type: 1, // Solana logo
        })
      }

      // Add Tether logos
      for (let i = 0; i < tetherCount; i++) {
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight
        logos.push({
          x,
          y,
          rotation: Math.random() * 360,
          scale: 0.15 + Math.random() * 0.25,
          skewX: (Math.random() - 0.5) * 0.2,
          skewY: (Math.random() - 0.5) * 0.2,
          opacity: 0.1 + Math.random() * 0.15,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          maxDistance: 30 + Math.random() * 40,
          originalX: x,
          originalY: y,
          movementAngle: Math.random() * Math.PI * 2,
          movementProgress: Math.random() * Math.PI * 2,
          type: 2, // Tether logo
        })
      }

      return logos
    }

    let logos = generateLogos()

    // Load the logo images
    const rabaLogo = new window.Image()
    rabaLogo.src = "/raba-logo.png"
    rabaLogo.crossOrigin = "anonymous"

    const solanaLogo = new window.Image()
    solanaLogo.src = "/solana-icon.svg"
    solanaLogo.crossOrigin = "anonymous"

    const tetherLogo = new window.Image()
    tetherLogo.src = "/tether-icon.svg"
    tetherLogo.crossOrigin = "anonymous"

    // Function to draw logos
    function drawLogos() {
      if (!canvas || !ctx) return

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

        // Draw the appropriate logo based on type
        try {
          if (logo.type === 0 && rabaLogo.complete) {
            ctx.drawImage(rabaLogo, -rabaLogo.width / 2, -rabaLogo.height / 2)
          } else if (logo.type === 1 && solanaLogo.complete) {
            ctx.drawImage(solanaLogo, -solanaLogo.width / 2, -solanaLogo.height / 2)
          } else if (logo.type === 2 && tetherLogo.complete) {
            ctx.drawImage(tetherLogo, -tetherLogo.width / 2, -tetherLogo.height / 2)
          }
        } catch (error) {
          console.error("Error drawing image:", error)
        }

        ctx.restore()
      })
    }

    // Animation function
    const animate = () => {
      try {
        drawLogos()
        animationRef.current = requestAnimationFrame(animate)
      } catch (error) {
        console.error("Animation error:", error)
      }
    }

    // Handle resize
    const handleResize = () => {
      try {
        resizeCanvas()
        logos = generateLogos() // Regenerate logos on resize
      } catch (error) {
        console.error("Resize error:", error)
      }
    }

    // Initial setup
    resizeCanvas()
    window.addEventListener("resize", handleResize)

    // Start animation when images are loaded
    const checkImagesAndStart = () => {
      if (rabaLogo.complete && solanaLogo.complete && tetherLogo.complete) {
        animate()
      } else {
        // Set onload handlers
        const startIfAllLoaded = () => {
          if (rabaLogo.complete && solanaLogo.complete && tetherLogo.complete) {
            animate()
          }
        }

        if (!rabaLogo.complete) rabaLogo.onload = startIfAllLoaded
        if (!solanaLogo.complete) solanaLogo.onload = startIfAllLoaded
        if (!tetherLogo.complete) tetherLogo.onload = startIfAllLoaded

        // Fallback in case images don't load
        setTimeout(() => {
          animate()
        }, 2000)
      }
    }

    checkImagesAndStart()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
