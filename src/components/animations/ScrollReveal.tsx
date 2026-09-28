"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollReveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0, rotateX: 5 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.1,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [delay, y]);

  return (
    <div ref={ref} className={className} style={{ perspective: "1000px" }}>
      {children}
    </div>
  );
}
