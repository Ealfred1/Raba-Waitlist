import Image from "next/image"
import { Twitter, Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] border-t border-[#333333] py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and description */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="rounded-full overflow-hidden w-10 h-10 mr-2">
                  <Image src="/logo.png" alt="Raba Logo" width={40} height={40} className="w-full h-full" />
                </div>
                <span className="text-[#E5C66E] font-bold text-xl">Raba</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Raba is revolutionizing the way you save and pay with cryptocurrency. Our platform offers seamless
                transactions and explosive returns.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-[#222222] hover:bg-[#333333] text-white p-2 rounded-full transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={18} /> 
                </a>
                <a
                  href="#"
                  className="bg-[#222222] hover:bg-[#333333] text-white p-2 rounded-full transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="#"
                  className="bg-[#222222] hover:bg-[#333333] text-white p-2 rounded-full transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:contact@raba.finance"
                  className="bg-[#222222] hover:bg-[#333333] text-white p-2 rounded-full transition-colors"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-[#E5C66E] font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Roadmap
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-[#E5C66E] font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#333333] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Raba Finance. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Image src="/solana-icon.svg" alt="Solana" width={24} height={24} />
              <Image src="/tether-icon.svg" alt="Tether" width={24} height={24} />
              <Image src="/paypal-icon.svg" alt="PayPal" width={24} height={24} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
