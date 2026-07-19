import type { ModelIdentity } from "@/types";

/** Locked visual identity for all outfit visualizations and AI prompts. */
export const MODEL: ModelIdentity = {
  id: "atelier-model-v1",
  label: "Atelier Model",
  ageRange: "30-35",
  heightCm: 185,
  build: "athletic",
  facialHair: "light beard",
  hair: "short dark hair",
  ethnicityPresentation: "European",
  locked: true,
};

/**
 * Prompt lock fragment — prepend or inject into any generative image /
 * visualization prompt so the model identity never drifts.
 */
export const MODEL_PROMPT_LOCK = [
  "LOCKED MODEL IDENTITY (do not alter):",
  "Male, age 30-35, 185cm tall, athletic build,",
  "light neatly trimmed beard, short dark hair,",
  "European features, refined menswear posture,",
  "neutral expression, natural daylight studio or editorial setting.",
  "Same person across all images — consistent face, body, and proportions.",
].join(" ");
