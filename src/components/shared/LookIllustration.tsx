"use client";

import Image from "next/image";
import clsx from "clsx";
import type { Garment, Outfit } from "@/types";
import { ModelSilhouette } from "@/components/builder/ModelPreview";
import { getGarment } from "@/data/garments";

const PHOTO_LOOK_IDS = new Set([
  "look-navy-foundation",
  "look-riviera-linen",
  "look-winter-flannel",
  "look-quiet-cashmere",
  "look-old-money-weekend",
  "look-parisian",
  "look-camel-polo",
  "look-denim-oxford",
]);

function hueFromId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
  return h;
}

function resolveGarments(outfit: Outfit): Garment[] {
  return Object.values(outfit.slots)
    .filter(Boolean)
    .map((id) => getGarment(id as string))
    .filter((g): g is Garment => Boolean(g));
}

function layerHex(garments: Garment[], categories: Garment["category"][]) {
  return garments.find((g) => categories.includes(g.category))?.hex;
}

export interface LookIllustrationProps {
  outfit: Outfit;
  garments?: Garment[];
  className?: string;
  priority?: boolean;
}

export function LookIllustration({
  outfit,
  garments: garmentsProp,
  className,
  priority = false,
}: LookIllustrationProps) {
  const garments = garmentsProp ?? resolveGarments(outfit);
  const usePhoto =
    PHOTO_LOOK_IDS.has(outfit.id) &&
    Boolean(outfit.image?.startsWith("/images/"));

  if (usePhoto && outfit.image) {
    return (
      <div
        className={clsx(
          "relative overflow-hidden rounded-[var(--radius)] bg-beige-studio",
          className,
        )}
      >
        <Image
          src={outfit.image}
          alt={outfit.name}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
    );
  }

  const hue = hueFromId(outfit.id);
  const tint = `hsl(${hue} 18% 72%)`;

  const outer =
    layerHex(garments, ["coats", "jackets", "blazers", "suits"]) ?? tint;
  const shirt = layerHex(garments, ["shirts"]) ?? `hsl(${hue} 12% 88%)`;
  const bottoms =
    layerHex(garments, ["trousers", "jeans", "chinos"]) ??
    `hsl(${(hue + 20) % 360} 14% 42%)`;
  const shoes =
    layerHex(garments, ["shoes", "sneakers", "loafers", "boots"]) ??
    `hsl(${(hue + 40) % 360} 20% 28%)`;
  const tie = layerHex(garments, ["ties"]);
  const pocketSquare = layerHex(garments, ["pocket-squares"]);

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-[var(--radius)]",
        className,
      )}
      style={{
        background: `linear-gradient(165deg, hsl(${hue} 20% 92%) 0%, hsl(${hue} 14% 84%) 100%)`,
      }}
    >
      <ModelSilhouette
        outer={outer}
        shirt={shirt}
        bottoms={bottoms}
        shoes={shoes}
        tie={tie}
        pocketSquare={pocketSquare}
        className="relative z-[1] px-3 pt-4 pb-1"
      />
    </div>
  );
}
