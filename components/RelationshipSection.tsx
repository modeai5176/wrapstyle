"use client";

import Image from "next/image";

const DATA = [
  {
    title: "For Her",
    img: "/images/for_her.jpg",
  },
  {
    title: "For Him",
    img: "/images/for_him.jpg",
  },
  {
    title: "For Couple",
    img: "/images/for_couple.jpg",
  },
  {
    title: "For Parents",
    img: "/images/for_parents.jpg",
  },
  {
    title: "For Kids",
    img: "/images/for_kids.jpg",
  },
];

export default function RelationshipSection() {
  return (
    <section className="w-full bg-forest py-20 px-6 md:px-16 relative overflow-hidden">

      {/* Top Decorative Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#c89b5b]" />

      {/* Heading */}
      <div className="text-left mb-24">
        <h2 className="text-5xl text-background tracking-wide">
          Perfect Picks for Every Relationship
        </h2>
      </div>

      {/* Cards Row */}
      <div className="flex items-center justify-center gap-10 flex-wrap">

        {DATA.map((item, index) => (
          <div key={index} className="flex items-center">

            {/* Card */}
            <div className="w-[180px] md:w-[220px]">
              
              {/* Rounded Image */}
              <div className="relative w-full h-[250px] rounded-t-[120px] overflow-hidden bg-gray-200">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Label */}
              <div className="bg-background text-center py-3">
                <p className="text-[14px] md:text-[15px] font-medium text-forest">
                  {item.title}
                </p>
              </div>
            </div>

            {/* Separator Symbol */}
            {index !== DATA.length - 1 && (
              <div className="mx-4 text-[#b08a57] text-xl hidden md:block">
                ✧
              </div>
            )}
          </div>
        ))}

      </div>

    </section>
  );
}