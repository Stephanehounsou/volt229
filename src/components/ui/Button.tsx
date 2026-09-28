"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled,
}: Props) {
  const base =
    "inline-flex items-center justify-center font-display uppercase tracking-widest transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer relative overflow-hidden group";

  const variants = {
    primary:
      "bg-[#C6FF3D] text-black hover:bg-white hover:text-black shadow-[0_0_30px_rgba(198,255,61,0.3)] hover:shadow-[0_0_50px_rgba(198,255,61,0.5)]",
    secondary:
      "bg-[#E63946] text-white hover:bg-white hover:text-black",
    ghost:
      "bg-transparent text-[#F5F5F0] hover:text-[#C6FF3D] border border-white/10 hover:border-[#C6FF3D]/50",
    outline:
      "bg-transparent border border-[#C6FF3D] text-[#C6FF3D] hover:bg-[#C6FF3D] hover:text-black",
  };

  const sizes = {
    sm: "h-9 px-4 text-[13px]",
    md: "h-12 px-7 text-[14px]",
    lg: "h-14 px-10 text-[16px]",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* shine effect */}
      <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out" />
    </motion.button>
  );
}
