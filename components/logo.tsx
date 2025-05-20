import Image from "next/image"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={className}>
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-[#E5C66E]/40 to-[#D4AF37]/40 rounded-full blur-lg"></div>
        <div className="relative">
          <Image src="/logo.png" alt="Raba Logo" width={160} height={160} className="w-full h-full" />
        </div>
      </div>
    </div>
  )
}
