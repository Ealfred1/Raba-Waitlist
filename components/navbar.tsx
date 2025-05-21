"use client"

import Image from "next/image"

export function Navbar({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  const handleJoinWaitlist = () => {
    onJoinWaitlist()

    // Scroll to waitlist section
    const waitlistSection = document.getElementById("waitlist-section")
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#222222]/80 backdrop-blur-lg rounded-full border border-[#E5C66E]/30 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className="rounded-full overflow-hidden w-10 h-10 mr-2">
              <Image src="/logo.png" alt="Raba Logo" width={40} height={40} className="w-full h-full" />
            </div>
            <span className="text-[#E5C66E] font-bold text-xl">Raba</span>
          </div>

          <button
            onClick={handleJoinWaitlist}
            className="bg-gradient-to-r from-[#E5C66E] to-[#D4AF37] text-[#222222] font-bold rounded-full px-6 py-2 hover:opacity-90 transition-all"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </div>
  )
}
