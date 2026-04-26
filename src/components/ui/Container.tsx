import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva(
  "mx-auto px-4 md:px-6 lg:px-8 w-full",
  {
    variants: {
      variant: {
        default: "max-w-7xl",
        narrow: "max-w-5xl",
        wide: "max-w-[1440px]",
        full: "max-w-full",
      },
      py: {
        none: "py-0",
        sm: "py-4 md:py-8",
        md: "py-12 md:py-16",
        lg: "py-20 md:py-24",
        xl: "py-32 md:py-48",
        page: "pt-24 pb-12 md:pt-32 md:pb-20",
      },
      clean: {
        true: "px-0 md:px-0 lg:px-0",
      }
    },
    defaultVariants: {
      variant: "default",
      py: "none",
    },
  }
);

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, variant, py, clean, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(containerVariants({ variant, py, clean, className }))}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container, containerVariants };