"use client";

import { useState } from "react";
import { Dumbbell } from "lucide-react";

// An <img> that survives a broken link. The workout photos come from another
// website, so if one fails to load we show a neutral placeholder instead of the
// browser's broken-image icon.
export default function WorkoutImage({ src, alt, className = "", ...rest }) {
  const [failedSrc, setFailedSrc] = useState(null);

  if (!src || failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex aspect-[4/3] items-center justify-center bg-raised text-muted ${className}`}
      >
        <Dumbbell size={36} aria-hidden="true" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} onError={() => setFailedSrc(src)} {...rest} />
  );
}
