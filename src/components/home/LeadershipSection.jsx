"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { leaders, leadershipSectionContent } from "@/lib/mock";
import SectionHeader from "./SectionHeader";

export default function LeadershipSection() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.querySelector(".snap-center");
      if (card) {
        const cardWidth = card.offsetWidth + (window.innerWidth < 640 ? 0 : 32);
        const scrollTo =
          direction === "left"
            ? container.scrollLeft - cardWidth
            : container.scrollLeft + cardWidth;
        container.scrollTo({ left: scrollTo, behavior: "smooth" });
      }
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <section className="py-12 md:py-24 bg-[#FAFBFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-row justify-between items-end mb-10 md:mb-16">
          <div className="flex-1 text-left">
            <SectionHeader
              title={leadershipSectionContent.title}
              align="left"
              noMargin
            />
          </div>

          {/* Slider Controls - Integrated for all screens */}
          <div className="flex gap-5 md:gap-7 items-center mb-1">
            <button
              onClick={() => scroll("left")}
              className={`transition-all duration-300 hover:scale-110 active:scale-95 ${
                canScrollLeft
                  ? "text-primary cursor-pointer"
                  : "text-gray-200 cursor-not-allowed"
              }`}
            >
              <Icon
                icon="ph:arrow-left-light"
                width={32}
                className="md:w-10 md:h-10"
              />
            </button>

            <button
              onClick={() => scroll("right")}
              className={`transition-all duration-300 hover:scale-110 active:scale-95 ${
                canScrollRight
                  ? "text-primary cursor-pointer"
                  : "text-gray-200 cursor-not-allowed"
              }`}
            >
              <Icon
                icon="ph:arrow-right-light"
                width={32}
                className="md:w-10 md:h-10"
              />
            </button>
          </div>
        </div>
      </div>

      {/* FULL WIDTH SLIDER */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-0 sm:gap-8 overflow-x-auto pb-8 sm:pb-12 scrollbar-hide snap-x snap-proximity"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          touchAction: "auto",
        }}
      >
        <div className="hidden sm:block min-w-[40vw] flex-shrink-0 pointer-events-none" />

        {leaders.map((leader, i) => (
          <motion.div
            key={i}
            className="min-w-full sm:min-w-[220px] md:min-w-[260px] px-6 sm:px-0 snap-center group cursor-pointer"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            viewport={{ once: true, margin: "0px -50px 0px -50px" }}
          >
            <div className="rounded-t-3xl overflow-hidden bg-white shadow-sm">
              <div className="aspect-[4/5] bg-[#FAFBFC] group-hover:bg-primary flex items-center justify-center relative overflow-hidden transition-colors duration-500">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:16px_1px] opacity-25" />
                </div>

                <div className="relative z-10 w-full h-full">
                  {leader.image ? (
                    <Image
                      src={leader.image}
                      alt={leader.nameFirst}
                      width={300}
                      height={400}
                      className="w-full h-full object-contain transition-all duration-500 drop-shadow-none group-hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon
                        icon="mdi:account"
                        width={100}
                        className="text-gray-200 transition-all duration-500"
                      />
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
              </div>
            </div>

            <div className="px-4 pt-5 bg-white rounded-b-3xl pb-6 border-t border-gray-50 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl sm:text-2xl font-extrabold text-dark leading-tight">
                  {leader.nameFirst}{" "}
                  <span className="text-primary">{leader.nameLast}</span>
                </h3>

                <Link
                  href={leader.linkedin}
                  target="_blank"
                  className="flex-shrink-0 inline-flex items-center justify-center cursor-pointer"
                >
                  <Icon
                    icon="mdi:linkedin"
                    width={26}
                    className="text-dark hover:text-[#0A66C2] transition-colors"
                  />
                </Link>
              </div>

              <p className="text-sm md:text-base text-dark/60 mt-1 font-medium font-mono">
                {leader.role}
              </p>
            </div>
          </motion.div>
        ))}

        <div className="hidden sm:block min-w-[20vw] flex-shrink-0" />
      </div>
    </section>
  );
}
