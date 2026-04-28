'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type TestimonialCard = {
  name: string
  designation: string
  review: string
  image: string
  rotation: string
  translation?: string
}

const cards: TestimonialCard[] = [
  {
    name: 'Rosalina Williamson',
    designation: 'Head of Marketing, Cybery',
    review:
      'Wrapstyle turned our Diwali hampers into the moment every client talked about. Faultless detail, on brand, on time.',
    image:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=900&auto=format&fit=crop',
    rotation: 'rotate-[-10deg]',
    translation: '-translate-y-[5%]',
  },
  {
    name: 'Julianne Stam',
    designation: 'Bride & Founder, Mezpay',
    review:
      'The wedding suite they built for us felt like a single piece of art. Every invitation, favor, and gift belonged together.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=900&auto=format&fit=crop',
    rotation: 'rotate-[4deg]',
  },
  {
    name: 'Arjun Mehta',
    designation: 'Founder, Northline Estates',
    review:
      'They handled a high-volume festive gifting run without losing the bespoke feel. Everything still arrived presentation-ready.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=900&auto=format&fit=crop',
    rotation: 'rotate-[-4deg]',
    translation: '-translate-y-[5%]',
  },
  {
    name: 'Naina Kapoor',
    designation: 'Brand Director, Solenne',
    review:
      'Our launch gifting looked editorial rather than promotional. The wrapping itself became part of the product experience.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=900&auto=format&fit=crop',
    rotation: 'rotate-[4deg]',
    translation: 'translate-y-[5%]',
  },
  {
    name: 'Kabir Sethi',
    designation: 'Operations Lead, Aster House',
    review:
      'Bulk dispatches, last-minute changes, and presentation standards were all handled with unusual calm and precision.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=900&auto=format&fit=crop',
    rotation: 'rotate-[-10deg]',
  },
  {
    name: 'Misha Rao',
    designation: 'Creative Producer, Liora Weddings',
    review:
      'They understand restraint. Nothing felt overdesigned, but every surface, ribbon, and insert carried intention.',
    image:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=900&auto=format&fit=crop',
    rotation: 'rotate-[4deg]',
    translation: 'translate-y-[5%]',
  },
  {
    name: 'Aanya Bhasin',
    designation: 'Founder, The Cedar Edit',
    review:
      'The finish was luxurious without feeling loud. That balance is hard to get right, and they got it right every time.',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=900&auto=format&fit=crop',
    rotation: 'rotate-[-3deg]',
    translation: 'translate-y-[10%]',
  },
]

export default function TestimonialSection() {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const cardEls = gsap.utils.toArray<HTMLElement>('.testimonial-card-shell')

        gsap.set(cardEls, {
          yPercent: 140,
          opacity: 0,
        })

        const titleTl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 85%',
            end: 'top top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })

        titleTl
          .to('.testimonials-section .first-title', { xPercent: 55, ease: 'none' }, 0)
          .to('.testimonials-section .sec-title', { xPercent: 18, ease: 'none' }, 0)
          .to('.testimonials-section .third-title', { xPercent: -38, ease: 'none' }, 0)

        const cardsTl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: '+=1200',
            scrub: 1.1,
            pin: stageRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        cardsTl.to(cardEls, {
          yPercent: 0,
          opacity: 1,
          ease: 'power2.out',
          stagger: 0.16,
          duration: 1.1,
        })
      })

      mm.add('(max-width: 767px)', () => {
        const mobileCards = gsap.utils.toArray<HTMLElement>('.testimonial-mobile-card')

        gsap.from(mobileCards, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 80%',
            invalidateOnRefresh: true,
          },
        })
      })

      return () => mm.revert()
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="testimonials-section relative w-full bg-background">
      <div ref={stageRef} className="relative h-[115dvh] overflow-hidden md:h-[120dvh]">
        <div className="pointer-events-none absolute inset-x-0 top-[6vw] z-0 flex flex-col items-center">
          <h2 className="first-title ml-[1vw] font-display text-[14vw] font-medium uppercase leading-[0.95] tracking-[-0.22vw] text-foreground">
            What&apos;s
          </h2>
          <h2 className="sec-title ml-[1vw] font-display text-[14vw] font-medium uppercase leading-[0.95] tracking-[-0.22vw] text-[#b29a79]">
            Everyone
          </h2>
          <h2 className="third-title ml-[1vw] font-display text-[14vw] font-medium uppercase leading-[0.95] tracking-[-0.22vw] text-foreground">
            Talking
          </h2>
        </div>

        <div className="absolute bottom-[42vh] left-0 z-10 hidden w-full items-center justify-center ps-52 md:flex 2xl:bottom-28">
          {cards.map((card, index) => (
            <div
              key={`${card.name}-${card.designation}`}
              className={`testimonial-card-shell relative ${index === 0 ? 'ms-0' : '-ms-44'} w-80 flex-none md:w-96`}
            >
              <article
                className={`${card.translation ?? ''} ${card.rotation} overflow-hidden rounded-3xl border-[0.5vw] border-background md:rounded-[2vw]`}
              >
                <div className="relative aspect-[0.8/1] w-full">
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    sizes="(max-width: 1024px) 320px, 384px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e3a2c]/92 via-[#0e3a2c]/45 to-transparent" />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_45%)]" />

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <p className="text-[12px] leading-[1.55] text-white/92 md:text-[13px]">
                      &ldquo;{card.review}&rdquo;
                    </p>
                    <div className="mt-5 border-t border-white/20 pt-4">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
                        {card.name}
                      </h3>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
                        {card.designation}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-5 px-6 pt-[36vh] md:hidden">
          {cards.map((card) => (
            <article
              key={`${card.name}-${card.designation}-mobile`}
              className="testimonial-mobile-card overflow-hidden rounded-3xl border border-background"
            >
              <div className="relative aspect-[1.12/1] w-full">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e3a2c]/92 via-[#0e3a2c]/45 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[13px] leading-[1.55] text-white/92">
                    &ldquo;{card.review}&rdquo;
                  </p>
                  <div className="mt-5 border-t border-white/20 pt-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
                      {card.name}
                    </h3>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
                      {card.designation}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
