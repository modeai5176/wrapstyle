"use client";

import Image from "next/image";

export default function CustomHamperSection() {
  return (
    <section className="w-full bg-background py-20 px-6 md:px-14">

      {/* Heading */}
      <div className="text-left mb-10">
        <h2 className="text-5xl text-forest">
          Make your Own Hamper
        </h2>
        <p className="text-sm text-foreground/60 mt-5 max-w-3xl leading-relaxed">
          Curate a bespoke hamper with gourmet treats, artisanal delights, and premium
          lifestyle essentials. Elegantly packaged and thoughtfully designed, each hamper
          is a unique expression of care and refined taste.
        </p>
      </div>

      {/* Image Layout */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

        {/* Left Image */}
        <div className="relative w-full h-[300px] md:h-[420px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop"
            alt="Custom Hamper Left"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Image */}
        <div className="relative w-full h-[300px] md:h-[420px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=1200&auto=format&fit=crop"
            alt="Custom Hamper Right"
            fill
            className="object-cover"
          />
        </div>

        {/* Center Floating Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          
          <button className="text-sm pointer-events-auto w-[110px] h-[110px] md:w-[130px] md:h-[130px] rounded-full bg-white border border-forest shadow-md flex items-center justify-center text-center px-4 transition duration-300 hover:scale-105 hover:bg-forest hover:text-ivory">
            
              Make your<br />Own<br />Hamper

          </button>
        </div>

      </div>
    </section>
  );
}