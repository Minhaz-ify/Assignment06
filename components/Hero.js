import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Workout Library
          </p>
          <h1 className="font-display text-5xl font-bold uppercase leading-[1.05] sm:text-6xl xl:text-7xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s
            plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-lg font-semibold uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5"
          >
            Browse workouts
            <ArrowDown size={20} aria-hidden="true" />
          </a>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-3xl border border-line bg-panel p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/banner.png"
              alt="Athlete training on a preacher curl machine"
              className="mx-auto h-auto w-full max-w-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
