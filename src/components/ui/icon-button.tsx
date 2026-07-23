"use client";

import { type ReactNode } from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLMotionProps, m } from "motion/react";

import { cn } from "@/utils/tailwind";

const iconButtonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors not-disabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-70",
  {
    variants: {
      variant: {
        ghost:
          "text-neutral-600 not-disabled:hover:bg-neutral-100 not-disabled:hover:text-neutral-900",
        outline:
          "border border-neutral-200 text-neutral-600 not-disabled:hover:bg-neutral-100 not-disabled:hover:text-neutral-900",
        primary: "bg-black text-white not-disabled:hover:bg-neutral-800",
      },
      size: {
        sm: "size-9",
        md: "size-10",
        lg: "size-11",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  }
);

export interface IconButtonProps
  extends HTMLMotionProps<"button">, VariantProps<typeof iconButtonVariants> {
  "aria-label": string;
  icon: ReactNode;
}

export function IconButton({
  icon,
  variant,
  size,
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <m.button
      type={type}
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    >
      {icon}
    </m.button>
  );
}
IconButton.displayName = "IconButton";
