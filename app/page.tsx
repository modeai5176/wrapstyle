"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type MegaColumn = { heading: string; links: string[] };
type NavItem = { label: string; columns: MegaColumn[] };

const navData: NavItem[] = [
  {
    label: "HOME DECOR",
    columns: [
      { heading: "Wraps", links: ["Single Gift Wraps", "Multi-Pack Wraps", "Furoshiki Cloth", "Reusable Wraps", "Eco Kraft Range"] },
      { heading: "Ribbons & Trims", links: ["Satin Ribbon", "Velvet Ribbon", "Jute Twine", "Hand-Dyed Silk", "Tassels & Charms"] },
      { heading: "Seals & Tags", links: ["Wax Seals", "Letterpress Tags", "Foil Tags", "Hand-Lettered Tags", "Custom Stamps"] },
      { heading: "Boxes", links: ["Rigid Gift Boxes", "Magnetic Closure", "Drawer Boxes", "Hat Boxes", "Eco Mailers"] },
    ],
  },
  {
    label: "GIFTING",
    columns: [
      { heading: "Personal", links: ["Birthdays", "Anniversaries", "Thank You", "New Home", "Just Because"] },
      { heading: "Milestones", links: ["New Baby", "Graduation", "Engagement", "Retirement", "Promotion"] },
      { heading: "Curated Sets", links: ["The Essentials", "The Connoisseur", "The Wellness Edit", "The Sweet Tooth", "The Bookworm"] },
      { heading: "Add-Ons", links: ["Hand-Written Notes", "Dried Florals", "Wax Seal Service", "Gift Concierge", "Same-Day Wrap"] },
    ],
  },
  {
    label: "DIWALI GIFTS",
    columns: [
      { heading: "Hampers", links: ["Mithai Hamper", "Dry Fruit Hamper", "Tea & Treats", "Premium Sweets", "Hand-Painted Boxes"] },
      { heading: "Wraps", links: ["Marigold Edit", "Gold Foil", "Block-Printed", "Brass Accents", "Velvet & Silk"] },
      { heading: "For Family", links: ["Parents Edit", "Siblings", "Couples", "Grandparents", "Children"] },
      { heading: "Corporate Diwali", links: ["Bulk Hampers", "Co-Branded Wraps", "Client Gifting", "Employee Gifting", "Logistics Support"] },
    ],
  },
  {
    label: "BRANDS",
    columns: [
      { heading: "Stationery", links: ["Smythson", "Crane & Co.", "G. Lalo", "Original Crown Mill", "Papier d'Arménie"] },
      { heading: "Confectionery", links: ["La Maison du Chocolat", "Pierre Marcolini", "Ladurée", "Pichet Ong", "Bonnat"] },
      { heading: "Home", links: ["Diptyque", "Cire Trudon", "Astier de Villatte", "Astrid & Miyu", "Jonathan Adler"] },
      { heading: "Beauty", links: ["Aesop", "Byredo", "Le Labo", "Dr. Barbara Sturm", "Augustinus Bader"] },
    ],
  },
  {
    label: "CORPORATE",
    columns: [
      { heading: "Programmes", links: ["Client Gifting", "Employee Gifting", "Onboarding Kits", "Event Gifting", "Conference Sets"] },
      { heading: "Branded", links: ["Co-Branded Wraps", "Custom Boxes", "Embossed Tags", "Branded Ribbon", "Logo Wax Seals"] },
      { heading: "Logistics", links: ["Bulk Fulfilment", "Pan-India Dispatch", "International Shipping", "Storage & Hold", "Scheduled Send"] },
      { heading: "Industries", links: ["Finance", "Hospitality", "Real Estate", "Tech", "Fashion & Retail"] },
    ],
  },
  {
    label: "CATALOGUE",
    columns: [
      { heading: "By Material", links: ["Paper", "Cloth & Fabric", "Recycled & Kraft", "Foil & Metallic", "Hand-Painted"] },
      { heading: "By Palette", links: ["Mint & Sage", "Ivory & Pearl", "Crimson & Gold", "Indigo & Brass", "Pastels"] },
      { heading: "By Occasion", links: ["Weddings", "Birthdays", "Festive", "Corporate", "Editorial"] },
      { heading: "Lookbook", links: ["Spring/Summer 2026", "Festive 2025", "Wedding Edit", "Corporate Edit", "Archive"] },
    ],
  },
  {
    label: "WEDDINGS",
    columns: [
      { heading: "Suites", links: ["Invitation Suite", "Welcome Boxes", "Guest Favors", "Bridal Party Gifts", "Thank You Gifts"] },
      { heading: "Themes", links: ["Modern Mint", "Ivory & Lace", "Heritage Gold", "Garden Fresh", "Coastal Linen"] },
      { heading: "Services", links: ["Wedding Concierge", "On-Site Wrapping", "Destination Logistics", "Bespoke Sourcing", "Sample Boxes"] },
      { heading: "Resources", links: ["Planning Guide", "Lead Times", "Pricing Tiers", "Real Weddings", "Press"] },
    ],
  },
  {
    label: "BLOG",
    columns: [
      { heading: "Journal", links: ["Latest Posts", "Studio Diary", "Maker Stories", "Behind the Scenes", "Press Mentions"] },
      { heading: "How-To", links: ["The Perfect Bow", "Furoshiki Basics", "Wax Seal Care", "Eco Wrapping", "Layering Textures"] },
      { heading: "Inspiration", links: ["Seasonal Edit", "Colour Stories", "Real Weddings", "Corporate Case Studies", "Editorial Shoots"] },
      { heading: "Sustainability", links: ["Our Materials", "Sourcing Standards", "Recycling Guide", "Carbon-Neutral Shipping", "Partners"] },
    ],
  },
];

const faqData = [
  {
    question: "Do you offer bespoke wrapping for individual gifts?",
    answer: "Absolutely. We design fully bespoke wraps for personal gifts, milestones and keepsakes — from concept sketches to a hand-tied final reveal."
  },
  {
    question: "What materials do you use for corporate hampers?",
    answer: "We source premium, eco-conscious materials globally — heavyweight cotton papers, recycled board stocks, custom satin ribbons and natural fibre fillers."
  },
  {
    question: "How long does a custom commission typically take?",
    answer: "Lead times depend on complexity and volume. Signature wraps usually take 2–3 weeks; larger corporate runs typically need 4–6 weeks from brief to dispatch."
  },
  {
    question: "Can I order multiple seasonal collections at once?",
    answer: "Yes. We offer tiered bulk-ordering tailored for corporate gifting calendars, multi-event weddings and year-round retail programmes."
  }
];
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const navCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMenuEnter = (idx: number) => {
    if (navCloseTimer.current) {
      clearTimeout(navCloseTimer.current);
      navCloseTimer.current = null;
    }
    setOpenMenu(idx);
  };

  const handleMenuLeave = () => {
    navCloseTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const heroRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const collectionsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => { }, rootRef); // initialized empty context to satisfy TS with proper scope
    const timeout = setTimeout(() => {
      ctx.add(() => {
        const downCards = gsap.utils.toArray(".down-card");
        const upCards = gsap.utils.toArray(".up-card");

        gsap.set([".down-card", ".up-card"], {
          y: 0,
          clearProps: "transform",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=400",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        tl.to(downCards, { y: 500, ease: "none" }, 0);
        tl.to(upCards, { y: -500, ease: "none" }, 0);

        const leftText = gsap.utils.toArray(".left-text");
        const rightText = gsap.utils.toArray(".right-text");
        const middleContent = gsap.utils.toArray(".middle-content");

        gsap.set(middleContent, { autoAlpha: 0, scale: 0.85, y: 20 });

        const bottomTl = gsap.timeline({
          scrollTrigger: {
            trigger: bottomTextRef.current,
            start: "top top",
            end: "+=1200",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        bottomTl
          .to(leftText, { x: "-70vw", ease: "none" }, 0)
          .to(rightText, { x: "70vw", ease: "none" }, 0)
          .to(middleContent, { autoAlpha: 1, scale: 1, y: 0, ease: "power2.out" }, 0.2)
          .to(leftText, { autoAlpha: 0, ease: "power1.in" }, 0.5)
          .to(rightText, { autoAlpha: 0, ease: "power1.in" }, 0.5);

        // Video reveal — starts small/rounded, expands to fill viewport as user scrolls
        const videoWrapper = videoSectionRef.current?.querySelector(".video-wrapper");
        if (videoWrapper) {
          const videoTl = gsap.timeline({
            scrollTrigger: {
              trigger: videoSectionRef.current,
              start: "top bottom",
              end: "top top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          // CTA fades out alongside the video growing to fullscreen.
          // immediateRender: false prevents this tween from snapping CTA to 0 on page load —
          // it waits for the scroll trigger to actually advance before applying values.
          videoTl.to(
            middleContent,
            { autoAlpha: 0, ease: "power1.in", immediateRender: false },
            0
          );

          videoTl.fromTo(
            videoWrapper,
            { width: "40vw", height: "50vh", borderRadius: "24px" },
            {
              width: "100vw",
              height: "100vh",
              borderRadius: "0px",
              ease: "none",
            },
            0
          );
        }

        // Services — heading reveal + staggered card rise
        const servicesHeading = servicesRef.current?.querySelectorAll(".services-heading > *");
        if (servicesHeading && servicesHeading.length) {
          gsap.from(servicesHeading, {
            y: 60,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 75%",
              once: true,
            },
          });
        }

        const serviceCards = servicesRef.current?.querySelectorAll(".service-card");
        if (serviceCards && serviceCards.length) {
          gsap.from(serviceCards, {
            y: 80,
            autoAlpha: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 60%",
              once: true,
            },
          });
        }

        // Process — horizontal scroll pinned section
        const processTrack = processRef.current?.querySelector(".process-track") as HTMLElement | null;
        if (processRef.current && processTrack) {
          // Fixed horizontal distance sized off viewport — simple and robust.
          const scrollDistance = window.innerWidth * 0.9;

          gsap.to(processTrack, {
            x: -scrollDistance,
            ease: "none",
            scrollTrigger: {
              trigger: processRef.current,
              start: "top top",
              end: `+=${scrollDistance}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              refreshPriority: 1,
            },
          });
        }

        // Signature Collections — heading reveal + staggered card rise
        if (collectionsRef.current) {
          const colHeading = collectionsRef.current.querySelectorAll(".col-heading > *");
          if (colHeading.length) {
            gsap.from(colHeading, {
              y: 60,
              autoAlpha: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.12,
              scrollTrigger: {
                trigger: collectionsRef.current,
                start: "top 75%",
                once: true,
              },
            });
          }

          const colCards = collectionsRef.current.querySelectorAll(".col-card");
          if (colCards.length) {
            gsap.from(colCards, {
              y: 70,
              autoAlpha: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.1,
              scrollTrigger: {
                trigger: collectionsRef.current,
                start: "top 60%",
                once: true,
              },
            });
          }
        }

        // Final refresh so all triggers recompute positions relative to each other
        // (pin-spacers of earlier sections affect the positions of later ones)
        ScrollTrigger.refresh();
      });
    }, 50); // small delay fixes layout timing

    return () => {
      clearTimeout(timeout);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col flex-1 bg-mint-50 font-sans text-mint-900 relative overflow-x-hidden">
      {/* Navbar with mega menu */}
      <header className="relative z-50" onMouseLeave={handleMenuLeave}>
        <nav className="flex justify-between items-center py-7 px-14 text-sm font-semibold tracking-wider bg-mint-50">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L12 22M2 12L22 12M6 6L18 18M18 6L6 18" stroke="#0e3a2c" strokeWidth="2.5" strokeLinecap="square" />
            </svg>
            <span className="text-xl font-bold tracking-tight uppercase text-mint-900">WRAPSTYLE</span>
          </div>

          {/* Primary nav links */}
          <ul className="flex items-center gap-8 xl:gap-10 font-medium tracking-[0.12em] text-[11px] uppercase text-mint-800">
            {navData.map((item, idx) => {
              const active = openMenu === idx;
              return (
                <li
                  key={item.label}
                  onMouseEnter={() => handleMenuEnter(idx)}
                  className="relative"
                >
                  <a
                    href="#"
                    className={`relative py-2 transition-colors ${active ? "text-mint-900" : "hover:text-mint-600"}`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-0 right-0 -bottom-0.5 h-[2px] bg-mint-900 origin-left transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right icons */}
          <div className="flex items-center gap-6 text-mint-800 shrink-0">
            <button aria-label="Account" className="hover:text-mint-600 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
              </svg>
            </button>
            <button aria-label="Search" className="hover:text-mint-600 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
            <button aria-label="Cart" className="hover:text-mint-600 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 7h12l-1.2 11.4a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.6L6 7Z" />
                <path d="M9 7V5a3 3 0 0 1 6 0v2" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mega menu panel */}
        <div
          onMouseEnter={() => openMenu !== null && handleMenuEnter(openMenu)}
          className={`absolute left-0 right-0 top-full bg-mint-50 border-t border-mint-200/70 shadow-[0_24px_40px_-24px_rgba(14,58,44,0.25)] transition-all duration-300 ease-out ${
            openMenu !== null ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="px-14 py-12 grid grid-cols-5 gap-10">
            {openMenu !== null &&
              navData[openMenu].columns.map((col) => (
                <div key={col.heading} className="flex flex-col">
                  <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-mint-900 mb-5">
                    {col.heading}
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-mint-800/80 hover:text-mint-600 transition-colors normal-case"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </header>

      {/* Floating Gallery Area — matches hero horizontal padding */}
      <main
        ref={heroRef}
        className="flex-1 relative w-full mt-10 min-h-[55vh] px-14"
      >
        {/* DOWN (Top 4 Cards) - evenly spaced across the row */}
        <div className="down-card absolute w-[11vw] h-[14vw] top-[6%] left-[6%] rounded-xl overflow-hidden shadow-[0_18px_40px_-20px_rgba(14,58,44,0.35)]">
          <Image src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=600" alt="" fill className="object-cover" />
        </div>

        <div className="down-card absolute w-[11vw] h-[14vw] top-[6%] left-[29%] rounded-xl overflow-hidden shadow-[0_18px_40px_-20px_rgba(14,58,44,0.35)]">
          <Image src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600" alt="" fill className="object-cover" />
        </div>

        <div className="down-card absolute w-[11vw] h-[14vw] top-[6%] right-[29%] rounded-xl overflow-hidden shadow-[0_18px_40px_-20px_rgba(14,58,44,0.35)]">
          <Image src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=600" alt="" fill className="object-cover" />
        </div>

        <div className="down-card absolute w-[11vw] h-[14vw] top-[6%] right-[6%] rounded-xl overflow-hidden shadow-[0_18px_40px_-20px_rgba(14,58,44,0.35)]">
          <Image src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600" alt="" fill className="object-cover" />
        </div>

        {/* UP (Bottom 3 Cards) - offset between the top cards */}
        <div className="up-card absolute w-[11vw] h-[14vw] top-[46%] left-[17.5%] rounded-xl overflow-hidden shadow-[0_18px_40px_-20px_rgba(14,58,44,0.35)]">
          <Image src="https://images.unsplash.com/photo-1543661840-754854bfdbfc?q=80&w=600" alt="" fill className="object-cover" />
        </div>

        <div className="up-card absolute w-[11vw] h-[14vw] top-[46%] left-[44.5%] rounded-xl overflow-hidden shadow-[0_18px_40px_-20px_rgba(14,58,44,0.35)]">
          <Image src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600" alt="" fill className="object-cover" />
        </div>

        <div className="up-card absolute w-[11vw] h-[14vw] top-[46%] right-[17.5%] rounded-xl overflow-hidden shadow-[0_18px_40px_-20px_rgba(14,58,44,0.35)]">
          <Image src="https://images.unsplash.com/photo-1542838384-cb9fc2cc508d?q=80&w=600" alt="" fill className="object-cover" />
        </div>
      </main>

      {/* Massive Bottom Text Section */}
      <div
        ref={bottomTextRef}
        className="w-full relative h-[100vh] flex items-center justify-center bg-mint-50 px-14 mt-auto"
      >
        {/* Left/Right Text wrapper */}
        <div className="flex w-full justify-center items-center relative z-10 pointer-events-none">
          <h1 className="left-text font-display font-normal text-[20vw] leading-[1] text-mint-900 uppercase whitespace-nowrap">
            WRAP
          </h1>
          <h1 className="right-text font-display font-normal text-[20vw] leading-[1] text-mint-600 uppercase whitespace-nowrap">
            STYLE
          </h1>
        </div>

        {/* Middle Content */}
        <div className="middle-content absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none px-14">
          <p className="text-sm font-semibold mb-4 tracking-widest text-mint-700">(EST. 2014 — MUMBAI · LONDON)</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-normal uppercase max-w-4xl leading-[0.9] mb-10 tracking-tighter text-mint-900">
            BESPOKE GIFT WRAPPING<br />&amp; CORPORATE PACKAGING<br />FINISHED BY HAND
          </h2>
          <button className="border border-mint-900 bg-mint-900 text-mint-50 px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-mint-50 hover:text-mint-900 transition-colors pointer-events-auto">
            Start a Commission
          </button>
        </div>
      </div>

      {/* Video Reveal Section */}
      <section
        ref={videoSectionRef}
        className="w-full h-[100vh] bg-mint-50 flex items-center justify-center overflow-hidden"
      >
        <div className="video-wrapper relative overflow-hidden shadow-2xl ring-1 ring-mint-200">
          <video
            src="/gift_wrapping.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Services Section */}
      <section
        ref={servicesRef}
        className="w-full bg-mint-50 px-14 py-28 lg:py-40"
      >
        <div className="services-heading w-full mx-auto mb-16 lg:mb-24">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-5 text-mint-600">
            (Our Services)
          </p>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl uppercase leading-[0.95] tracking-tighter max-w-5xl text-mint-900">
            Wrapped with<br />intention, delivered<br />with craft.
          </h2>
          <p className="mt-8 max-w-xl text-base sm:text-lg text-mint-800/75 leading-relaxed">
            From intimate gifts to large-scale corporate orders, every wrap is designed, sourced and finished by hand at our studio.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {[
            {
              num: "01",
              title: "Luxury Gift Wrapping",
              desc: "Bespoke finishes on single gifts — premium papers, hand-tied ribbons, wax seals.",
              img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop",
            },
            {
              num: "02",
              title: "Corporate Hampers",
              desc: "Brand-aligned packaging at scale for client gifting and seasonal campaigns.",
              img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
            },
            {
              num: "03",
              title: "Wedding & Events",
              desc: "Coordinated suites — invitations, favors, guest gifts — tied to a single theme.",
              img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
            },
            {
              num: "04",
              title: "Retail Packaging",
              desc: "Shelf-ready packaging design and production for boutique brands.",
              img: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=800&auto=format&fit=crop",
            },
            {
              num: "05",
              title: "Seasonal Collections",
              desc: "Limited-edition wraps for holidays — Diwali, Christmas, Lunar New Year.",
              img: "https://images.unsplash.com/photo-1544816155-82aea1b11d06?q=80&w=800&auto=format&fit=crop",
            },
            {
              num: "06",
              title: "Custom Commissions",
              desc: "One-off packaging for launches, keepsakes, and editorial shoots.",
              img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
            },
          ].map((s) => (
            <article
              key={s.num}
              className="service-card group relative overflow-hidden aspect-[4/5] bg-mint-100 cursor-pointer rounded-xl"
            >
              <Image
                src={s.img}
                alt={s.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mint-900/85 via-mint-900/20 to-transparent" />
              <div className="absolute top-5 left-5 text-mint-100/90 text-xs font-semibold tracking-widest">
                {s.num}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7 text-mint-50">
                <h3 className="font-display text-2xl lg:text-3xl uppercase leading-tight tracking-tight mb-2">
                  {s.title}
                </h3>
                <p className="text-sm opacity-0 translate-y-2 group-hover:opacity-95 group-hover:translate-y-0 transition-all duration-500 ease-out leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Process Section — horizontal scroll pinned.
          overflow-x-hidden lives on the wrapper, NOT the pinned <section>, because
          a pinned element can't have overflow clipping on itself (breaks pin-spacer math). */}
      <div className="w-full overflow-x-hidden">
        <section
          ref={processRef}
          className="relative w-full bg-mint-200 h-screen"
        >
          <div className="process-track h-full flex w-max items-center gap-8 lg:gap-10 pl-14 pr-[10vw] will-change-transform">
            {/* Heading panel */}
            <div className="shrink-0 w-[80vw] sm:w-[55vw] lg:w-[40vw] max-w-[560px]">
              <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-mint-900">
                The Wrapstyle<br />commission journey
              </h2>
              <p className="mt-6 text-base sm:text-lg text-mint-800/80 leading-relaxed max-w-md">
                Every commission follows a crafted journey — from first sketch to the final hand-tied bow.
              </p>
            </div>

            {/* Process cards */}
            {[
              {
                num: "01",
                title: "Brief",
                desc: "Listening to your story, occasion and brand before a single sheet is cut.",
                img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop",
              },
              {
                num: "02",
                title: "Design",
                desc: "Concept boards, palette and material sampling crafted around your vision.",
                img: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=800&auto=format&fit=crop",
              },
              {
                num: "03",
                title: "Sourcing",
                desc: "Premium papers, ribbons and embellishments sourced from trusted makers worldwide.",
                img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
              },
              {
                num: "04",
                title: "Wrapping",
                desc: "Each piece is folded, tied and finished by hand in our atelier.",
                img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
              },
              {
                num: "05",
                title: "Finishing",
                desc: "Wax seals, hand-lettered tags and signature touches that elevate every gift.",
                img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
              },
              {
                num: "06",
                title: "Delivery",
                desc: "White-glove dispatch with protective inserts — arriving as flawlessly as it left.",
                img: "https://images.unsplash.com/photo-1544816155-82aea1b11d06?q=80&w=800&auto=format&fit=crop",
              },
            ].map((p) => (
              <article
                key={p.num}
                className="process-card shrink-0 w-[75vw] sm:w-[44vw] lg:w-[30vw] max-w-[420px] h-[70vh] max-h-[620px] bg-mint-50 rounded-2xl shadow-[0_18px_50px_-18px_rgba(14,58,44,0.25)] p-8 lg:p-10 flex flex-col"
              >
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-sans text-3xl lg:text-4xl font-bold text-mint-600">
                    {p.num}
                  </span>
                  <h3 className="font-sans text-2xl lg:text-3xl font-bold tracking-tight text-mint-900">
                    {p.title}
                  </h3>
                </div>

                <div className="relative flex-1 rounded-xl overflow-hidden bg-mint-100">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover"
                  />
                </div>

                <p className="mt-6 text-sm lg:text-base text-mint-800/80 leading-relaxed">
                  {p.desc}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Signature Collections Section — 4×2 product grid */}
      <section
        ref={collectionsRef}
        className="w-full bg-mint-50 px-14 py-28 lg:py-40"
      >
        <div className="col-heading w-full mx-auto mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-5 text-mint-600">
              (Signature Collections)
            </p>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl uppercase leading-[0.95] tracking-tighter max-w-4xl text-mint-900">
              Seasonal drops,<br />handcrafted.
            </h2>
          </div>
          <p className="max-w-md text-base sm:text-lg text-mint-800/75 leading-relaxed">
            A rotating edit of limited-run wraps — themed for the moments that matter.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {[
            {
              title: "Mint Botanical",
              tag: "Spring",
              img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop",
            },
            {
              title: "Gold Marigold",
              tag: "Diwali",
              img: "https://images.unsplash.com/photo-1542838384-cb9fc2cc508d?q=80&w=800&auto=format&fit=crop",
            },
            {
              title: "Pastel Bloom",
              tag: "Birthdays",
              img: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop",
            },
            {
              title: "Ivory Lace",
              tag: "Weddings",
              img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
            },
            {
              title: "Sage Linen",
              tag: "Corporate",
              img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
            },
            {
              title: "Jade Forest",
              tag: "Lunar New Year",
              img: "https://images.unsplash.com/photo-1543661840-754854bfdbfc?q=80&w=800&auto=format&fit=crop",
            },
            {
              title: "Eucalyptus Twine",
              tag: "Autumn",
              img: "https://images.unsplash.com/photo-1574182245536-39219ea2b54d?q=80&w=800&auto=format&fit=crop",
            },
            {
              title: "Pearl Ribbon",
              tag: "Editorial",
              img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
            },
          ].map((c) => (
            <article
              key={c.title}
              className="col-card group relative overflow-hidden aspect-[3/4] bg-mint-100 cursor-pointer rounded-xl"
            >
              <Image
                src={c.img}
                alt={c.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mint-900/85 via-mint-900/20 to-transparent" />
              <div className="absolute top-4 left-4 text-mint-100/90 text-[10px] font-semibold tracking-[0.25em] uppercase">
                {c.tag}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 text-mint-50">
                <h3 className="font-display text-xl lg:text-2xl uppercase leading-tight tracking-tight">
                  {c.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full bg-mint-50 px-14 py-24 lg:py-32">
        <div className="w-full mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Left Image */}
          <div className="w-full lg:w-[40%] relative min-h-[50vh] lg:min-h-[85vh] rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1200&auto=format&fit=crop"
              alt="Wrapstyle atelier"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-[60%] flex flex-col pt-4">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-6 text-mint-600 font-sans">
              (WHY WRAPSTYLE)
            </p>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-[72px] uppercase leading-[1.1] mb-12 sm:mb-16 font-bold text-mint-900 border-none">
              A STUDIO BUILT ON CRAFT, SUSTAINABILITY AND THE QUIET LUXURY OF A BEAUTIFULLY WRAPPED GIFT.
            </h2>

            <div className="flex flex-col gap-6 w-full">
              {/* Top Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Card 1 */}
                <div className="bg-mint-100 p-8 sm:p-10 relative flex flex-col justify-between min-h-[300px] rounded-xl">
                  <h3 className="font-sans font-bold text-lg sm:text-xl uppercase tracking-tight relative z-10 w-3/4 text-mint-900">
                    HAND-FINISHED, ALWAYS
                  </h3>
                  <div className="absolute top-4 right-6 font-sans font-bold text-[120px] sm:text-[140px] leading-[0.8] text-mint-50 select-none z-0">
                    01
                  </div>
                  <p className="text-sm sm:text-base text-mint-800/75 leading-relaxed max-w-[260px] relative z-10 mt-16 font-sans">
                    Every fold, ribbon and seal is finished by a real pair of hands — never machine-pressed, never rushed.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-mint-100 p-8 sm:p-10 relative flex flex-col justify-between min-h-[300px] rounded-xl">
                  <h3 className="font-sans font-bold text-lg sm:text-xl uppercase tracking-tight relative z-10 w-[85%] text-mint-900">
                    SUSTAINABLE BY DEFAULT
                  </h3>
                  <div className="absolute top-4 right-6 font-sans font-bold text-[120px] sm:text-[140px] leading-[0.8] text-mint-50 select-none z-0">
                    02
                  </div>
                  <p className="text-sm sm:text-base text-mint-800/75 leading-relaxed max-w-[260px] relative z-10 mt-16 font-sans">
                    FSC-certified papers, recycled fillers and natural fibre ribbons are our baseline — beautiful and responsible.
                  </p>
                </div>
              </div>

              {/* Bottom Full Width Card */}
              <div className="bg-mint-100 p-8 sm:p-10 flex flex-col lg:flex-row gap-8 justify-between relative min-h-[320px] rounded-xl">
                <div className="flex flex-col justify-between flex-1">
                  <h3 className="font-sans font-bold text-lg sm:text-xl uppercase tracking-tight text-mint-900 max-w-[220px]">
                    BUILT FOR BRANDS &amp; PEOPLE
                  </h3>
                  <p className="text-sm sm:text-base text-mint-800/75 leading-relaxed max-w-[320px] mt-12 lg:mt-0 font-sans">
                    From a single anniversary gift to thousands of corporate hampers — the same studio, the same standard.
                  </p>
                </div>
                <div className="w-full lg:w-[50%] xl:w-[55%] relative min-h-[240px] lg:min-h-0 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=800&auto=format&fit=crop"
                    alt="Wrapstyle corporate hampers"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-mint-200 px-14 py-24 lg:py-32">
        <div className="w-full mx-auto flex flex-col">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-mint-700 font-sans">
                (CLIENT NOTES)
              </p>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-[72px] uppercase leading-[1.1] font-bold text-mint-900 max-w-3xl">
                KIND WORDS FROM<br />OUR CLIENTS
              </h2>
            </div>

            {/* Arrows */}
            <div className="flex gap-4 pb-2">
              <button className="w-12 h-12 flex items-center justify-center bg-mint-50 hover:bg-mint-100 transition-colors rounded-full" aria-label="Previous testimonial">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0e3a2c" strokeWidth="1.5" strokeLinecap="square">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" />
                </svg>
              </button>
              <button className="w-12 h-12 flex items-center justify-center bg-mint-50 hover:bg-mint-100 transition-colors rounded-full" aria-label="Next testimonial">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0e3a2c" strokeWidth="1.5" strokeLinecap="square">
                  <path d="M5 12H19M19 12L12 19M19 12L12 5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Card 1 */}
            <div className="bg-mint-50 p-8 sm:p-12 lg:p-14 flex flex-col justify-between min-h-[380px] shadow-sm rounded-xl">
              <p className="font-sans font-bold text-xl sm:text-2xl lg:text-[26px] uppercase leading-[1.3] tracking-tight text-mint-900">
                &ldquo;WRAPSTYLE TURNED OUR DIWALI HAMPERS INTO THE MOMENT EVERY CLIENT TALKED ABOUT — FAULTLESS DETAIL, ON BRAND, ON TIME.&rdquo;
              </p>

              <div className="flex items-center gap-5 mt-16">
                <div className="w-[60px] h-[60px] relative rounded-full overflow-hidden shrink-0">
                  <Image src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" alt="Rosalina D. Williamson" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-[17px] uppercase tracking-tight text-mint-900 mb-1">
                    ROSALINA D. WILLIAMSON
                  </h4>
                  <p className="text-xs uppercase tracking-widest text-mint-700/80">
                    HEAD OF MARKETING, CYBERY
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-mint-50 p-8 sm:p-12 lg:p-14 flex flex-col justify-between min-h-[380px] shadow-sm rounded-xl">
              <p className="font-sans font-bold text-xl sm:text-2xl lg:text-[26px] uppercase leading-[1.3] tracking-tight text-mint-900">
                &ldquo;THE WEDDING SUITE THEY BUILT FOR US — INVITES, FAVORS, GUEST GIFTS — FELT LIKE A SINGLE PIECE OF ART.&rdquo;
              </p>

              <div className="flex items-center gap-5 mt-16">
                <div className="w-[60px] h-[60px] relative rounded-full overflow-hidden shrink-0">
                  <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" alt="Julianne J. Stam" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-[17px] uppercase tracking-tight text-mint-900 mb-1">
                    JULIANNE J. STAM
                  </h4>
                  <p className="text-xs uppercase tracking-widest text-mint-700/80">
                    BRIDE &amp; FOUNDER, MEZPAY
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-mint-50 px-14 py-24 lg:py-32 border-t border-mint-200">
        <div className="w-full mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">

          {/* Left: Title */}
          <div className="w-full lg:w-[40%] flex flex-col">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-6 text-mint-600 font-sans">
              (FAQ)
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[72px] uppercase leading-[1.1] font-bold text-mint-900 max-w-sm">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          {/* Right: Accordion */}
          <div className="w-full lg:w-[60%] flex flex-col">
            {faqData.map((faq, idx) => (
              <div key={idx} className="border-b border-mint-300/60 group">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full py-8 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-sans font-bold text-lg sm:text-xl uppercase tracking-wider text-mint-900 max-w-[85%] pr-4">
                    {faq.question}
                  </span>
                  <div className="relative w-6 h-6 shrink-0 flex items-center justify-center">
                    <span className="absolute w-full h-[2px] bg-mint-900"></span>
                    <span className={`absolute w-full h-[2px] bg-mint-900 transition-transform duration-300 ${openFaq === idx ? 'rotate-0 opacity-0' : 'rotate-90'}`}></span>
                  </div>
                </button>
                <div
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${openFaq === idx ? 'grid-rows-[1fr] opacity-100 mb-8' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-base sm:text-lg text-mint-800/80 leading-relaxed font-sans max-w-2xl pr-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-mint-900 text-mint-50 pt-24 lg:pt-32 pb-12 px-14 flex flex-col">
        <div className="w-full mx-auto w-full flex flex-col gap-16 lg:gap-32">

          {/* Top Row: Newsletter & Links */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 w-full">
            {/* Newsletter */}
            <div className="flex flex-col max-w-md w-full">
              <h3 className="font-sans font-bold text-xl sm:text-2xl uppercase tracking-widest mb-4">
                Join our newsletter
              </h3>
              <p className="text-sm text-mint-200/80 mb-8 font-sans leading-relaxed">
                Seasonal drops, behind-the-scenes from the atelier, and early access to limited collections — once a month, never more.
              </p>
              <form className="flex border-b border-mint-200/30 pb-3 relative w-full group">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  className="bg-transparent w-full outline-none text-sm uppercase tracking-widest text-mint-50 placeholder-mint-200/50 font-sans"
                />
                <button type="submit" className="text-mint-50 hover:text-mint-300 transition-colors uppercase tracking-widest text-sm font-bold flex items-center gap-2 shrink-0">
                  Submit
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                    <path d="M5 12H19M19 12L12 19M19 12L12 5" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Navigation & Socials */}
            <div className="flex flex-col sm:flex-row gap-12 sm:gap-16 lg:gap-24 w-full lg:w-auto lg:justify-end">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-mint-300/70 mb-2">Explore</span>
                <a href="#" className="font-sans text-sm uppercase tracking-widest hover:text-mint-300 transition-colors">Home</a>
                <a href="#" className="font-sans text-sm uppercase tracking-widest hover:text-mint-300 transition-colors">About Us</a>
                <a href="#" className="font-sans text-sm uppercase tracking-widest hover:text-mint-300 transition-colors">Services</a>
                <a href="#" className="font-sans text-sm uppercase tracking-widest hover:text-mint-300 transition-colors">Collections</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-mint-300/70 mb-2">Socials</span>
                <a href="#" className="font-sans text-sm uppercase tracking-widest hover:text-mint-300 transition-colors">Instagram</a>
                <a href="#" className="font-sans text-sm uppercase tracking-widest hover:text-mint-300 transition-colors">Twitter</a>
                <a href="#" className="font-sans text-sm uppercase tracking-widest hover:text-mint-300 transition-colors">LinkedIn</a>
                <a href="#" className="font-sans text-sm uppercase tracking-widest hover:text-mint-300 transition-colors">Pinterest</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-mint-300/70 mb-2">Contact</span>
                <a href="mailto:HELLO@WRAPSTYLE.CO" className="font-sans text-sm uppercase tracking-widest hover:text-mint-300 transition-colors">HELLO@WRAPSTYLE.CO</a>
                <a href="tel:+919821550199" className="font-sans text-sm uppercase tracking-widest hover:text-mint-300 transition-colors">+91 98215 50199</a>
                <p className="font-sans text-sm uppercase tracking-widest text-mint-200/70 mt-2 max-w-[220px] leading-relaxed">
                  ATELIER 14, BANDRA WEST<br />MUMBAI, IN 400050
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Row: Giant Wordmark */}
          <div className="flex flex-col mt-auto w-full pt-10 border-t border-mint-200/20">
            <h1 className="font-display font-bold text-[18vw] lg:text-[16vw] leading-[1.1] uppercase w-full text-center select-none text-mint-50/95">
              WRAPSTYLE
            </h1>
            <div className="flex flex-col sm:flex-row justify-between items-center w-full mt-10 gap-6 text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] text-mint-300/70">
              <p>&copy; {new Date().getFullYear()} WRAPSTYLE STUDIO. ALL RIGHTS RESERVED.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-mint-50 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-mint-50 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
