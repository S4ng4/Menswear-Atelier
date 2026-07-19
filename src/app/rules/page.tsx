"use client";

import { motion } from "framer-motion";
import { STYLE_RULES } from "@/data/styleRules";

export default function RulesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-[11px] uppercase tracking-[0.25em] text-warm-gold">
        Style Rules
      </p>
      <h1 className="mt-2 font-serif text-4xl text-charcoal md:text-5xl">
        Principles of elegant dress
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-charcoal-muted md:text-base">
        Guidance drawn from classical menswear — Permanent Style, Hugo Jacomet,
        The Armoury — not seasonal trends.
      </p>

      <div className="mt-14 space-y-8">
        {STYLE_RULES.map((rule, i) => (
          <motion.article
            key={rule.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.55 }}
            className="border-b border-border-soft pb-8"
          >
            <span className="font-serif text-5xl text-sand">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-2 font-serif text-3xl text-charcoal">{rule.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/80 md:text-base">
              {rule.description}
            </p>
            <p className="mt-3 text-sm italic text-charcoal-muted">{rule.tip}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-surface px-3 py-1 text-[10px] uppercase tracking-wider text-charcoal-muted">
                {rule.category}
              </span>
              <span className="rounded-full bg-surface px-3 py-1 text-[10px] uppercase tracking-wider text-charcoal-muted">
                {rule.severity}
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
