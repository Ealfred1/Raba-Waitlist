"use client"

import { useEffect, useRef } from "react"

interface SyrupyTextProps {
  text: string
  className?: string
  highlightWords?: string[]
  highlightColor?: string
}

export function SyrupyText({ text, className = "", highlightWords = [], highlightColor = "#E5C66E" }: SyrupyTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Split text into words
    const words = text.split(" ")
    container.innerHTML = ""

    // Create word spans
    words.forEach((word, i) => {
      const wordSpan = document.createElement("span")
      wordSpan.className = "inline-block relative"

      // Check if this word should be highlighted
      const shouldHighlight = highlightWords.some((hw) => word.toLowerCase().includes(hw.toLowerCase()))

      // Create letter spans for each word
      Array.from(word).forEach((letter, j) => {
        const letterSpan = document.createElement("span")
        letterSpan.textContent = letter
        letterSpan.className = "inline-block transition-transform duration-700"

        if (shouldHighlight) {
          letterSpan.style.color = highlightColor
        }

        // Add syrupy effect with staggered delays
        letterSpan.style.transitionDelay = `${j * 50}ms`
        letterSpan.style.transform = "translateY(0)"

        wordSpan.appendChild(letterSpan)
      })

      container.appendChild(wordSpan)

      // Add space after each word except the last one
      if (i < words.length - 1) {
        const space = document.createTextNode(" ")
        container.appendChild(space)
      }
    })

    // Add hover effect to the container
    const handleMouseEnter = () => {
      const letters = container.querySelectorAll("span > span")
      letters.forEach((letter, i) => {
        const delay = Math.random() * 300
        setTimeout(() => {
          ;(letter as HTMLElement).style.transform = `translateY(${Math.random() * -8}px)`
        }, delay)
      })
    }

    const handleMouseLeave = () => {
      const letters = container.querySelectorAll("span > span")
      letters.forEach((letter, i) => {
        const delay = Math.random() * 300
        setTimeout(() => {
          ;(letter as HTMLElement).style.transform = "translateY(0)"
        }, delay)
      })
    }

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [text, highlightWords, highlightColor])

  return (
    <div ref={containerRef} className={className}>
      {text}
    </div>
  )
}
