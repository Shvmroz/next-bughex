"use client";

import React, { useRef, useEffect } from "react";

export default function HeroVisualEffect({
  primaryColor = "#1bb5a2",
  secondaryColor = "#ffffff",
  darkColor = "#000000",
  lightColor = "#63f3e1",
  particleOpacity = 0.4,
  glowOpacity = 0.18,
}) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    function initParticles() {
      particlesRef.current = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 18000); // Reduced density for cleaner look
      for (let i = 0; i < particleCount; i++) {
        const colors = [primaryColor, secondaryColor, darkColor, lightColor];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 1.5,
          color: color,
          opacity: color === darkColor ? 0.15 : Math.random() * 0.5 + 0.3,
          maxOpacity: color === darkColor ? 0.2 : Math.random() * 0.7 + 0.4,
          currentOpacity: 0, // Start at 0 for fade-in
          density: Math.random() * 20 + 5,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      if (canvas.width !== newWidth || canvas.height !== newHeight) {
        canvas.width = newWidth;
        canvas.height = newHeight;
        initParticles();
      } else if (particlesRef.current.length === 0) {
        initParticles();
      }
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

      // 2. Animate Particles with Gravitational/Waves effect
      particlesRef.current.forEach((p) => {
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

        // Fade in effect
        if (p.currentOpacity < p.opacity) {
          p.currentOpacity += 0.01;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.currentOpacity * particleOpacity;
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
  }, [
    primaryColor,
    secondaryColor,
    darkColor,
    lightColor,
    particleOpacity,
    glowOpacity,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none opacity-80"
    />
  );
}
