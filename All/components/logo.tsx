"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const sizeMap = {
    xs: { image: 120 },
    sm: { image: 150 },
    md: { image: 200 },
    lg: { image: 300 },
  }

  const config = sizeMap[size]

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div 
        className="relative flex items-center justify-center cursor-pointer"
        initial={false}
        animate={{ width: config.image }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src="/logo-pecinogp.png"
          alt="PecinoGP Logo"
          width={config.image}
          height={config.image / 2}
          className="object-contain w-full h-auto drop-shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all hover:drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]"
          priority
        />
      </motion.div>
    </div>
  )
}

export function LogoMinimal() {
  return (
    <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center transition-transform duration-300 hover:scale-110">
      <Image
        src="/logo-pecinogp.png"
        alt="PecinoGP"
        width={224}
        height={224}
        className="object-contain drop-shadow-lg"
        priority
      />
    </div>
  )
}
