"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, Mail, Twitter, Users, Clock, Gift } from "lucide-react"
import Image from "next/image"

export function WaitlistForm({ isVisible }: { isVisible: boolean }) {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({ email: "" })
  const [apiError, setApiError] = useState("")

  const validateEmail = () => {
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }))
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }))
      return false
    }
    setErrors((prev) => ({ ...prev, email: "" }))
    return true
  }

  const handleNext = () => {
    if (step === 1) {
      if (validateEmail()) {
        setStep(2)
      }
    }
  }

  const handleSubmit = async () => {
    if (!validateEmail()) return

    setIsSubmitting(true)
    setApiError("")

    try {
      const response = await fetch("https://sendraba-api.onrender.com/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Failed to join waitlist")
      }

      const data = await response.json()
      setIsSubmitted(true)
    } catch (error) {
      setApiError("Failed to join waitlist. Please try again.")
      console.error("Waitlist submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTwitterJoin = async () => {
    // First submit the form
    await handleSubmit()

    // Then open Twitter in a new tab
    window.open("https://x.com/sendraba", "_blank")
  }

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  }

  if (!isVisible) return null

  return (
    <div className="relative bg-[#222222]/90 backdrop-blur-sm border border-[#E5C66E]/30 rounded-xl p-6 md:p-10 max-w-4xl mx-auto">
      {/* Waitlist benefits */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start space-x-3">
          <div className="bg-[#E5C66E]/10 p-2 rounded-full">
            <Clock className="h-6 w-6 text-[#E5C66E]" />
          </div>
          <div>
            <h3 className="text-[#E5C66E] font-bold mb-1">Early Access</h3>
            <p className="text-gray-300 text-sm">Be among the first to experience Raba's revolutionary platform.</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="bg-[#E5C66E]/10 p-2 rounded-full">
            <Gift className="h-6 w-6 text-[#E5C66E]" />
          </div>
          <div>
            <h3 className="text-[#E5C66E] font-bold mb-1">Exclusive Rewards</h3>
            <p className="text-gray-300 text-sm">Waitlist members receive special bonuses and promotions.</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="bg-[#E5C66E]/10 p-2 rounded-full">
            <Users className="h-6 w-6 text-[#E5C66E]" />
          </div>
          <div>
            <h3 className="text-[#E5C66E] font-bold mb-1">Community Access</h3>
            <p className="text-gray-300 text-sm">Join our growing community of crypto enthusiasts.</p>
          </div>
        </div>
      </div>

      {/* Spots counter */}
      <div className="mb-8 bg-[#1A1A1A] rounded-lg p-4 flex items-center justify-between">
        <div>
          <h3 className="text-[#E5C66E] font-bold">Limited Spots Available</h3>
          <p className="text-gray-300 text-sm">Join now to secure your place in our exclusive beta.</p>
        </div>
        <div className="bg-[#E5C66E] text-[#222222] font-bold rounded-lg px-4 py-2">
          <span className="text-xl">247</span>
          <span className="text-sm ml-1">spots left</span>
        </div>
      </div>

      {!isSubmitted ? (
        <div>
          {/* Progress indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${step === 1 ? "bg-[#E5C66E]" : "bg-[#E5C66E]/40"}`}></div>
              <div className={`w-3 h-3 rounded-full ${step === 2 ? "bg-[#E5C66E]" : "bg-[#E5C66E]/40"}`}></div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={step}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={formVariants}
              className="max-w-lg mx-auto"
            >
              {step === 1 ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-center text-[#E5C66E] mb-6">Enter Your Email</h2>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <Mail className="h-6 w-6 text-[#E5C66E]" />
                    </div>
                    <input
                      type="email"
                      placeholder="johnnykaye@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (errors.email) setErrors((prev) => ({ ...prev, email: "" }))
                      }}
                      className="w-full bg-[#2A2A2A] text-white text-lg placeholder-gray-400 rounded-full py-5 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-[#E5C66E] border border-[#444444]"
                    />
                  </div>

                  {errors.email && <p className="text-red-500 text-sm ml-4">{errors.email}</p>}
                </div>
              ) : (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-center text-[#E5C66E] mb-6">Join Our Twitter Community</h2>

                  <div className="bg-[#2A2A2A] rounded-xl p-6 border border-[#444444] mb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Mail className="h-5 w-5 text-[#E5C66E]" />
                      <p className="text-lg">{email}</p>
                    </div>
                    <p className="text-gray-300">
                      You're almost done! Join our Twitter community to stay updated with the latest news.
                    </p>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <button
                      onClick={handleTwitterJoin}
                      className="relative group bg-gradient-to-r from-[#E5C66E] to-[#D4AF37] text-[#222222] font-bold rounded-full py-4 px-6 text-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center"
                    >
                      <Twitter className="mr-3 h-6 w-6" />
                      Join Twitter & Submit
                    </button>

                    <button onClick={handleSubmit} className="text-[#E5C66E] hover:underline text-base py-2">
                      Submit without joining Twitter
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {step === 1 && (
            <div className="flex flex-col items-center mt-8 space-y-4">
              {apiError && (
                <p className="text-red-500 text-sm">{apiError}</p>
              )}
              <button
                onClick={handleNext}
                disabled={isSubmitting}
                className="relative group bg-gradient-to-r from-[#E5C66E] to-[#D4AF37] text-[#222222] font-bold rounded-full py-4 px-10 text-lg hover:opacity-90 transition-all duration-200 min-w-[180px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#222222]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-full bg-gradient-to-r from-[#E5C66E] to-[#D4AF37]">
            <Check className="w-10 h-10 text-[#222222]" />
          </div>

          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#E5C66E] to-[#D4AF37]">
            You're On The List!
          </h2>

          <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
            We're excited to have you join us. You'll be the first to know when we launch.
          </p>

          <div className="inline-block">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E5C66E] to-[#D4AF37] rounded-lg blur opacity-30"></div>
              <p className="relative text-lg text-gray-200 px-6 py-3 bg-[#2A2A2A] rounded-lg border border-[#E5C66E]/30">
                {email}
              </p>
            </div>
          </div>

          {/* Social sharing */}
          <div className="mt-8">
            <p className="text-gray-300 mb-4">Share with friends to move up the waitlist:</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-[#1DA1F2] text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="bg-[#4267B2] text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
                </svg>
              </button>
              <button className="bg-[#25D366] text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.415 14.382C17.117 14.233 15.656 13.515 15.384 13.415C15.112 13.316 14.914 13.267 14.715 13.565C14.517 13.861 13.948 14.531 13.775 14.729C13.601 14.928 13.428 14.952 13.131 14.804C12.834 14.654 11.876 14.341 10.741 13.329C9.858 12.541 9.261 11.568 9.088 11.27C8.915 10.973 9.069 10.812 9.218 10.664C9.352 10.531 9.516 10.317 9.664 10.144C9.813 9.97 9.862 9.846 9.961 9.647C10.061 9.449 10.012 9.275 9.937 9.126C9.862 8.978 9.268 7.515 9.02 6.92C8.779 6.341 8.534 6.419 8.352 6.41C8.178 6.402 7.98 6.4 7.782 6.4C7.584 6.4 7.262 6.474 6.99 6.772C6.717 7.07 5.95 7.788 5.95 9.251C5.95 10.714 7.014 12.127 7.163 12.325C7.312 12.523 9.258 15.525 12.239 16.812C12.949 17.118 13.502 17.301 13.933 17.437C14.645 17.664 15.293 17.632 15.805 17.555C16.376 17.47 17.563 16.836 17.811 16.142C18.058 15.448 18.058 14.853 17.984 14.729C17.909 14.605 17.711 14.531 17.414 14.382H17.415Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Social proof
      <div className="mt-10 pt-8 border-t border-[#444444]">
        <p className="text-center text-gray-400 mb-4">Trusted by crypto enthusiasts worldwide</p>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="opacity-60 hover:opacity-100 transition-opacity">
            <Image src="/img1.svg" alt="Solana" width={80} height={30} />
          </div>
          <div className="opacity-60 hover:opacity-100 transition-opacity">
            <Image src="/img2.svg" alt="Tether" width={80} height={30} />
          </div>
          <div className="opacity-60 hover:opacity-100 transition-opacity">
            <Image src="/img3.svg" alt="PayPal" width={80} height={30} />
          </div>
          <div className="opacity-60 hover:opacity-100 transition-opacity">
            <Image src="/img4.svg" alt="PayPal" width={80} height={30} />
          </div>
        </div>
      </div> */}
    </div>
  )
}
