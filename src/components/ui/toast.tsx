"use client";

import { useEffect, useState } from "react";

import { cva } from "class-variance-authority";
import { AnimatePresence, m } from "motion/react";

import { CloseIcon } from "@/components/icons";
import { cn } from "@/utils/tailwind";

import { IconButton } from "./icon-button";

const DURATION = 3000;
const EXIT_DURATION = 0.2;

const toastVariants = cva(
  "flex min-w-96 items-center gap-4 rounded-full border px-6 py-4 shadow-lg",
  {
    variants: {
      type: {
        success: "border-green-200 bg-green-50 text-green-900",
        error: "border-red-200 bg-red-50 text-red-900",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
        info: "border-neutral-100 bg-white text-neutral-800",
      },
    },
    defaultVariants: { type: "info" },
  }
);

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastState {
  id: string;
  type?: ToastType;
  title: string;
  autoClose?: boolean;
  duration?: number;
  action?: ToastAction;
}

interface ToastProps extends ToastState {
  onClose: () => void;
  className?: string;
}

export function Toast({
  type = "info",
  title,
  autoClose = true,
  duration = DURATION,
  action,
  onClose,
  className,
}: ToastProps) {
  useEffect(() => {
    if (!autoClose) {
      return;
    }
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [autoClose, duration, onClose]);

  return (
    <m.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: EXIT_DURATION }}
      className={cn(toastVariants({ type }), className)}
    >
      <p className="flex-1 text-base font-medium text-neutral-800">{title}</p>

      {action && (
        <button
          onClick={action.onClick}
          className="shrink-0 rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          {action.label}
        </button>
      )}

      <IconButton
        aria-label="Close toast"
        icon={<CloseIcon width={16} height={16} />}
        size="sm"
        onClick={onClose}
      />
    </m.div>
  );
}

interface ToastContainerProps {
  toasts: ToastState[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="pointer-events-none fixed top-8 left-1/2 z-9999 -translate-x-1/2">
      <div className="pointer-events-auto flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              {...toast}
              onClose={() => onRemove(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const addToast = (toast: Omit<ToastState, "id">) => {
    const id = `toast-${++toastId}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const success = (title: string, action?: ToastAction) =>
    addToast({ type: "success", title, action });

  const error = (title: string, action?: ToastAction) =>
    addToast({ type: "error", title, action });

  const warning = (title: string, action?: ToastAction) =>
    addToast({ type: "warning", title, action });

  const info = (title: string, action?: ToastAction) =>
    addToast({ type: "info", title, action });

  return { toasts, addToast, removeToast, success, error, warning, info };
}
