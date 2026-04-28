"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServicesSection from "@/components/Services";
import RelationshipSection from "@/components/RelationshipSection";
import CustomHamperSection from "@/components/CustomHamperSection";
import TestimonialSection2 from "@/components/testimonial2";
import HeroSection from "../components/HeroSection";
import "./hero.css";
import BenefitSection from "@/components/BenefitSection";

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

const PRODUCTS = [
  {
    name: "Luxury Celebration Hamper",
    price: "₹2,499",
    img: "/images/gift_hamper_1.jpg",
  },
  {
    name: "Minimalist Gift Box",
    price: "₹1,599",
    img: "/images/gift_hamper_2.jpg",
  },
  {
    name: "Premium Wedding Hamper",
    price: "₹3,299",
    img: "/images/gift_hamper_3.jpg",
  },
  {
    name: "Festive Delight Box",
    price: "₹1,999",
    oldPrice: "₹2,499",
    img: "/images/gift_hamper_4.jpg",
    sale: true,
  },
];

const PRODUCTS_CUSTOM = [
  {
    name: "Luxury Celebration Hamper",
    price: "₹2,499",
    img: "/images/personal_custom_hamper.jpg",
  },
  {
    name: "Minimalist Gift Box",
    price: "₹1,599",
    img: "/images/personal_custom_hamper_2.jpg",
  },
  {
    name: "Premium Wedding Hamper",
    price: "₹3,299",
    img: "/images/personal_custom_hamper_3.jpg",
  },
  {
    name: "Festive Delight Box",
    price: "₹1,999",
    oldPrice: "₹2,499",
    img: "/images/personal_custom_hamper_4.jpg",
    sale: true,
  },
];

const giftingBenefits = [
  {
    title: "CURATED COLLECTIONS",
    className: "bg-[#f2ebe2] text-forest border-[#2f4a40] rotate-[3deg] relative z-10",
  },
  {
    title: "PERSONAL + MEANINGFUL",
    className: "bg-forest text-ivory border-[#f2ebe2] -rotate-[1deg] md:-translate-y-5",
  },
  {
    title: "LUXURY PRESENTATION",
    className: "bg-[#d4e0d7] text-forest border-[#2f4a40] rotate-[1deg] md:-translate-y-12 relative z-10",
  },
  {
    title: "DESIGNED TO IMPRESS",
    className: "bg-[#9fb7a7] text-[#21372f] border-[#f2ebe2] -rotate-[5deg] md:-translate-y-12",
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isNavSticky, setIsNavSticky] = useState(false);
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

  const rootRef = useRef<HTMLDivElement>(null);
  const benefitRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const collectionsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => { }, rootRef); // initialized empty context to satisfy TS with proper scope
    const timeout = setTimeout(() => {
      ctx.add(() => {

        // Services — heading reveal + staggered card rise
        // Process — horizontal scroll pinned section
        if (benefitRef.current) {
          const benefitTitles = benefitRef.current.querySelectorAll(".benefit-title");

          if (benefitTitles.length) {
            const revealTl = gsap.timeline({
              scrollTrigger: {
                trigger: benefitRef.current,
                start: "top 60%",
                end: "top top",
                scrub: 1.5,
              },
            });

            benefitTitles.forEach((title) => {
              revealTl.to(title, {
                duration: 1,
                opacity: 1,
                clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
                ease: "circ.out",
              });
            });
          }
        }

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

  useEffect(() => {
    const handleScroll = () => {
      setIsNavSticky(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) {
      return;
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileNavOpen]);

  return (
    <div ref={rootRef} className="flex flex-col flex-1 bg-background font-sans text-mint-900 relative overflow-x-hidden">
      {/* Navbar with mega menu */}
      <header
        className={`z-50 transition-all duration-300 ${
          isNavSticky
            ? "fixed inset-x-0 top-0"
            : "relative"
        }`}
        onMouseLeave={handleMenuLeave}
      >
        <nav
          className={`flex justify-between items-center px-4 py-3 md:px-8 lg:px-14 text-sm font-semibold tracking-wider transition-all duration-300 ${
            isNavSticky
              ? "bg-forest/95 shadow-[0_18px_45px_-24px_rgba(14,58,44,0.45)] backdrop-blur"
              : "bg-forest"
          }`}
        >
          {/* Logo */}
          <div className="relative flex items-center gap-3 shrink-0">
            <Image
              src="/logo.png"
              alt="Wrapstyle logo"
              width={1536}
              height={924}
              className="relative z-10 block h-14 w-36 max-w-none drop-shadow-[0_16px_28px_rgba(0,0,0,0.3)] md:h-20 md:w-48 lg:h-[96px] lg:w-56"
              priority
            />
          </div>

          {/* Primary nav links */}
          <ul className="hidden lg:flex items-center gap-7 xl:gap-8 font-medium tracking-[0.12em] text-[10px] uppercase text-mint-800">
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
                    className={`relative py-2 transition-colors text-ivory ${active ? "text-ivory" : "hover:text-ivory"}`}
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
          <div className="flex items-center gap-3 md:gap-5 text-mint-800 shrink-0">
            <button aria-label="Account" className="hover:text-mint-600 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F8F7F4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
              </svg>
            </button>
            <button aria-label="Search" className="hover:text-mint-600 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F8F7F4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
            <button aria-label="Cart" className="hover:text-mint-600 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F8F7F4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 7h12l-1.2 11.4a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.6L6 7Z" />
                <path d="M9 7V5a3 3 0 0 1 6 0v2" />
              </svg>
            </button>
            <button
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((open) => !open)}
              className="flex lg:hidden h-10 w-10 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:bg-ivory/10"
            >
              <span className="sr-only">Menu</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F8F7F4" strokeWidth="1.8" strokeLinecap="round">
                {mobileNavOpen ? (
                  <>
                    <path d="M6 6 18 18" />
                    <path d="M18 6 6 18" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mega menu panel */}
        <div
          onMouseEnter={() => openMenu !== null && handleMenuEnter(openMenu)}
          className={`absolute left-0 right-0 top-full hidden lg:block bg-ivory border-t border-mint-200/70 shadow-[0_24px_40px_-24px_rgba(14,58,44,0.25)] transition-all duration-300 ease-out ${
            openMenu !== null ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="px-14 py-12 grid grid-cols-5 gap-10">
            {openMenu !== null &&
              navData[openMenu].columns.map((col) => (
                <div key={col.heading} className="flex flex-col">
                  <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-forest mb-5">
                    {col.heading}
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-foreground transition-colors normal-case"
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

        <div
          className={`lg:hidden overflow-hidden border-t border-ivory/15 bg-forest/95 backdrop-blur transition-[max-height,opacity] duration-300 ${
            mobileNavOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-5 pt-3 md:px-8">
            <ul className="flex flex-col divide-y divide-ivory/10">
              {navData.map((item) => (
                <li key={item.label}>
                  <a
                    href="#"
                    onClick={() => setMobileNavOpen(false)}
                    className="flex items-center justify-between py-4 text-sm font-medium tracking-[0.16em] uppercase text-ivory"
                  >
                    <span>{item.label}</span>
                    <span className="text-ivory/55">+</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* ═══ NEW HERO — Mojito-inspired scroll-driven gift drop ═══ */}
      {isNavSticky ? <div className="h-[124px]" aria-hidden="true" /> : null}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection/>

      <RelationshipSection/>

      <section className="w-full px-6 md:px-14 py-16">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h2 className="text-5xl font-medium tracking-wide text-forest uppercase">
              Gift Hampers
            </h2>
            <a
              href="#"
              className="text-sm tracking-widest underline mt-4 inline-block text-sage"
            >
              VIEW ALL
            </a>
          </div>
        </div>

        {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

            {PRODUCTS.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer transition-transform duration-300 hover:-translate-y-2"
              >

                {/* Square Image */}
                <div className="relative w-full aspect-square overflow-hidden bg-[#f3efe9]">

                  {/* Sale Badge */}
                  {item.sale && (
                    <div className="absolute top-3 left-3 z-10 text-[10px] px-2 py-1 border border-black bg-white">
                      Sale
                    </div>
                  )}

                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="text-center mt-4 space-y-1">
                  <p className="text-[13px] tracking-wide uppercase text-forest">
                    {item.name}
                  </p>

                  <div className="text-[13px] text-foreground">
                    {item.oldPrice && (
                      <span className="line-through opacity-50 mr-2">
                        {item.oldPrice}
                      </span>
                    )}
                    <span>{item.price}</span>
                  </div>
                </div>

              </div>
            ))}

          </div>
      </section>


      <section className="w-full px-6 md:px-14 py-16">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h2 className="text-5xl font-medium tracking-wide text-forest uppercase">
              Personalized & Custom Gift Hampers
            </h2>
            <a
              href="#"
              className="text-sm tracking-widest underline mt-3 inline-block text-sage"
            >
              VIEW ALL
            </a>
          </div>
        </div>

        {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

            {PRODUCTS_CUSTOM.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer transition-transform duration-300 hover:-translate-y-2"
              >

                {/* Square Image */}
                <div className="relative w-full aspect-square overflow-hidden bg-[#f3efe9]">

                  {/* Sale Badge */}
                  {item.sale && (
                    <div className="absolute top-3 left-3 z-10 text-[10px] px-2 py-1 border border-black bg-white">
                      Sale
                    </div>
                  )}

                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="text-center mt-4 space-y-1">
                  <p className="text-[13px] tracking-wide uppercase text-forest">
                    {item.name}
                  </p>

                  <div className="text-[13px] text-foreground">
                    {item.oldPrice && (
                      <span className="line-through opacity-50 mr-2">
                        {item.oldPrice}
                      </span>
                    )}
                    <span>{item.price}</span>
                  </div>
                </div>

              </div>
            ))}

          </div>
      </section>

      <section className="w-full  px-6 md:px-14 py-16">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h2 className="text-5xl font-medium tracking-wide text-forest uppercase">
              Trousseau Packing Gift Hampers
            </h2>
            <a
              href="#"
              className="text-sm tracking-widest underline mt-3 inline-block text-sage"
            >
              VIEW ALL
            </a>
          </div>
        </div>

        {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

            {PRODUCTS.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer transition-transform duration-300 hover:-translate-y-2"
              >

                {/* Square Image */}
                <div className="relative w-full aspect-square overflow-hidden bg-[#f3efe9]">

                  {/* Sale Badge */}
                  {item.sale && (
                    <div className="absolute top-3 left-3 z-10 text-[10px] px-2 py-1 border border-black bg-white">
                      Sale
                    </div>
                  )}

                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="text-center mt-4 space-y-1">
                  <p className="text-[13px] tracking-wide uppercase text-forest">
                    {item.name}
                  </p>

                  <div className="text-[13px] text-foreground">
                    {item.oldPrice && (
                      <span className="line-through opacity-50 mr-2">
                        {item.oldPrice}
                      </span>
                    )}
                    <span>{item.price}</span>
                  </div>
                </div>

              </div>
            ))}

          </div>
      </section>

      {/* Process Section — horizontal scroll pinned.
          overflow-x-hidden lives on the wrapper, NOT the pinned <section>, because
          a pinned element can't have overflow clipping on itself (breaks pin-spacer math). */}
      {/* <section
        ref={benefitRef}
        className="w-full overflow-hidden bg-[#2f3f38] px-6 py-20 md:px-14 lg:min-h-screen lg:py-24"
      >
        <div className="mx-auto flex max-w-[1500px] flex-col items-center">
          <p className="max-w-[720px] text-center text-base leading-[1.15] text-[#f2ebe2] md:text-lg">
            Elevate Every Celebration
            <br />
            With Signature Gifting Experiences
          </p>

          <div className="mt-16 flex w-full flex-col items-center md:mt-20">
            {giftingBenefits.map((item) => (
              <div
                key={item.title}
                className="w-full text-center [font-size:clamp(2.9rem,8.2vw,8.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.05em]"
              >
                <div
                  className={`benefit-title inline-block border-[0.5vw] opacity-0 ${item.className}`}
                  style={{
                    clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
                  }}
                >
                  <div className="px-3 pb-5 pt-3 md:px-14 md:pb-5 md:pt-0">
                    <h2>{item.title}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <BenefitSection />

      <div className="min-h-screen w-full overflow-x-hidden">
        <section
          ref={processRef}
          className="relative w-full bg-mint-200 h-screen"
        >
          <div className="process-track h-full flex w-max items-center gap-8 lg:gap-10 pl-14 pr-[10vw] will-change-transform">
            <div className="shrink-0 w-[80vw] sm:w-[55vw] lg:w-[40vw] max-w-[560px]">
              <h2 className="font-sans font-medium text-5xl tracking-tight leading-[1.05] text-forest">
                The Wrapstyle<br />commission journey
              </h2>
              <p className="mt-6 text-base sm:text-lg text-sage leading-relaxed max-w-md">
                Every commission follows a crafted journey — from first sketch to the final hand-tied bow.
              </p>
            </div>

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
                className="bg-sage shrink-0 w-[75vw] sm:w-[44vw] lg:w-[30vw] max-w-[420px] h-[70vh] max-h-[620px] bg-mint-50 rounded-2xl shadow-[0_18px_50px_-18px_rgba(14,58,44,0.25)] p-8 lg:p-10 flex flex-col"
              >
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-sans text-3xl lg:text-4xl font-medium text-mint-600">
                    {p.num}
                  </span>
                  <h3 className="font-sans text-2xl lg:text-3xl font-semibold tracking-tight text-foreground">
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
      {/* <section
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
      </section> */}

      {/* Why Choose Us Section */}
      <CustomHamperSection/>

      {/* <TestimonialSection /> */}
      <TestimonialSection2 />

      {/* FAQ Section */}
      <section className="w-full  px-14 py-24 lg:py-32 border-t border-mint-200">
        <div className="w-full mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">

          <div className="w-full lg:w-[40%] flex flex-col">
            <h2 className="font-display text-5xl font-medium uppercase leading-[1.1] text-forest max-w-sm">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="w-full lg:w-[60%] flex flex-col">
            {faqData.map((faq, idx) => (
              <div key={idx} className="border-b border-mint-300/60 group">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full py-8 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-sans font-semibold text-lg sm:text-xl uppercase tracking-wider text-foreground max-w-[85%] pr-4">
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
                    <p className="text-base sm:text-lg text-forest/80 leading-relaxed font-sans max-w-2xl pr-4">
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
      <footer className="w-full text-mint-50 pt-24 lg:pt-32 pb-12 px-14 flex flex-col bg-[#9FB7A7]">
        <div className="w-full mx-auto w-full flex flex-col gap-16 lg:gap-32">

          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 w-full">
            <div className="flex flex-col max-w-md w-full">
              <h3 className="font-sans font-semibold text-xl sm:text-2xl uppercase tracking-widest mb-4 text-forest">
                Join our newsletter
              </h3>
              <p className="text-sm text-forest/80 mb-8 font-sans leading-relaxed">
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

            <div className="flex flex-col sm:flex-row gap-12 sm:gap-16 lg:gap-24 w-full lg:w-auto lg:justify-end">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-forest mb-2">Explore</span>
                <a href="#" className="font-sans text-sm uppercase tracking-widest text-foreground/80 hover:text-foreground transition-colors">Home</a>
                <a href="#" className="font-sans text-sm uppercase tracking-widest text-foreground/80 hover:text-foreground transition-colors">About Us</a>
                <a href="#" className="font-sans text-sm uppercase tracking-widest text-foreground/80 hover:text-foreground transition-colors">Services</a>
                <a href="#" className="font-sans text-sm uppercase tracking-widest text-foreground/80  transition-colors">Collections</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-forest mb-2">Socials</span>
                <a href="#" className="font-sans text-sm uppercase tracking-widest text-foreground/80 hover:text-foreground transition-colors">Instagram</a>
                <a href="#" className="font-sans text-sm uppercase tracking-widest text-foreground/80 hover:text-foreground transition-colors">Twitter</a>
                <a href="#" className="font-sans text-sm uppercase tracking-widest text-foreground/80 hover:text-foreground transition-colors">LinkedIn</a>
                <a href="#" className="font-sans text-sm uppercase tracking-widest text-foreground/80 hover:text-foreground transition-colors">Pinterest</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-forest mb-2">Contact</span>
                <a href="mailto:HELLO@WRAPSTYLE.CO" className="font-sans text-sm uppercase tracking-widest text-foreground/80 hover:text-foreground transition-colors">HELLO@WRAPSTYLE.CO</a>
                <a href="tel:+919821550199" className="font-sans text-sm uppercase tracking-widest text-foreground/80 hover:text-foreground transition-colors">+91 98215 50199</a>
                <p className="font-sans text-sm uppercase tracking-widest text-foreground/80 hover:text-foreground mt-2 max-w-[220px] leading-relaxed">
                  ATELIER 14, BANDRA WEST<br />MUMBAI, IN 400050
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-auto w-full pt-10 border-t border-mint-200/20">
            <div className="w-full flex items-center justify-center">
              <h1 className="font-display font-normal !text-[#3F5F52] text-[18vw] lg:text-[16vw] leading-[1.1] uppercase">
                WRAPSTYLE
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center w-full mt-10 gap-6 text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] text-sage">
              <p>&copy; {new Date().getFullYear()} WRAPSTYLE STUDIO. ALL RIGHTS RESERVED.</p>
              <div className="flex gap-6">
                <a href="#" className="text-sage transition-colors">Privacy Policy</a>
                <a href="#" className="text-sage transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

