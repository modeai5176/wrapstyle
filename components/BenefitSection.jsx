"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import ClipPathTitle from "@/components/ClipPathTitle";
import gsap from "gsap";
// import VideoPinSection from "@/components/VideoPinSection";
import styles from "./BenefitSection.module.css";

const BenefitSection = () => {
  const sectionRef = useRef(null);
  const outroRef = useRef(null);

  useGSAP(() => {
    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "top top",
        scrub: 1.5,
      },
    });

    revealTl
      .to(`.${styles.firstTitle}`, {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(`.${styles.secondTitle}`, {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(`.${styles.thirdTitle}`, {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(`.${styles.fourthTitle}`, {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .fromTo(outroRef.current, {
        yPercent: 65,
        xPercent: -8,
        autoAlpha: 0,
        rotate: -4,
      }, {
        duration: 0.9,
        yPercent: 0,
        xPercent: 0,
        autoAlpha: 1,
        rotate: -2,
        ease: "power3.out",
      });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles.benefitSection}>
      <div className="container mx-auto pt-20">
        <div className={styles.stack}>
          <p className={styles.copy}>
            Unlock the Advantages: <br />
            Explore the Key Benefits of Choosing SPYLT
          </p>

          <div className={`mt-20 ${styles.titles}`}>
            <ClipPathTitle
              title={"THOUGHTFULLY CURATED"}
              color={"#F8F7F4"}
              bg={"#3F5F52"}
              className={styles.firstTitle}
              borderColor={"#F8F7F4"}
            />
            <ClipPathTitle
              title={"ELEGANT + TIMELESS"}
              color={"#2f4a40"}
              bg={"#F8F7F4"}
              className={styles.secondTitle}
              borderColor={"#F8F7F4"}
            />
            <ClipPathTitle
              title={"LUXURY PACKAGING"}
              color={"#F8F7F4"}
              bg={"#9FB7A7"}
              className={styles.thirdTitle}
              borderColor={"#F8F7F4"}
            />
            <ClipPathTitle
              title={"MADE TO DELIGHT"}
              color={"#2f4a40"}
              bg={"#dfe7e2"}
              className={styles.fourthTitle}
              borderColor={"#F8F7F4"}
            />
          </div>

          <div ref={outroRef} className={styles.outro}>
            <p className={styles.outroText}>And much more ...</p>
          </div>
        </div>
      </div>

      {/* <div className="relative overlay-box">
        <VideoPinSection />
      </div> */}
    </section>
  );
};

export default BenefitSection;
