"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({
  children,
  className,
  as: Tag = "a",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: "a" | "button";
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.28}px, ${y * 0.35}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `translate(0px, 0px)`;
  };

  const Comp = motion[Tag] as typeof motion.a;

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-block transition-transform duration-200 ease-out"
      style={{ willChange: "transform" }}
    >
      <Comp className={className} {...props}>
        {children}
      </Comp>
    </div>
  );
}
