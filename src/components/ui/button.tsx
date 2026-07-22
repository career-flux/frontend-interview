"use client";

import { type MouseEvent, type ReactNode } from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLMotionProps, m } from "motion/react";

import { cn } from "@/utils/tailwind";

import { Spinner } from "./spinner";

const buttonVariants = cva(
  "group relative inline-flex cursor-pointer items-center justify-center font-medium gap-2 rounded-lg transition-colors not-disabled:active:scale-95 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-black text-white not-disabled:hover:bg-neutral-800",
        secondary:
          "bg-neutral-100 text-neutral-900 not-disabled:hover:bg-neutral-200",
        error: "bg-red-600 text-white not-disabled:hover:bg-red-700",
        outline:
          "border border-neutral-200 bg-transparent not-disabled:hover:bg-neutral-100",
        ghost:
          "text-neutral-600 not-disabled:hover:bg-neutral-100 not-disabled:hover:text-neutral-900",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-3 text-base",
        lg: "h-12 px-3.5 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends HTMLMotionProps<"button">, VariantProps<typeof buttonVariants> {
  children?: ReactNode;
  /** Icon rendered before the label */
  startIcon?: ReactNode;
  /** Icon rendered after the label */
  endIcon?: ReactNode;
  isLoading?: boolean;
}

/**
 * Base button component.
 *
 * @example
 * <Button variant="secondary" endIcon={<Icon />}>Icon</Button>
 *
 * @example
 * <Button isLoading>Loading...</Button>
 *
 * @example
 * <Button variant="error" size="sm" onClick={handleDelete}>Delete</Button>
 *
 */
export function Button({
  className,
  variant,
  size,
  startIcon,
  endIcon,
  isLoading = false,
  disabled,
  children,
  type = "button",
  onClick,
  ...props
}: ButtonProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (isLoading) {
      return;
    }

    onClick?.(e);
  };

  return (
    <m.button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || isLoading}
      onClick={handleClick}
      aria-busy={isLoading}
      whileHover="hover"
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </span>
      )}

      <span className={cn("contents", isLoading && "invisible")}>
        {startIcon}
        {children}
        {endIcon}
      </span>
    </m.button>
  );
}
Button.displayName = "Button";
