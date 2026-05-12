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
      // Close if open on scroll
      setIsOpen(false);

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
              animate={{
                width: isOpen ? "auto" : collapsedWidth,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="relative flex items-center h-11 md:h-12 bg-white/95 backdrop-blur-md rounded-full border border-black/5 shadow-2xl cursor-pointer overflow-hidden z-10"
              onClick={handleToggle}
            >
              <div className="relative flex items-center w-full h-full px-2">
                <AnimatePresence>
                  {!isOpen ? (
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 md:gap-3 w-full pr-3 md:pr-4"
                    >
                      <div className="w-8 h-8 md:w-9 md:h-9 bg-white rounded-full flex items-center justify-center shadow-sm ml-1 shrink-0 overflow-hidden">
                        <motion.div
                          animate={{ rotateY: [0, 360] }}
                          transition={{
                            duration: 0.8,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 2,
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
                      <span className="text-[#1bb5a2] font-bold text-xs md:text-sm tracking-tight whitespace-nowrap">
                        Let&apos;s Talk
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                      className="flex items-center gap-4 md:gap-6 px-3 md:px-4 whitespace-nowrap"
                    >
                      <div className="flex items-center gap-3 md:gap-5">
                        {socialLinks.map((link) => (
                          <motion.a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center hover:opacity-70 transition-opacity"
                          >
                            <Icon
                              icon={link.icon}
                              className={
                                link.isExtraLarge
                                  ? "w-6 h-6 md:w-8 md:h-8"
                                  : "w-5 h-5 md:w-7 md:h-7"
                              }
                            />
                          </motion.a>
                        ))}
                      </div>
                      <motion.a
                        href={mailLink.href}
                        onClick={(e) => handleLinkClick(e, mailLink.href)}
                        className="flex items-center gap-2 md:gap-3 border-l border-black/10 pl-3 md:pl-6"
                      >
                        <Icon
                          icon={mailLink.icon}
                          className="w-6 h-6 md:w-8 md:h-8"
                        />
                        <span className="text-[#1bb5a2] font-bold text-xs md:text-sm tracking-tight">
                          hr@bughex.com
                        </span>
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
