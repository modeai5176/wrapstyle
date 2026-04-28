"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import { Antonio } from "next/font/google";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Services.module.css";

gsap.registerPlugin(ScrollTrigger);

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-antonio",
});

const FLAVORS = [
  { name: "Birthday Hampers", color: "brown", rotation: "-8deg" },
  { name: "Wedding & Engagement", color: "red", rotation: "8deg" },
  { name: "New Home", color: "blue", rotation: "-8deg" },
  { name: "New Baby", color: "orange", rotation: "8deg" },
  { name: "The Sweet Tooth", color: "white", rotation: "-8deg" },
  { name: "The Wellness Edit", color: "black", rotation: "8deg" },
];

function getCardStyle(rotation: string): CSSProperties {
  return {
    ["--card-rotation" as keyof CSSProperties]: rotation,
  };
}

function SplitChars({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  return (
    <h2 className={className} aria-label={text}>
      {Array.from(text).map((char, index) => (
        <span key={`${text}-${index}`} className={styles.titleChar} data-char>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h2>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstLineRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const secondLineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const section = sectionRef.current;
      const pinStage = pinStageRef.current;
      const track = trackRef.current;
      const firstLine = firstLineRef.current;
      const accent = accentRef.current;
      const secondLine = secondLineRef.current;

      if (!section || !pinStage || !track || !firstLine || !accent || !secondLine) {
        return;
      }

      const firstChars = firstLine.querySelectorAll("[data-char]");
      const secondChars = secondLine.querySelectorAll("[data-char]");
      const refreshScroll = () => ScrollTrigger.refresh();
      const trackImages = Array.from(track.querySelectorAll("img"));

      trackImages.forEach((image) => {
        if (!image.complete) {
          image.addEventListener("load", refreshScroll, { once: true });
        }
      });

      gsap.from(firstChars, {
        yPercent: 200,
        stagger: 0.02,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 30%",
        },
      });

      gsap.to(accent, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 10%",
        },
      });

      gsap.from(secondChars, {
        yPercent: 200,
        stagger: 0.02,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 1%",
        },
      });

      mm.add("(min-width: 1025px)", () => {
        const getScrollAmount = () =>
          Math.max(0, track.scrollWidth - pinStage.clientWidth);

        if (!getScrollAmount()) {
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: pinStage,
            start: "top top",
            end: () => `+=${getScrollAmount() + window.innerWidth * 1.2}`,
            scrub: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 2,
          },
        });

        tl.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
        }, 0);
      });

      requestAnimationFrame(refreshScroll);

      return () => {
        trackImages.forEach((image) => {
          image.removeEventListener("load", refreshScroll);
        });
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className={`${styles.section} ${antonio.variable}`}>
      <div ref={pinStageRef} className={styles.pinStage}>
        <div className={styles.viewport}>
          <div ref={trackRef} className={styles.flavors}>
            <div className={styles.introPanel}>
              <div className={styles.titleStack}>
              <div ref={firstLineRef} className={styles.titleClip}>
                <SplitChars text="Discover 6" className={styles.titleLine} />
              </div>

              <div ref={accentRef} className={styles.accentWrap}>
                <div className={styles.accentInner}>
                  <h2 className={styles.accentText}>signature</h2>
                </div>
              </div>

              <div ref={secondLineRef} className={styles.titleClip}>
                <SplitChars text="gift collections" className={styles.titleLine} />
              </div>
              </div>
            </div>
            {FLAVORS.map((flavor) => (
              <div
                key={flavor.name}
                className={styles.card}
                style={getCardStyle(flavor.rotation)}
              >
                <img
                  src={`/spylt/images/${flavor.color}-bg.svg`}
                  alt=""
                  className={styles.cardBackground}
                />
                <img
                  src={`/spylt/images/${flavor.color}-gift.png`}
                  alt=""
                  className={styles.drink}
                />
                <img
                  src={`/spylt/images/${flavor.color}-elements.png`}
                  alt=""
                  className={styles.elements}
                />
                <h3 className={styles.cardTitle}>{flavor.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
