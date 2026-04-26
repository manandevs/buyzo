"use client";

import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("antialiased", {
  variants: {
    variant: {
      h1: "text-4xl md:text-6xl lg:text-7xl",
      h2: "text-3xl lg:text-5xl",
      h3: "text-2xl lg:text-4xl",
      h4: "text-xl lg:text-2xl",
      p: "text-base",
      large: "md:text-lg",
      lead: "text-lg md:text-xl",
      small: "text-sm",
      muted: "text-sm text-zinc-500",
      blockquote: "mt-6 border-l-2 border-zinc-700 pl-6 italic",
      code: "relative rounded bg-zinc-900 px-[0.3rem] py-[0.2rem] text-sm",
      marquee: "text-[74px] md:text-[92px] lg:text-[136px] leading-[1.01]",
    },
    font: {
      sans: "font-sans",
      bitcount: "font-bitcount",
      magnetik: "font-magnetik",
      typefesse: "font-typefesse",
    },
    weight: {
      thin: "font-thin",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
    tracking: {
      tighter: "tracking-[-0.05em]",
      tight: "tracking-tight",
      normal: "tracking-normal",
      wide: "tracking-wide",
      wider: "tracking-wider",
      widest: "tracking-[0.2em]",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "p",
    tracking: "normal",
    align: "left",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
  asChild?: boolean;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, font, weight, tracking, align, asChild = false, as, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : (as || "p");

    return (
      <Comp
        className={cn(typographyVariants({ variant, font, weight, tracking, align, className }))}
        ref={ref as any}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };