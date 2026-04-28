'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type TestimonialCard = {
  name: string
  designation: string
  review: string
  rotation: string
  translateY?: string
}

const cards: TestimonialCard[] = [
  {
    name: 'Rosalina Williamson',
    designation: 'Head of Marketing, Cybery',
    review: 'Wrapstyle turned our Diwali hampers into the moment every client talked about. Faultless detail, on brand, on time.',
    rotation: '-10deg',
    translateY: '-5%',
  },
  {
    name: 'Julianne Stam',
    designation: 'Bride & Founder, Mezpay',
    review: 'The wedding suite they built for us felt like a single piece of art. Every invitation, favor, and gift belonged together.',
    rotation: '4deg',
  },
  {
    name: 'Arjun Mehta',
    designation: 'Founder, Northline Estates',
    review: 'They handled a high-volume festive gifting run without losing the bespoke feel. Everything still arrived presentation-ready.',
    rotation: '-4deg',
    translateY: '-5%',
  },
  {
    name: 'Naina Kapoor',
    designation: 'Brand Director, Solenne',
    review: 'Our launch gifting looked editorial rather than promotional. The wrapping itself became part of the product experience.',
    rotation: '4deg',
    translateY: '5%',
  },
  {
    name: 'Kabir Sethi',
    designation: 'Operations Lead, Aster House',
    review: 'Bulk dispatches, last-minute changes, and presentation standards were all handled with unusual calm and precision.',
    rotation: '-10deg',
  },
  {
    name: 'Misha Rao',
    designation: 'Creative Producer, Liora Weddings',
    review: 'They understand restraint. Nothing felt overdesigned, but every surface, ribbon, and insert carried intention.',
    rotation: '4deg',
    translateY: '5%',
  },
  {
    name: 'Aanya Bhasin',
    designation: 'Founder, The Cedar Edit',
    review: 'The finish was luxurious without feeling loud. That balance is hard to get right, and they got it right every time.',
    rotation: '-3deg',
    translateY: '10%',
  },
  {
    name: 'Reyansh Malhotra',
    designation: 'Creative Lead, North Canvas',
    review: 'The unboxing felt deliberate from the first ribbon pull to the final insert. It looked premium without ever becoming excessive.',
    rotation: '6deg',
    translateY: '-2%',
  },
  {
    name: 'Sana Mirza',
    designation: 'Founder, House of Sanaa',
    review: 'They gave our festive gifting a strong visual identity and still kept every package personal. That mix is what made it memorable.',
    rotation: '-7deg',
    translateY: '7%',
  },
]

/* ── Unique SVG background per card ── */
function CardSVGBg({ seed }: { seed: number }) {
  const s = seed % 4
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 390"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity: 0.065, color: 'inherit' }}
    >
      {s === 0 && (
        <>
          <circle cx="220" cy="55" r="110" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <circle cx="220" cy="55" r="70" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="220" cy="55" r="35" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <line x1="0" y1="390" x2="280" y2="0" stroke="currentColor" strokeWidth="0.5" />
          <line x1="-20" y1="350" x2="260" y2="-40" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="30" cy="340" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </>
      )}
      {s === 1 && (
        <>
          <path d="M0 195 Q70 75 140 195 Q210 315 280 195" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path d="M0 155 Q70 35 140 155 Q210 275 280 155" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <path d="M0 235 Q70 115 140 235 Q210 355 280 235" fill="none" stroke="currentColor" strokeWidth="0.45" />
          <circle cx="25" cy="25" r="16" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="255" cy="365" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </>
      )}
      {s === 2 && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={i * 93} y1="0" x2={i * 93} y2="390" stroke="currentColor" strokeWidth="0.45" />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="0" y1={i * 97} x2="280" y2={i * 97} stroke="currentColor" strokeWidth="0.45" />
          ))}
          <circle cx="140" cy="195" r="85" fill="none" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="140" cy="195" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </>
      )}
      {s === 3 && (
        <>
          <polygon points="140,18 265,360 15,360" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <polygon points="140,65 235,340 45,340" fill="none" stroke="currentColor" strokeWidth="0.65" />
          <polygon points="140,112 205,320 75,320" fill="none" stroke="currentColor" strokeWidth="0.38" />
          <circle cx="140" cy="195" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </>
      )}
    </svg>
  )
}

/* ── Mobile auto-carousel ── */
function MobileCarousel() {
  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = useCallback(
    (idx: number) => setActive(((idx % cards.length) + cards.length) % cards.length),
    [],
  )

  const resetTimer = useCallback(
    (next: number) => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      go(next)
      intervalRef.current = setInterval(() => setActive((a) => (a + 1) % cards.length), 4500)
    },
    [go],
  )

  useEffect(() => {
    intervalRef.current = setInterval(() => setActive((a) => (a + 1) % cards.length), 4500)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  return (
    <div className="w-full px-5 pb-10">
      {/* Card viewport */}
      <div className="relative overflow-hidden" style={{ minHeight: 260 }}>
        {cards.map((card, i) => {
          const offset = i - active
          return (
            <div
              key={card.name}
              style={{
                position: i === active ? 'relative' : 'absolute',
                top: 0, left: 0, right: 0,
                opacity: i === active ? 1 : 0,
                transform: `translateX(${offset * 110}%)`,
                transition: 'opacity 0.55s ease, transform 0.55s cubic-bezier(0.4,0,0.2,1)',
                pointerEvents: i === active ? 'auto' : 'none',
              }}
            >
              <div
                className="relative overflow-hidden rounded-2xl border bg-background shadow-md"
                style={{ borderColor: 'rgba(0,0,0,0.08)', color: '#1a1a1a', padding: '1.5rem' }}
              >
                <CardSVGBg seed={i} />
                {/* Quote icon */}
                <svg className="relative mb-3 h-6 w-6 opacity-20" viewBox="0 0 32 26" fill="currentColor" aria-hidden>
                  <path d="M0 26V16.12C0 7.16 5.08 1.84 15.24 0l1.08 2.16C10.56 3.84 7.6 7.2 7.12 12H13V26H0zm19 0V16.12C19 7.16 24.08 1.84 34.24 0l1.08 2.16C29.56 3.84 26.6 7.2 26.12 12H32V26H19z" />
                </svg>
                <p className="relative mb-5 text-[14px] leading-[1.74] text-foreground/72">
                  {card.review}
                </p>
                <div className="relative border-t pt-4" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-foreground">
                    {card.name}
                  </p>
                  <p className="mt-0.5 text-[9.5px] uppercase tracking-[0.2em]" style={{ color: '#b29a79' }}>
                    {card.designation}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          onClick={() => resetTimer(active - 1)}
          aria-label="Previous"
          className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
          style={{ borderColor: 'rgba(0,0,0,0.18)', color: 'rgba(0,0,0,0.5)' }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M8.5 2L4 6.5l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => resetTimer(i)}
              aria-label={`Slide ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-400"
              style={{
                width: i === active ? 20 : 6,
                background: i === active ? '#b29a79' : 'rgba(0,0,0,0.18)',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => resetTimer(active + 1)}
          aria-label="Next"
          className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
          style={{ borderColor: 'rgba(0,0,0,0.18)', color: 'rgba(0,0,0,0.5)' }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M4.5 2L9 6.5 4.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

/* ── MAIN SECTION ── */
export default function TestimonialSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const tid = setTimeout(() => {
      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia()

        mm.add('(min-width: 768px)', () => {
          const wrapper = wrapperRef.current!
          const section = sectionRef.current!

          /*
           * Text directions (per request):
           *  "What's"   → starts center (xPercent 0), moves RIGHT  (+)
           *  "Everyone" → starts further left (-38), moves RIGHT   (+)
           *  "Talking"  → starts slightly left of center (-14), moves LEFT (-)
           */
          gsap.set('.ts-t1', { xPercent: 0 })
          gsap.set('.ts-t2', { xPercent: -38 })
          gsap.set('.ts-t3', { xPercent: 46 })

          const scrubCfg = {
            trigger: wrapper,
            start: 'top top',
            end: '50% top',
            scrub: true,
          }
          gsap.to('.ts-t1', { xPercent: 24, ease: 'none', scrollTrigger: scrubCfg })
          gsap.to('.ts-t2', { xPercent: 20, ease: 'none', scrollTrigger: scrubCfg })
          gsap.to('.ts-t3', { xPercent: 8, ease: 'none', scrollTrigger: scrubCfg })

          /* Cards fire upward from below into place on pin scroll */
          gsap.set('.vd-card', { yPercent: 220, opacity: 0 })
          gsap.to('.vd-card', {
            yPercent: 0,
            opacity: 1,
            stagger: 0.16,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '+=230%',
              scrub: 1.1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
        })

        return () => mm.revert()
      }, wrapperRef)

      return () => ctx.revert()
    }, 60)

    return () => clearTimeout(tid)
  }, [])

  return (
    <div ref={wrapperRef} className="relative">
      <section
        ref={sectionRef}
        className="testimonials-section relative w-full bg-background"
        style={{ height: '100dvh' }}
      >
        {/* ── Desktop titles ── */}
        <div className="pointer-events-none absolute inset-0 hidden flex-col items-start justify-center overflow-hidden pl-[2vw] md:flex">
          <h1 className="ts-t1 font-display text-[13vw] font-bold uppercase leading-[0.9] tracking-[-0.03em] text-foreground">
            What&apos;s
          </h1>
          <h1 className="ts-t2 font-display text-[13vw] font-bold uppercase leading-[0.9] tracking-[-0.03em]" style={{ color: '#6f7d75' }}>
            Everyone
          </h1>
          <h1 className="ts-t3 font-display text-[13vw] font-bold uppercase leading-[0.9] tracking-[-0.03em] text-foreground">
            Talking
          </h1>
        </div>

        {/* ── Desktop cards ── */}
        <div
          className="absolute inset-x-0 bottom-0 hidden overflow-hidden md:flex md:items-end md:justify-center"
          style={{ paddingBottom: '2.5rem', paddingLeft: '5rem' }}
        >
          {cards.map((card, i) => (
            <article
              key={card.name}
              className="vd-card"
              style={{
                position: 'relative',
                flexShrink: 0,
                width: '16rem',
                marginLeft: i === 0 ? 0 : '-8.5rem',
                zIndex: i + 1,
                transform: `rotate(${card.rotation}) translateY(${card.translateY ?? '0%'})`,
                transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.zIndex = '50'
                el.style.transform = `rotate(${card.rotation}) translateY(${card.translateY ?? '0%'}) scale(1.07)`
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.zIndex = String(i + 1)
                el.style.transform = `rotate(${card.rotation}) translateY(${card.translateY ?? '0%'}) scale(1)`
              }}
            >
              <div
                className="relative overflow-hidden rounded-[1.2vw] border shadow-xl"
                style={{
                  aspectRatio: '0.7/1',
                  background: 'var(--background, #faf8f5)',
                  borderColor: 'rgba(0,0,0,0.1)',
                  color: '#1a1a1a',
                }}
              >
                <CardSVGBg seed={i} />

                <div className="relative flex h-full flex-col p-5">
                  {/* Quote icon */}
                  <svg className="mb-2 h-6 w-6 opacity-20" viewBox="0 0 32 26" fill="currentColor" aria-hidden>
                    <path d="M0 26V16.12C0 7.16 5.08 1.84 15.24 0l1.08 2.16C10.56 3.84 7.6 7.2 7.12 12H13V26H0zm19 0V16.12C19 7.16 24.08 1.84 34.24 0l1.08 2.16C29.56 3.84 26.6 7.2 26.12 12H32V26H19z" />
                  </svg>

                  <p className="flex-1 text-[13.5px] leading-[1.78] text-foreground/74">
                    {card.review}
                  </p>

                  <div className="mt-4 border-t pt-4" style={{ borderColor: 'rgba(0,0,0,0.09)' }}>
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-foreground">
                      {card.name}
                    </p>
                    <p className="mt-0.5 text-[9.5px] uppercase tracking-[0.2em]" style={{ color: '#b29a79' }}>
                      {card.designation}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Mobile: stacked heading + auto-carousel ── */}
        <div className="flex flex-col pt-16 md:hidden">
          <div className="px-5 pb-7">
            {(['What\'s', 'Everyone', 'Talking'] as const).map((word, wi) => (
              <h2
                key={word}
                className="font-display font-bold uppercase"
                style={{
                  fontSize: '11vw',
                  lineHeight: 0.94,
                  letterSpacing: '-0.02em',
                  color: wi === 1 ? '#3F5F52' : undefined,
                  animation: `mFadeUp 0.65s ${wi * 0.1}s ease both`,
                }}
              >
                {word}
              </h2>
            ))}
          </div>
          <MobileCarousel />
        </div>

        <style>{`
          @keyframes mFadeUp {
            from { opacity:0; transform: translateY(24px); }
            to   { opacity:1; transform: translateY(0); }
          }
        `}</style>
      </section>
    </div>
  )
}
