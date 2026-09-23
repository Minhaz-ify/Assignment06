"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { usePlan } from "./PlanProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const links = [
    { href: "/", label: "Workout", active: pathname === "/" || pathname.startsWith("/workout") },
    { href: "/my-plan", label: "My Plan", active: pathname.startsWith("/my-plan") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 px-4 py-3 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr]"
        aria-label="Main"
      >
        <Logo />

        <ul className="order-3 flex w-full items-center justify-center gap-2 border-t border-line pt-3 md:order-none md:w-auto md:border-0 md:pt-0">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={l.active ? "page" : undefined}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  l.active
                    ? "bg-raised text-accent"
                    : "text-muted hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 md:justify-self-end">
          <Link
            href="/my-plan"
            aria-label={`Plan: ${plan.length} items`}
            className="flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-semibold text-ink"
          >
            Plan
            <span className="min-w-[1.25rem] rounded-full bg-ink px-1.5 text-center text-xs text-accent">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            aria-label={`Saved: ${saved.length} items`}
            className="flex items-center gap-2 rounded-full border border-muted/50 px-3 py-1 text-sm font-semibold text-white hover:border-accent"
          >
            Saved
            <span className="min-w-[1.25rem] text-center text-xs text-accent">{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
