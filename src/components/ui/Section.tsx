"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";

export interface SectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({
  eyebrow,
  title,
  subtitle,
  children,
  className,
  id,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={clsx("py-16 md:py-24", className)}
    >
      <div className="mb-10 max-w-2xl">
        {eyebrow ? (
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-warm-gold">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-3 text-base md:text-lg text-charcoal-muted leading-relaxed">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </motion.section>
  );
}
