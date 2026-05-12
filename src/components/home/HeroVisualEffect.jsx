"use client";

import React, { useRef, useEffect } from "react";

export default function HeroVisualEffect({
  primaryColor = "#1bb5a2",
  secondaryColor = "#ffffff",
  particleOpacity = 0.4,
  glowOpacity = 0.18,
}) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let particles = [];
    function initParticles() {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 1.2,
          color: i % 2 === 0 ? primaryColor : secondaryColor,
          opacity: Math.random() * 0.6 + 0.35,
          density: Math.random() * 20 + 5,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Holo Circle (Glow)
      if (mouse.current.active) {
        const gradient = ctx.createRadialGradient(
          mouse.current.x,
          mouse.current.y,
          0,
          mouse.current.x,
          mouse.current.y,
          300
        );
        gradient.addColorStop(
          0,
          `${primaryColor}${Math.floor(glowOpacity * 255)
            .toString(16)
            .padStart(2, "0")}`
        );
        gradient.addColorStop(
          0.4,
          `${primaryColor}${Math.floor((glowOpacity / 3) * 255)
            .toString(16)
            .padStart(2, "0")}`
        );
        gradient.addColorStop(1, `${primaryColor}00`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 2. Animate Particles with Gravitational/Waves effect
      particles.forEach((p) => {
        // Slow floating movement
        p.phase += 0.005;
        const floatX = Math.sin(p.phase) * 3;
        const floatY = Math.cos(p.phase) * 3;

        const currentTargetX = p.baseX + floatX;
        const currentTargetY = p.baseY + floatY;

        // Mouse interaction
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const directionX = (dx / distance) * force * p.density;
          const directionY = (dy / distance) * force * p.density;

          // Push particles away slowly
          p.x -= directionX * 0.5;
          p.y -= directionY * 0.5;
        } else {
          // Return to home slowly
          p.x += (currentTargetX - p.x) * 0.02;
          p.y += (currentTargetY - p.y) * 0.02;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * particleOpacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [primaryColor, secondaryColor, particleOpacity, glowOpacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none opacity-80"
    />
  );
}
