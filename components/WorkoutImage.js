"use client";

import { useState } from "react";
import { Dumbbell } from "lucide-react";
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
    <img src={src} alt={alt} className={className} onError={() => setFailedSrc(src)} {...rest} />
  );
}
