"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, Mail, Twitter } from "lucide-react"

export function WaitlistForm() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({ email: "" })

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

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  const handleTwitterJoin = () => {
    // First submit the form
    handleSubmit()

    // Then open Twitter in a new tab
    window.open("https://twitter.com/rabafinance", "_blank")
  }

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  }

  return (
    <div>
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
            <div className="flex justify-center mt-8">
              <button
                onClick={handleNext}
                className="relative group bg-gradient-to-r from-[#E5C66E] to-[#D4AF37] text-[#222222] font-bold rounded-full py-4 px-10 text-lg hover:opacity-90 transition-all duration-200 min-w-[180px] flex items-center justify-center"
              >
                Next
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
        </motion.div>
      )}
    </div>
  )
}
