"use client"

import { useState, useRef } from "react"
import { AnimatedBackground } from "@/components/animated-background"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { WaitlistForm } from "@/components/waitlist-form"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function Home() {
  const [isWaitlistFormVisible, setIsWaitlistFormVisible] = useState(false)
  const waitlistSectionRef = useRef<HTMLDivElement>(null)

  const handleJoinWaitlist = () => {
    setIsWaitlistFormVisible(true)

    // Use setTimeout to ensure the form is rendered before scrolling
    setTimeout(() => {
      if (waitlistSectionRef.current) {
        waitlistSectionRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen text-white overflow-hidden relative flex flex-col">
      {/* Animated background with logo pattern */}
      <AnimatedBackground />

      {/* Navigation */}
      <Navbar onJoinWaitlist={handleJoinWaitlist} />

      <main>
        {/* Hero Section */}
        <HeroSection onJoinWaitlist={handleJoinWaitlist} />
  
        
        
        {/* Waitlist Form (not a modal) */}
        <div
          id="waitlist-section"
          ref={waitlistSectionRef}
          className="container mx-auto px-4 relative z-10 mt-8 mb-16 scroll-mt-24"
        >
          <WaitlistForm isVisible={isWaitlistFormVisible} />
        </div>

        {/* Illustration section */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-6 text-[#E5C66E]">Revolutionary Platform</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Raba is redefining the future of finance with cutting-edge technology and innovative solutions.
                </p>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#E5C66E]/30 to-[#D4AF37]/30 rounded-2xl"></div>
                  <div className="relative">
                    <Image
                      src="/banner.jpg"
                      alt="Raba Platform Preview"
                      width={500}
                      height={400}
                      className="rounded-xl border border-[#E5C66E]/30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
