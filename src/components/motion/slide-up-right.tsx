"use client";

import { type PropsWithChildren } from "react";

import { m } from "motion/react";

/**
 * Slides its children up and to the right on hover. Works with button's `whileHover="hover"` propagation.
 *
 * @example
 * <SlideUpRight><ArrowUpRightIcon /></SlideUpRight>
 *
 * @example
 * <Button endIcon={<SlideUpRight><ArrowUpRightIcon /></SlideUpRight>}>오픈소스 기여</Button>
 */
export function SlideUpRight({ children }: PropsWithChildren) {
  return (
    <m.span
      variants={{ hover: { x: 2, y: -2 } }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="inline-flex"
    >
      {children}
    </m.span>
  );
}
