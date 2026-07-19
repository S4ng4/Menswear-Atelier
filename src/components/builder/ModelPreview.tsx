"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import type { Garment, GarmentCategory } from "@/types";

export interface ModelPreviewProps {
  garments: Garment[];
  className?: string;
  showChips?: boolean;
}

const OUTER: GarmentCategory[] = ["coats", "jackets", "blazers", "suits"];
const SHIRT: GarmentCategory[] = ["shirts"];
const BOTTOMS: GarmentCategory[] = ["trousers", "jeans", "chinos"];
const SHOES: GarmentCategory[] = ["shoes", "sneakers", "loafers", "boots"];
const TIE: GarmentCategory[] = ["ties"];
const POCKET: GarmentCategory[] = ["pocket-squares"];

function pick(garments: Garment[], cats: GarmentCategory[]): Garment | undefined {
  return garments.find((g) => cats.includes(g.category));
}

const SKIN = "#d4b89a";
const HAIR = "#2a241e";
const UNDER = "#e8e4dc";

/** Shared male silhouette — same model identity for every preview. */
export function ModelSilhouette({
  outer,
  shirt,
  bottoms,
  shoes,
  tie,
  pocketSquare,
  className,
}: {
  outer?: string;
  shirt?: string;
  bottoms?: string;
  shoes?: string;
  tie?: string;
  pocketSquare?: string;
  className?: string;
}) {
  const shirtFill = shirt ?? UNDER;
  const bottomFill = bottoms ?? "#6b6560";
  const outerFill = outer;
  const shoeFill = shoes ?? "#3d2e24";
  const tieFill = tie;
  const psFill = pocketSquare;

  return (
    <svg
      viewBox="0 0 280 520"
      className={clsx("h-full w-full", className)}
      role="img"
      aria-label="Menswear model preview"
    >
      <defs>
        <linearGradient id="studio-wash" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3ebe0" />
          <stop offset="100%" stopColor="#e0d5c4" />
        </linearGradient>
      </defs>

      {/* Soft ground ellipse */}
      <ellipse cx="140" cy="490" rx="78" ry="12" fill="rgba(44,42,40,0.08)" />

      {/* Legs / bottoms */}
      <path
        d="M98 268 C98 268 92 360 88 430 C86 455 78 470 78 470 L118 470 C118 470 124 400 128 340 L140 300 L152 340 C156 400 162 470 162 470 L202 470 C202 470 194 455 192 430 C188 360 182 268 182 268 Z"
        fill={bottomFill}
      />

      {/* Shoes */}
      <path
        d="M74 468 C74 468 70 482 78 486 C95 492 118 490 118 490 L118 470 Z"
        fill={shoeFill}
      />
      <path
        d="M162 470 L162 490 C162 490 185 492 202 486 C210 482 206 468 206 468 Z"
        fill={shoeFill}
      />

      {/* Torso / shirt */}
      <path
        d="M100 148 C100 148 88 160 82 200 C76 240 88 268 98 268 L182 268 C192 268 204 240 198 200 C192 160 180 148 180 148 L164 138 L140 156 L116 138 Z"
        fill={shirtFill}
      />

      {/* Collar */}
      <path
        d="M116 138 L140 156 L164 138 L158 128 L140 142 L122 128 Z"
        fill={shirtFill}
        opacity={0.92}
      />
      <path d="M140 142 L140 175" stroke="rgba(44,42,40,0.12)" strokeWidth="1.2" fill="none" />

      {/* Tie */}
      {tieFill ? (
        <path
          d="M140 148 L132 160 L140 250 L148 160 Z"
          fill={tieFill}
        />
      ) : null}

      {/* Outer layer (coat / blazer / jacket) */}
      {outerFill ? (
        <>
          <path
            d="M96 145 C70 155 58 190 55 230 C52 265 68 275 85 278 L98 268 L98 200 C100 170 108 150 116 140 Z"
            fill={outerFill}
          />
          <path
            d="M184 145 C210 155 222 190 225 230 C228 265 212 275 195 278 L182 268 L182 200 C180 170 172 150 164 140 Z"
            fill={outerFill}
          />
          <path
            d="M116 140 L100 148 L98 268 L140 275 L182 268 L180 148 L164 140 L158 155 L140 168 L122 155 Z"
            fill={outerFill}
            opacity={0.97}
          />
          {/* Lapel break */}
          <path
            d="M122 155 L140 168 L140 250"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M158 155 L140 168"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
            fill="none"
          />
          {/* Pocket square peek */}
          {psFill ? (
            <rect x="168" y="195" width="14" height="10" rx="1" fill={psFill} />
          ) : null}
        </>
      ) : psFill ? (
        <rect x="168" y="195" width="14" height="10" rx="1" fill={psFill} />
      ) : null}

      {/* Neck */}
      <path d="M124 118 L124 138 L156 138 L156 118 Z" fill={SKIN} />

      {/* Head */}
      <ellipse cx="140" cy="88" rx="32" ry="38" fill={SKIN} />

      {/* Hair */}
      <path
        d="M108 78 C110 52 124 48 140 48 C156 48 170 52 172 78 C168 62 156 58 140 58 C124 58 112 62 108 78 Z"
        fill={HAIR}
      />
      {/* Light beard suggestion */}
      <path
        d="M118 102 C122 118 130 124 140 124 C150 124 158 118 162 102"
        fill="none"
        stroke="rgba(42,36,30,0.18)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Arms resting suggestion when no outer */}
      {!outerFill ? (
        <>
          <path
            d="M100 148 C78 170 72 220 78 255 C82 270 95 272 98 268"
            fill={shirtFill}
          />
          <path
            d="M180 148 C202 170 208 220 202 255 C198 270 185 272 182 268"
            fill={shirtFill}
          />
          <ellipse cx="76" cy="258" rx="10" ry="12" fill={SKIN} />
          <ellipse cx="204" cy="258" rx="10" ry="12" fill={SKIN} />
        </>
      ) : (
        <>
          <ellipse cx="58" cy="250" rx="10" ry="12" fill={SKIN} />
          <ellipse cx="222" cy="250" rx="10" ry="12" fill={SKIN} />
        </>
      )}
    </svg>
  );
}

export function ModelPreview({
  garments,
  className,
  showChips = true,
}: ModelPreviewProps) {
  const outerG = pick(garments, OUTER);
  const shirtG = pick(garments, SHIRT);
  const bottomsG = pick(garments, BOTTOMS);
  const shoesG = pick(garments, SHOES);
  const tieG = pick(garments, TIE);
  const psG = pick(garments, POCKET);

  const chips = [outerG, shirtG, bottomsG, shoesG, tieG, psG].filter(
    Boolean,
  ) as Garment[];

  return (
    <div className={clsx("flex flex-col", className)}>
      <div className="relative overflow-hidden rounded-[var(--radius)] texture-grain atelier-shadow aspect-[3/4] min-h-[320px]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg, #f4ebe0 0%, #ebe4d8 45%, #ddd4c4 100%)",
          }}
        />
        <motion.div
          className="relative z-[2] h-full w-full px-4 pt-6 pb-2"
          initial={{ opacity: 0.85 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <ModelSilhouette
            outer={outerG?.hex}
            shirt={shirtG?.hex}
            bottoms={bottomsG?.hex}
            shoes={shoesG?.hex}
            tie={tieG?.hex}
            pocketSquare={psG?.hex}
          />
        </motion.div>
      </div>

      {showChips && chips.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {chips.map((g) => (
            <span
              key={g.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-border-soft bg-surface/90 px-2.5 py-1 text-xs text-charcoal-muted"
            >
              <span
                className="h-2 w-2 rounded-full border border-black/10"
                style={{ backgroundColor: g.hex }}
              />
              {g.name}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
