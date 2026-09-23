import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="FitLog home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="" width={28} height={28} className="h-7 w-7" />
      <span className="font-display text-xl font-bold tracking-wide">FITLOG</span>
    </Link>
  );
}
