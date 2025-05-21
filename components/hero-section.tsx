"use client"

import { SyrupyText } from "./syrupy-text"
import Image from "next/image"

interface HeroSectionProps {
  onJoinWaitlist: () => void
}

export function HeroSection({ onJoinWaitlist }: HeroSectionProps) {
  const handleJoinWaitlist = () => {
    onJoinWaitlist()

    // Scroll to waitlist section
    const waitlistSection = document.getElementById("waitlist-section")
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative min-h-screen pt-24 pb-16 flex flex-col justify-center">
      {/* Floating crypto icons - more spread out */}
      <div className="absolute top-[15%] left-[5%] w-24 h-24 md:w-32 md:h-32 animate-float-slow">
        <Image src="/img1.svg" alt="Solana" width={128} height={128} className="w-full h-full" />
      </div>

      <div className="absolute bottom-[20%] right-[5%] w-24 h-24 md:w-32 md:h-32 animate-float">
        <Image src="/img2.svg" alt="Tether" width={128} height={128} className="w-full h-full" />
      </div>

      <div className="absolute top-[60%] left-[20%] w-20 h-20 md:w-28 md:h-28 animate-float-reverse">
        <Image src="/img3.svg" alt="PayPal" width={112} height={112} className="w-full h-full" />
      </div>

      <div className="absolute top-[15%] right-[5%] w-24 h-24 md:w-32 md:h-32 animate-float-slow">
        <Image src="/img4.svg" alt="PayPal" width={112} height={112} className="w-full h-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <SyrupyText
              text="The Ultimate Save And Pay By Crypto"
              highlightWords={["Save", "And", "Pay"]}
              className="leading-tight"
            />
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Save smarter, grow faster, and pay seamlessly with crypto using QR codes. Raba empowers you with
            cutting-edge crypto solutions.
          </p>

          <button
            onClick={handleJoinWaitlist}
            className="bg-gradient-to-r from-[#E5C66E] to-[#D4AF37] text-[#222222] font-bold rounded-full px-8 py-4 text-lg hover:opacity-90 transition-all"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </div>
  )
}
