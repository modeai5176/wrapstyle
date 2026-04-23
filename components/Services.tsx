"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// npm install gsap

const LEFT_SERVICES = [
  {
    title: "Luxury Gift Wrapping",
    img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Wedding & Events",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Seasonal Collections",
    img: "https://images.unsplash.com/photo-1544816155-82aea1b11d06?q=80&w=800&auto=format&fit=crop",
  },
];

const RIGHT_SERVICES = [
  {
    title: "Corporate Hampers",
    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Retail Packaging",
    img: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Custom Commissions",
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
  },
];

function ServiceCard({ title, img }: { title: string; img: string }) {
  return (
    <article className="group w-full flex-shrink-0 rounded-3xl overflow-hidden cursor-pointer"
      style={{ background: "#f0ece3" }}
    >
      {/* Inset image */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ margin: "0.65rem 0.65rem 0", aspectRatio: "1 / 1" }}
      >
        <Image
          src={img}
          alt={title}
          fill
          sizes="400px"
          className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="px-6 py-5 text-center">
        <h3
          className="mb-4 text-forest"
          style={{
            // fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.2rem, 1.8vw, 1.75rem)",
            fontWeight: 400,
            // color: "#2a2520",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>
        <button
          className="px-9 py-2.5 text-forest bg-transparent border border-forest-dark hover:bg-forest hover:text-background rounded-full text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300"
        >
          Shop Now
        </button>
      </div>
    </article>
  );
}

export default function ServicesSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const colLeftRef  = useRef<HTMLDivElement>(null);
  const colRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  let ctx: any;

  (async () => {
    const gsap = (await import("gsap")).default;
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const colLeft = colLeftRef.current!;
      const colRight = colRightRef.current!;

      function init() {
        ScrollTrigger.getAll().forEach((t) => t.kill());

        const vh = window.innerHeight;

        const leftHeight = colLeft.scrollHeight;
        const rightHeight = colRight.scrollHeight;
        const maxTravel = Math.max(leftHeight, rightHeight);

        // ✅ Initial hidden state
        gsap.set([colLeft, colRight], {
          y: vh * 1.2,
          opacity: 0,
        });

        const tl = gsap.timeline({
  scrollTrigger: {
    trigger: section,
    start: "top top",

    // ✅ Better calibrated end (important)
    end: () => `+=${maxTravel + window.innerHeight * 0.4}`,

    scrub: 1, // 🔥 reduced from 1.2 (less lag = smoother)
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,

    invalidateOnRefresh: true,
    refreshPriority: 2,

    // 🔥 Smooth release fix
    fastScrollEnd: true,
  },
});

        // 👉 Phase 1: Intro hold (text only)
        tl.to({}, { duration: 0.6 });

        // 👉 Phase 2: Cards enter (smoother)
tl.to([colLeft, colRight], {
  y: 0,
  opacity: 1,
  ease: "power3.out",
  duration: 1,
});

// 👉 Phase 3: Main scroll (linear feel)
tl.to([colLeft, colRight], {
  y: `-=${maxTravel * 0.85}`, // 🔥 slightly less than full
  ease: "none",
  duration: 2,
});

// 👉 Phase 4: Smooth exit (THIS FIXES JUMP)
tl.to([colLeft, colRight], {
  y: `-=${maxTravel * 0.15}`, // remaining distance
  ease: "power2.out", // 🔥 ease OUT instead of abrupt stop
  duration: 0.6,
});

        // ❗ IMPORTANT: No extra timeline after this
        // → ensures pin drops immediately
      }

      init();
    }, sectionRef);
  })();

  return () => ctx?.revert();
}, []); 

  return (
    <>
      {/* Google Fonts — add this to your layout.tsx <head> instead */}
      {/* <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      /> */}

      <section
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden bg-sage"
      >
        {/* ── PINNED CENTERED TITLE ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-[1] pointer-events-none px-8">

          <h2
            className="uppercase text-forest"
            style={{
            //   fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.8rem, 6vw, 6.5rem)",
              fontWeight: 400,
              lineHeight: 0.96,
              letterSpacing: "-0.02em",
            }}
          >
            Wrapped with<br />intention, delivered<br />with craft.
          </h2>
        </div>

        {/* ── TWO-COLUMN CARD LAYER ── */}
        <div className="absolute inset-0 z-20 pointer-events-none">

          {/* LEFT COLUMN — enters from bottom */}
          <div
            ref={colLeftRef}
            className="absolute flex flex-col pointer-events-auto"
            style={{ left: "14vw", top: 0, width: "clamp(260px, 28vw, 400px)", gap: "2rem" }}
          >
            {LEFT_SERVICES.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>

          {/* RIGHT COLUMN — starts partially above viewport */}
          <div
            ref={colRightRef}
            className="absolute flex flex-col pointer-events-auto"
            style={{ left: "57vw", top: 0, width: "clamp(260px, 28vw, 400px)", gap: "2rem" }}
          >
            {RIGHT_SERVICES.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}