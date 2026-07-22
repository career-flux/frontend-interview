"use client";

import {
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type Ref,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { cva } from "class-variance-authority";

import { ChevronDownIcon } from "@/components/icons";
import { useClickOutSide } from "@/hooks/use-click-outside";
import { cn } from "@/utils/tailwind";

const selectVariants = cva(
  "inline-flex cursor-pointer items-center justify-between gap-2 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-800 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-9 px-3 ",
        md: "h-10 px-4",
        lg: "h-11 px-5",
      },
      fullWidth: {
        true: "w-full",
        false: "w-48",
      },
    },
    defaultVariants: {
      size: "md",
      fullWidth: false,
    },
  }
);

export interface SelectOption {
  value: string;
  label: string;
  startIcon?: ReactNode;
}

export interface SelectProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> {
  ref?: Ref<HTMLButtonElement>;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  value?: string;
  placeholder?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
}

export function Select({
  ref,
  className,
  size = "md",
  fullWidth = false,
  value,
  placeholder = "Select an option",
  options,
  onChange,
  onClick,
  ...props
}: SelectProps) {
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useClickOutSide(containerRef, () => setIsOpen(false));

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );
  const displayText = selectedOption?.label ?? placeholder;
  const displayIcon = selectedOption?.startIcon;

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      setIsOpen((open) => !open);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={ref}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listId}
        className={cn(selectVariants({ size, fullWidth }), className)}
        {...props}
        onClick={handleToggle}
      >
        <span className="flex min-w-0 items-center gap-2">
          {displayIcon && <span className="shrink-0">{displayIcon}</span>}
          <span className={cn("truncate", !selectedOption && "text-black/60")}>
            {displayText}
          </span>
        </span>
        <ChevronDownIcon
          className={cn("shrink-0 text-black/40", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div
          id={listId}
          role="listbox"
          className="absolute right-0 left-0 z-50 mt-1 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg"
        >
          <div className="max-h-60 overflow-y-auto py-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selectedValue === option.value}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-neutral-50",
                  selectedValue === option.value && "bg-neutral-100 font-medium"
                )}
                onClick={() => handleSelect(option.value)}
              >
                {option.startIcon && (
                  <span className="shrink-0">{option.startIcon}</span>
                )}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
Select.displayName = "Select";
