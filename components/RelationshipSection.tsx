"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DATA = [
  {
    title: "For Her",
    subtitle: "Elegant & thoughtful picks",
    hoverText: "Birthday • Anniversary • Self-care",
    img: "/images/for_her.jpg",
    // Unsplash Search: woman receiving gift box luxury aesthetic pastel gift hamper
  },
  {
    title: "For Him",
    subtitle: "Bold & refined selections",
    hoverText: "Birthday • Father's Day • Promotion",
    img: "/images/for_him.jpg",
    // Unsplash Search: man receiving gift box premium gift hamper masculine aesthetic
  },
  {
    title: "For Couples",
    subtitle: "Shared moments, beautifully wrapped",
    hoverText: "Wedding • Housewarming • Anniversary",
    img: "/images/for_couple.jpg",
    // Unsplash Search: couple exchanging gift box romantic lifestyle aesthetic
  },
  {
    title: "For Parents",
    subtitle: "Warm & meaningful gestures",
    hoverText: "Anniversary • Thank You • Festive",
    img: "/images/for_parents.jpg",
    // Unsplash Search: gift box for parents elegant minimal hamper candle flowers aesthetic
  },
  {
    title: "For Kids",
    subtitle: "Fun & joyful surprises",
    hoverText: "Birthday • Reward • Holiday",
    img: "/images/for_kids.jpg",
    // Unsplash Search: kids gift box colorful toys gift hamper playful aesthetic
  },
  {
    title: "For Every Occasion",
    subtitle: "Birthdays, weddings & more",
    hoverText: "Celebration • Milestone • Festive",
    img: "/images/for_occasion.png",
    // Unsplash Search: luxury gift hamper birthday wedding festive aesthetic box
  },
];

export default function RelationshipSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    if (headingRef.current) {
      tl.from(headingRef.current.children, {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }

    tl.from(cardsRef.current, {
      y: 60,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    }, "-=0.4");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-forest py-24 px-6 md:px-16 relative overflow-hidden">
      {/* Top Decorative Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#c89b5b]" />

      {/* Heading */}
      <div ref={headingRef} className="text-center mb-20 max-w-4xl mx-auto flex flex-col items-center gap-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-background tracking-wide uppercase font-medium leading-tight">
          Find the Perfect Gift for Every Relationship
        </h2>
        <p className="text-background/80 text-lg max-w-xl">
          Thoughtfully curated hampers designed for every bond, moment, and personality.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 md:gap-8 max-w-[1400px] mx-auto w-full">
        {DATA.map((item, index) => (
          <div 
            key={index} 
            ref={(el) => { cardsRef.current[index] = el; }}
            className="flex flex-col items-center group cursor-pointer"
          >
            {/* Card Image */}
            <div className="w-full">
              <div className="relative w-full aspect-[3/4] rounded-t-full overflow-hidden bg-mint-100 shadow-lg">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
              </div>
            </div>

            {/* Label with Hover Swap */}
            <div className="w-full mt-6 text-center relative h-[80px] overflow-hidden">
              <div className="absolute inset-0 flex flex-col justify-start items-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[120%] group-hover:opacity-0">
                <h3 className="text-lg md:text-xl font-medium text-background tracking-wide">
                  {item.title}
                </h3>
                <p className="text-[12px] md:text-sm text-background/70 mt-1 max-w-[95%] mx-auto leading-tight">
                  {item.subtitle}
                </p>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-medium text-[#c89b5b] px-2 leading-relaxed">
                  {item.hoverText}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}