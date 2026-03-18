"use client"

import { useEffect, useRef, useState } from "react"
import { animate, motion } from "framer-motion"

type CounterProps = {
  from: number
  to: number
  className?: string
  format?: (value: number) => string
}

export function Counter({ from, to, className, format }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(from)

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 3, // slightly faster
      ease: "easeOut",
      onUpdate(value) {
        setDisplayValue(value)
      },
    })

    return () => controls.stop()
  }, [from, to])

  return (
    <span className={className}>
      {format ? format(displayValue) : displayValue.toFixed(0)}
    </span>
  )
}
