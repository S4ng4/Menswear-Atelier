"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ModelSilhouette } from "@/components/builder/ModelPreview";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden texture-grain">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(125deg, #f7f4ef 0%, #ebe4d8 42%, #e0d5c4 72%, #d8cfc0 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 75% 40%, rgba(27,42,74,0.08), transparent 60%)",
        }}
      />

      <div className="relative z-[2] mx-auto grid min-h-[92vh] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <p className="font-serif text-5xl sm:text-6xl md:text-7xl text-navy leading-[0.95] tracking-tight">
            Atelier
          </p>
          <h1 className="mt-6 font-serif text-3xl sm:text-4xl text-charcoal leading-tight">
            Build timeless outfits.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal-muted leading-relaxed max-w-md">
            Compose elegant menswear combinations guided by classic rules —
            navy foundations, honest fabrics, and quiet proportion.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/builder" variant="primary" size="lg">
              Open builder
            </Button>
            <Button href="/lookbook" variant="secondary" size="lg">
              Browse lookbook
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block h-[min(72vh,640px)]"
          aria-hidden
        >
          <div className="absolute inset-0 flex items-end justify-center">
            <ModelSilhouette
              outer="#1b2a4a"
              shirt="#faf8f4"
              bottoms="#8a8580"
              shoes="#3d2e24"
              tie="#1b2a4a"
              pocketSquare="#f7f4ef"
              className="h-full w-auto max-w-md drop-shadow-[0_24px_40px_rgba(44,42,40,0.12)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
