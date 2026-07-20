"use client";

import { LazyMotion } from "motion/react";
import type { PropsWithChildren } from "react";

// Make sure to return the specific export containing the feature bundle.
const loadFeatures = () => import("./features").then((res) => res.default);

export function MotionProvider({ children }: PropsWithChildren) {
  return (
    <LazyMotion strict features={loadFeatures}>
      {children}
    </LazyMotion>
  );
}
