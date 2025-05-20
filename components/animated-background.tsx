"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
        drawLogos() // Redraw logos after resize
      }
    }

    // Generate random logo instances
    const logoCount = Math.max(20, Math.floor((window.innerWidth * window.innerHeight) / 40000)) // Ensure minimum count
    const logos = Array.from({ length: logoCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      rotation: Math.random() * 360,
      scale: 0.1 + Math.random() * 0.3,
      skewX: (Math.random() - 0.5) * 0.3,
      skewY: (Math.random() - 0.5) * 0.3,
      opacity: 0.05 + Math.random() * 0.1,
    }))

    // Load the logo image
    const logoImage = new Image()
    logoImage.src = "/raba-logo.png"
    logoImage.crossOrigin = "anonymous"

    // Function to draw logos
    function drawLogos() {
      if (!canvas || !ctx || !logoImage.complete) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw dark overlay
      ctx.fillStyle = "rgba(26, 26, 26, 0.95)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw each logo instance
      logos.forEach((logo) => {
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
    }

    // Initial setup
    resizeCanvas()

    // Add event listener for resize
    window.addEventListener("resize", resizeCanvas)

    // Draw when image is loaded
    if (logoImage.complete) {
      drawLogos()
    } else {
      logoImage.onload = drawLogos
    }

    // Animation frame is not needed since we're not animating

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
