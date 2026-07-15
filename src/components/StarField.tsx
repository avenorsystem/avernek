/**
 * Hero starfield — a designed constellation, not a random scatter.
 *
 * Every point is authored: positions cluster toward the upper corners and thin
 * out behind the headline so text always stays clean, sizes/delays vary so the
 * field breathes instead of blinking in unison, and the whole layer is masked
 * so it dissolves rather than ending on a hard edge. Values are static (no
 * Math.random) so the server and client render identically.
 *
 * Pure CSS, so it costs no JS — and it respects prefers-reduced-motion via the
 * global reduced-motion rule (the stars simply sit still).
 */

type Star = { x: number; y: number; s: number; d: number; o: number; glow?: boolean };

const stars: Star[] = [
  // upper-left cluster
  { x: 6, y: 12, s: 2, d: 0, o: 0.7, glow: true },
  { x: 13, y: 26, s: 1, d: 1.6, o: 0.5 },
  { x: 3, y: 38, s: 1.5, d: 3.1, o: 0.45 },
  { x: 19, y: 8, s: 1, d: 2.2, o: 0.55 },
  { x: 24, y: 33, s: 1, d: 4.2, o: 0.35 },
  { x: 9, y: 54, s: 1.5, d: 2.7, o: 0.4 },
  { x: 16, y: 68, s: 1, d: 0.8, o: 0.3 },
  { x: 2, y: 74, s: 2, d: 3.6, o: 0.5, glow: true },
  // upper-right cluster
  { x: 94, y: 10, s: 2, d: 1.1, o: 0.7, glow: true },
  { x: 86, y: 22, s: 1, d: 2.9, o: 0.5 },
  { x: 97, y: 34, s: 1.5, d: 0.4, o: 0.45 },
  { x: 80, y: 6, s: 1, d: 3.8, o: 0.5 },
  { x: 76, y: 30, s: 1, d: 1.9, o: 0.35 },
  { x: 91, y: 52, s: 1.5, d: 4.6, o: 0.4 },
  { x: 83, y: 66, s: 1, d: 2.4, o: 0.3 },
  { x: 98, y: 76, s: 2, d: 0.6, o: 0.45, glow: true },
  // sparse mid band — kept small and dim so the headline stays legible
  { x: 34, y: 16, s: 1, d: 3.3, o: 0.28 },
  { x: 66, y: 13, s: 1, d: 1.4, o: 0.28 },
  { x: 45, y: 5, s: 1, d: 4.9, o: 0.22 },
  { x: 57, y: 78, s: 1, d: 2.1, o: 0.24 },
  { x: 39, y: 88, s: 1.5, d: 0.9, o: 0.3 },
  { x: 63, y: 92, s: 1, d: 3.7, o: 0.26 },
  { x: 28, y: 82, s: 1, d: 5.2, o: 0.24 },
  { x: 72, y: 85, s: 1.5, d: 1.7, o: 0.28 },
];

export default function StarField({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_92%_86%_at_50%_40%,#000_35%,transparent_92%)] [-webkit-mask-image:radial-gradient(ellipse_92%_86%_at_50%_40%,#000_35%,transparent_92%)] ${className}`}
    >
      {/* drifting violet aurora behind the headline */}
      <span
        className="aurora left-1/2 top-[-14rem] h-[30rem] w-[46rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(139,65,251,0.30),transparent_66%)]"
      />
      <span
        className="aurora left-[8%] top-[38%] h-[22rem] w-[30rem] bg-[radial-gradient(ellipse_at_center,rgba(139,65,251,0.11),transparent_70%)]"
        style={{ animationDelay: "-13s", animationDuration: "34s" }}
      />

      {stars.map((star, i) => (
        <span
          key={i}
          className={`star ${star.glow ? "star-glow" : ""}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.s}px`,
            height: `${star.s}px`,
            opacity: star.o,
            animationDelay: `${star.d}s`,
            animationDuration: `${4.5 + (i % 5)}s`,
          }}
        />
      ))}
    </div>
  );
}
