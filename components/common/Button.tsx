import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-[#7B1FA2] via-[#9C27B0] to-[#BA68C8] text-white shadow-[inset_0px_-4px_4px_0px_#CE93D8,0px_0px_0px_2px_#E1BEE7,0px_4px_0px_0px_#4A148C] hover:-translate-y-1 active:translate-y-1",
    secondary:
      "bg-gradient-to-r from-white to-zinc-100 border-2 border-black text-black shadow-[0px_4px_0px_0px_white] duration-200 hover:-translate-y-1 active:translate-y-1 active:shadow-none",
    outline:
      "border border-purple-600 text-purple-600 hover:bg-purple-50",
    ghost:
      "text-gray-300 hover:bg-gray-100 hover:text-gray-900",
  };

  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 rounded-full px-6 py-2 transition-transform duration-200",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}