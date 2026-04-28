"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from "framer-motion"
import { StrokeFill } from "./OutlinedText"

const floatingItems = [
  { src: "/hero/potli.png", position: "top-left" as const, offsetX: 32, offsetY: 24, size: "w-28 md:w-36 lg:w-44" },
  { src: "/hero/flower.png", position: "top-right" as const, offsetX: 36, offsetY: 30, size: "w-24 md:w-32 lg:w-40" },
  { src: "/hero/candle.png", position: "bottom-left" as const, offsetX: 40, offsetY: 34, size: "w-28 md:w-36 lg:w-44" },
  { src: "/hero/jewellry.png", position: "bottom-right" as const, offsetX: 42, offsetY: 28, size: "w-28 md:w-36 lg:w-44" },
  { src: "/hero/giftbox.png", position: "top-left" as const, offsetX: 220, offsetY: 120, size: "hidden md:block md:w-28 lg:w-36" },
  { src: "/hero/plate.png", position: "bottom-right" as const, offsetX: 210, offsetY: 118, size: "hidden md:block md:w-28 lg:w-36" },
]

const texts = [
  { label: "Luxury Gifts", accent: "text-[#9C6B3E]" },
  { label: "Wedding Hampers", accent: "text-[#7C8A5B]" },
  { label: "Festive Boxes", accent: "text-[#B85C38]" },
]

export default function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [index, setIndex] = useState(0)
  const { scrollY } = useScroll()
  const heroScale = useTransform(scrollY, [0, 320], [1, 0.9])
  const heroY = useTransform(scrollY, [0, 320], [0, -48])
  const heroOpacity = useTransform(scrollY, [0, 320], [1, 0.84])
  const heroRadius = useTransform(scrollY, [0, 320], ["0px", "40px"])
  const shutterHeight = useTransform(scrollY, [0, 320], ["0%", "14%"])
  const contentY = useTransform(scrollY, [0, 320], [0, -28])
  const contentOpacity = useTransform(scrollY, [0, 320], [1, 0.74])
  const imagePull = useTransform(scrollY, [0, 320], [1, 0.72])
  const imageOpacity = useTransform(scrollY, [0, 320], [1, 0.42])

  // Mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 30
      setMouse({ x, y })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Text rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#9FB7A7]">
      <motion.div
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F3ECE6] px-6 py-24 md:px-10"
        style={{
          scale: heroScale,
          y: heroY,
          opacity: heroOpacity,
          borderRadius: heroRadius,
          transformOrigin: "center top",
        }}
      >
        {/* <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video> */}
        {/* <div className="pointer-events-none absolute inset-0 bg-black/30" /> */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(159,183,167,0.78),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(124,138,91,0.22),transparent_28%),radial-gradient(circle_at_78%_82%,rgba(156,107,62,0.26),transparent_30%),radial-gradient(circle_at_24%_78%,rgba(255,255,255,0.2),transparent_24%),linear-gradient(135deg,rgba(246,238,231,0.66)_0%,rgba(241,229,219,0.48)_42%,rgba(234,223,213,0.62)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/35 via-white/10 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-[#9FB7A7]/55 via-[#cfe0d4]/18 to-transparent" />
        <div className="pointer-events-none absolute left-1/2 bottom-[-10%] h-[46vh] w-[72vw] -translate-x-1/2 rounded-full bg-[#9FB7A7]/45 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 bottom-[8%] h-[24vh] w-[44vw] -translate-x-1/2 rounded-full bg-white/18 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.32)_24%,transparent_46%,rgba(255,255,255,0.16)_70%,transparent_100%)]" />

        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-[#9FB7A7]"
          style={{ height: shutterHeight }}
        />
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-[#9FB7A7]"
          style={{ height: shutterHeight }}
        />

        {floatingItems.map((item) => (
          <Floating
            key={`${item.src}-${item.position}-${item.offsetX}-${item.offsetY}`}
            src={item.src}
            position={item.position}
            offsetX={item.offsetX}
            offsetY={item.offsetY}
            size={item.size}
            mouse={mouse}
            pull={imagePull}
            opacity={imageOpacity}
          />
        ))}

        <motion.div
          className="relative z-10 rounded-xl flex h-full items-center justify-center"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <div className="w-full text-center max-w-3xl px-4 md:px-10">
            <div className="mb-6 inline-flex rounded-full border border-black/10 bg-white/50 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.32em] text-black/60 backdrop-blur-sm">
              Curated gifting atelier
            </div>

            <h1 className="flex flex-col items-center justify-center text-5xl font-semibold leading-tight text-black md:text-6xl lg:text-7xl">
              <div className="w-full flex justify-center mb-0 md:-mb-2 lg:-mb-3">
                <StrokeFill />
              </div>

              <AnimatePresence mode="wait">
                <motion.span
                  key={texts[index].label}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className={`inline-block bg-gradient-to-r from-current to-black/80 bg-clip-text ${texts[index].accent}`}
                >
                  {texts[index].label}
                </motion.span>
              </AnimatePresence>
            </h1>

            <p className="mt-6 text-base text-gray-600 md:text-lg">
              Premium curated gifting experiences for every special moment.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button className="rounded-full bg-black px-6 py-3 text-white transition hover:scale-105">
                Explore
              </button>
              <button className="rounded-full border border-black px-6 py-3 transition hover:bg-black hover:text-white">
                View Collection
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* Floating Image Component */
function Floating({
  src,
  position,
  offsetX,
  offsetY,
  size,
  mouse,
  pull,
  opacity,
}: {
  src: string
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  offsetX: number
  offsetY: number
  size: string
  mouse: { x: number; y: number }
  pull: MotionValue<number>
  opacity: MotionValue<number>
}) {
  const cornerClass = {
    "top-left": "left-3 top-3 md:left-8 md:top-8 lg:left-14 lg:top-12",
    "top-right": "right-3 top-3 md:right-8 md:top-8 lg:right-14 lg:top-12",
    "bottom-left": "bottom-3 left-3 md:bottom-8 md:left-8 lg:bottom-12 lg:left-14",
    "bottom-right": "bottom-3 right-3 md:bottom-8 md:right-8 lg:bottom-12 lg:right-14",
  }[position]

  const xDirection = position.includes("right") ? -1 : 1
  const yDirection = position.includes("bottom") ? -1 : 1

  return (
    <motion.img
      src={src}
      alt=""
      className={`pointer-events-none absolute rounded-2xl shadow-xl ${cornerClass} ${size}`}
      animate={{
        x: offsetX * xDirection + mouse.x * 0.7,
        y: offsetY * yDirection + mouse.y * 0.7,
        rotate: (mouse.x + mouse.y) * 0.12 * xDirection,
      }}
      style={{
        scale: pull,
        opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 15,
      }}
      whileHover={{ scale: 1.05 }}
    />
  )
}
