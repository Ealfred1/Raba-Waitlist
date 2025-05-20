import { WaitlistForm } from "@/components/waitlist-form"
import { Logo } from "@/components/logo"
import { AnimatedBackground } from "@/components/animated-background"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen text-white overflow-hidden relative">
      {/* Animated background with logo pattern */}
      <AnimatedBackground />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <header className="flex justify-center mb-16">
          <Logo className="w-32 h-32 md:w-40 md:h-40" />
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#E5C66E] to-[#D4AF37] leading-tight">
              The Future of Finance
            </h1>
            <div className="inline-block relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E5C66E] to-[#D4AF37] rounded-lg blur opacity-30"></div>
              <p className="relative text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto px-6 py-2">
                Be the first to experience Raba
              </p>
            </div>
          </div>

          <div className="relative z-10 mb-16">
            <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-r from-[#E5C66E]/30 via-[#D4AF37]/20 to-[#E5C66E]/30 rounded-2xl blur-lg"></div>
            <div className="relative bg-[#222222]/90 backdrop-blur-sm border border-[#E5C66E]/30 rounded-xl p-6 md:p-10">
              <WaitlistForm />
            </div>
          </div>

          {/* Illustration section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6 text-[#E5C66E]">Revolutionary Platform</h2>
              <p className="text-xl text-gray-300 mb-8">
                Raba is redefining the future of finance with cutting-edge technology and innovative solutions.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#E5C66E]/30 to-[#D4AF37]/30 rounded-2xl blur-lg"></div>
                <div className="relative">
                  <Image
                    src="/dashboard-preview.png"
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
  )
}
