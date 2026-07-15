"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type ShootingStar = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  angle: number;
  length: number;
  duration: number;
};

type ShootingStarsProps = {
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  className?: string;
};

type StarStyle = CSSProperties & {
  "--shooting-x": string;
  "--shooting-y": string;
  "--shooting-angle": string;
  "--shooting-duration": string;
};

/**
 * One occasional shooting star for the hero. CSS handles every animation frame;
 * React only creates a new trajectory between passes. Motion is disabled when
 * the visitor has requested reduced motion.
 */
export default function ShootingStars({
  minDelay = 3600,
  maxDelay = 7600,
  starColor = "#e8dcff",
  trailColor = "#8b41fb",
  className = "",
}: ShootingStarsProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const [star, setStar] = useState<ShootingStar | null>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout> | undefined;

    const schedule = (first = false) => {
      clearTimeout(timer);
      if (motionPreference.matches) {
        setStar(null);
        return;
      }

      const delay = first
        ? 1200
        : Math.random() * (maxDelay - minDelay) + minDelay;

      timer = setTimeout(() => {
        const bounds = layerRef.current?.getBoundingClientRect();
        if (!bounds || bounds.width === 0 || bounds.height === 0) {
          schedule();
          return;
        }

        // Keep launches in the upper atmosphere of the hero so the effect
        // frames the message instead of repeatedly crossing the CTA cards.
        const angle = 20 + Math.random() * 14;
        const distance = Math.max(bounds.width * 0.58, 520);
        const radians = (angle * Math.PI) / 180;

        setStar({
          id: nextId.current++,
          x: -140 + Math.random() * bounds.width * 0.55,
          y: 24 + Math.random() * bounds.height * 0.28,
          dx: Math.cos(radians) * distance,
          dy: Math.sin(radians) * distance,
          angle,
          length: 90 + Math.random() * 65,
          duration: 1250 + Math.random() * 650,
        });

        schedule();
      }, delay);
    };

    const handleMotionChange = () => schedule(true);
    schedule(true);
    motionPreference.addEventListener("change", handleMotionChange);

    return () => {
      clearTimeout(timer);
      motionPreference.removeEventListener("change", handleMotionChange);
    };
  }, [maxDelay, minDelay]);

  const style: StarStyle | undefined = star
    ? {
        left: star.x,
        top: star.y,
        width: star.length,
        background: `linear-gradient(90deg, transparent, ${trailColor} 62%, ${starColor})`,
        "--shooting-x": `${star.dx}px`,
        "--shooting-y": `${star.dy}px`,
        "--shooting-angle": `${star.angle}deg`,
        "--shooting-duration": `${star.duration}ms`,
      }
    : undefined;

  return (
    <div
      ref={layerRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,#000_0%,#000_65%,transparent_94%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_65%,transparent_94%)] ${className}`}
    >
      {star && (
        <span key={star.id} className="shooting-star" style={style}>
          <span
            className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
            style={{
              backgroundColor: starColor,
              boxShadow: `0 0 8px ${starColor}, 0 0 18px ${trailColor}`,
            }}
          />
        </span>
      )}
    </div>
  );
}
