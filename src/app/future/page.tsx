import type { Metadata } from "next";
import Link from "next/link";
import { listFutureModules } from "@/lib/future/architecture";

export const metadata: Metadata = {
  title: "Roadmap — Atelier",
  description: "Upcoming Atelier capabilities and architecture stubs.",
};

export default function FuturePage() {
  const modules = listFutureModules();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-[11px] uppercase tracking-[0.25em] text-warm-gold">
        Roadmap
      </p>
      <h1 className="mt-2 font-serif text-4xl text-charcoal">
        Architecture prepared
      </h1>
      <p className="mt-4 text-sm text-charcoal-muted">
        Extension points live in{" "}
        <code className="text-xs text-charcoal">src/lib/future/architecture.ts</code>.
        The model identity and garment schema stay stable as these activate.
      </p>
      <ul className="mt-10 space-y-3">
        {modules.map((m) => (
          <li
            key={m.id}
            className="flex items-start justify-between gap-4 rounded-[16px] border border-border-soft bg-surface px-5 py-4"
          >
            <div>
              <p className="text-sm text-charcoal">{m.label}</p>
              <p className="mt-1 text-xs text-charcoal-muted">{m.description}</p>
            </div>
            <span className="shrink-0 text-[10px] uppercase tracking-wider text-charcoal-muted">
              {m.enabled ? "On" : m.eta ?? "Planned"}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href="/"
        className="mt-10 inline-block text-xs uppercase tracking-[0.2em] text-warm-gold"
      >
        ← Home
      </Link>
    </div>
  );
}
