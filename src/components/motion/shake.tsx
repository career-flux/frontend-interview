"use client";

import { type PropsWithChildren } from "react";

import { m } from "motion/react";

/**
 * Shakes its children on hover. Works with button's `whileHover="hover"` propagation.
 *
 * @example
 * <Shake><BugIcon /></Shake>
 *
 * @example
 * <Button endIcon={<Shake><BugIcon /></Shake>}>버그 제보</Button>
 */
export function Shake({ children }: PropsWithChildren) {
  return (
    <m.span
      variants={{ hover: { rotate: [0, -12, 12, -8, 8, 0] } }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="inline-flex"
    >
      {children}
    </m.span>
  );
}
