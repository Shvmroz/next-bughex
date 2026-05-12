"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function LetsTalkFloating({
  forceVisible = false,
  className = "fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999]",
}) {
  const [isVisible, setIsVisible] = useState(forceVisible);
  const [isOpen, setIsOpen] = useState(false);
  const pillRef = useRef(null);
  const [collapsedWidth, setCollapsedWidth] = useState("140px");

  useEffect(() => {
    const updateWidth = () => {
      setCollapsedWidth(window.innerWidth < 768 ? "120px" : "140px");
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "skill-icons:linkedin",
      href: "https://www.linkedin.com/company/the-bughex",
    },
    {
      name: "Facebook",
      icon: "logos:facebook",
      href: "https://www.facebook.com/thebughex",
    },
    {
      name: "WhatsApp",
      icon: "logos:whatsapp-icon",
      href: "https://wa.me/923156861473",
      isExtraLarge: true,
    },
  ];

  const mailLink = {
    name: "Contact",
    icon: "fluent-color:mail-32",
    href: "#contact",
  };

  const pathname = usePathname();

  useEffect(() => {
    if (forceVisible) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      // Hide on contact page
      if (pathname === "/contact") {
        setIsVisible(false);
        return;
      }

      const shouldShow = true;

      // Hide in footer or contact section
      const footer = document.querySelector("footer");
      const contactSection = document.querySelector("#contact");

      let inTargetArea = false;

      if (footer) {
        const rect = footer.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) inTargetArea = true;
      }

      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50 && rect.bottom > 50)
          inTargetArea = true;
      }

      setIsVisible(shouldShow && !inTargetArea);
    };

    const handleClickOutside = (event) => {
      if (pillRef.current && !pillRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pathname]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className={className}
        >
          {/* Animated Border Container */}
          <div className="relative p-[1.5px] rounded-full overflow-hidden shadow-2xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_20%,#1bb5a2_50%,transparent_80%)] z-0"
            />

            <motion.div
              ref={pillRef}
              layout
              initial={false}
              animate={{
                width: isOpen ? "auto" : collapsedWidth,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                mass: 0.8,
              }}
              className="relative flex items-center h-11 md:h-12 px-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-black/5 cursor-pointer select-none z-10 overflow-hidden"
              style={{ minWidth: isOpen ? "auto" : collapsedWidth }}
              onClick={handleToggle}
            >
              <div className="flex items-center px-1 overflow-hidden h-full w-full">
                <AnimatePresence initial={false} mode="wait">
                  {!isOpen ? (
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-2 w-full"
                    >
                      <div className="w-8 h-8 md:w-9 md:h-9 bg-white rounded-full flex items-center justify-center shadow-lg shrink-0 overflow-hidden">
                        <motion.div
                          whileHover={{ rotateY: 360 }}
                          animate={{ rotateY: [0, 360] }}
                          transition={{
                            rotateY: {
                              duration: 0.6,
                              ease: "easeInOut",
                              repeat: Infinity,
                              repeatDelay: 2,
                            },
                          }}
                          style={{
                            backfaceVisibility: "visible",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            src="/bughex-logo.png"
                            alt="Logo"
                            width={24}
                            height={24}
                            className="w-5 h-5 md:w-6 md:h-6 object-contain"
                          />
                        </motion.div>
                      </div>
                      <span className="text-[#1bb5a2] font-bold text-xs md:text-sm tracking-tight whitespace-nowrap pr-2">
                        Let&apos;s Talk
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-4 md:gap-6 px-3 py-1"
                    >
                      {/* Socials */}
                      <div className="flex items-center gap-4 md:gap-5">
                        {socialLinks.map((link) => (
                          <motion.a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2 }}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center shrink-0"
                          >
                            <Icon
                              icon={link.icon}
                              className={`${
                                link.isExtraLarge
                                  ? "w-7 h-7 md:w-8 md:h-8"
                                  : "w-6 h-6 md:w-7 md:h-7"
                              } transition-transform`}
                            />
                          </motion.a>
                        ))}
                      </div>

                      {/* Mail + HR Address */}
                      <motion.a
                        href={mailLink.href}
                        onClick={(e) => handleLinkClick(e, mailLink.href)}
                        className="flex items-center justify-center shrink-0 border-l border-black/10 pl-4 md:pl-6 ml-0.5"
                      >
                        <div className="flex items-center gap-2 md:gap-4">
                          <Icon
                            icon={mailLink.icon}
                            className="w-7 h-7 md:w-8 md:h-8"
                          />
                          <span className="text-black lg:text-[#1bb5a2] lg:font-bold text-xs md:text-sm tracking-tight whitespace-nowrap font-normal">
                            hr@bughex.com
                          </span>
                        </div>
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
