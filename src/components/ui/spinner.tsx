import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/tailwind";

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      /** size 16px */
      sm: "w-4 h-4",
      /** size 20px */
      md: "w-5 h-5",
      /** size 24px */
      lg: "w-6 h-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

/**
 * Loading spinner that inherits color from the parent via `stroke-current`.
 *
 * When the parent is `disabled`, opacity is automatically applied through CSS inheritance.
 *
 * @example
 * <Spinner />
 *
 * @example
 * <Spinner size="lg" />
 */
export default function Spinner({ size, className }: SpinnerProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn(spinnerVariants({ size }), className)}
      fill="none"
      viewBox="0 0 24 24"
      aria-label="Loading"
      role="status"
    >
      <title>Loading</title>
      <path
        stroke="currentColor"
        strokeWidth="3"
        strokeOpacity="0.25"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        d="M12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19"
      />
    </svg>
  );
}

export { spinnerVariants };
