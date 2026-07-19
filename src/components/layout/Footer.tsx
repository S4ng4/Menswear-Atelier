import Link from "next/link";

const EXPLORE = [
  { href: "/builder", label: "Outfit Builder" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/favorites", label: "Favorites" },
  { href: "/rules", label: "Style Rules" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border-soft bg-navy text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-serif text-2xl tracking-wide">Atelier</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ivory/70">
            A quiet studio for timeless menswear — compose elegant combinations,
            study classic rules, and keep the looks that endure.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-warm-gold-soft">
            Explore
          </p>
          <ul className="mt-4 space-y-2">
            {EXPLORE.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ivory/80 hover:text-ivory transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-warm-gold-soft">
            Coming soon
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ivory/70">
            AI styling, wardrobe sync, and seasonal capsules are on the roadmap.
          </p>
          <Link
            href="/future"
            className="mt-4 inline-block text-sm text-warm-gold-soft hover:text-warm-gold transition-colors underline underline-offset-4 decoration-warm-gold/40"
          >
            View the future modules
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-xs text-ivory/50">
            © {new Date().getFullYear()} Atelier. Timeless menswear.
          </p>
        </div>
      </div>
    </footer>
  );
}
