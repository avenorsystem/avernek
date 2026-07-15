"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * "Inquiry Control Center" — a genuinely animated preview of one inquiry moving
 * through the system: the message lands, the AI types, the reply goes out, then
 * each status lights up in turn. Loops with a pause at the end.
 *
 * Implementation notes:
 * - Every element is always rendered and only opacity/transform animate, so the
 *   card never changes height and nothing jumps as the sequence plays.
 * - The typing indicator is absolutely positioned over the reply slot for the
 *   same reason.
 * - SSR-safe: state starts at the FINISHED step, so the server and the first
 *   client render match (no hydration mismatch) and the content is fully
 *   readable without JS. The loop only starts after mount.
 * - prefers-reduced-motion: stays on the finished step, no looping.
 */

const steps = [
  { label: "Reply sent", meta: "in 6 seconds", icon: "reply" },
  { label: "Interest captured", meta: "IELTS · weekend batch", icon: "tag" },
  { label: "Qualified", meta: "High intent", icon: "star" },
  { label: "Team alerted", meta: "Follow-up scheduled · 11 AM", icon: "bell" },
] as const;

// 1 message · 2 typing · 3 reply · 4-7 rail · 8 complete (then hold, restart)
const DONE = 4 + steps.length;
const HOLD = 4;
const TICK = 950;

function MessengerIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <radialGradient
          id="messenger-gradient"
          cx="11.087"
          cy="7.022"
          r="47.612"
          gradientTransform="matrix(1 0 0 -1 0 50)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#1292ff" />
          <stop offset="0.23" stopColor="#4e69ff" />
          <stop offset="0.428" stopColor="#6d53ff" />
          <stop offset="0.754" stopColor="#df47aa" />
          <stop offset="0.946" stopColor="#ff6257" />
        </radialGradient>
      </defs>
      <path
        fill="url(#messenger-gradient)"
        d="M44 23.5C44 34.27 35.05 43 24 43c-1.65 0-3.25-.19-4.78-.56-.47-.11-.95-.07-1.38.14l-4.38 2.19C12.33 45.34 11 44.51 11 43.25v-4.03c0-.57-.26-1.11-.68-1.5C6.43 34.17 4 29.11 4 23.5 4 12.73 12.95 4 24 4s20 8.73 20 19.5Z"
      />
      <path
        fill="#fff"
        d="m34.39 18.5-5.7 4.22c-.61.46-1.44.46-2.04.01l-3.97-2.99a3.7 3.7 0 0 0-5.19.94l-1.21 1.89-4.11 6.68c-.6.94.55 2.01 1.44 1.34l5.7-4.22c.61-.46 1.44-.46 2.04-.01l3.97 2.99a3.7 3.7 0 0 0 5.19-.94l1.21-1.89 4.11-6.68c.6-.94-.55-2.01-1.44-1.34Z"
      />
    </svg>
  );
}

function StepIcon({ name }: { name: string }) {
  const p = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-3.5 w-3.5",
    "aria-hidden": true,
  };
  if (name === "reply") return (<svg {...p}><path d="M9 7 4 12l5 5" /><path d="M4 12h11a5 5 0 0 1 5 5v1" /></svg>);
  if (name === "tag") return (<svg {...p}><path d="M4 4h8l8 8-8 8-8-8V4z" /><circle cx="8.5" cy="8.5" r="1.2" /></svg>);
  if (name === "star") return (<svg {...p}><path d="m12 4 2.3 4.9 5.2.7-3.8 3.6.9 5.1L12 15.9 7.4 18.3l.9-5.1-3.8-3.6 5.2-.7L12 4z" /></svg>);
  return (<svg {...p}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>);
}

export default function HeroConsole() {
  const [step, setStep] = useState(DONE);

  useEffect(() => {
    // Read the preference directly rather than via useReducedMotion(), which
    // returns null on the first render — that let the loop start briefly before
    // being cut off for users who asked for no motion. Also re-runs if they
    // toggle the setting while the page is open.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let id: ReturnType<typeof setInterval> | undefined;

    const run = () => {
      clearInterval(id);
      if (mq.matches) {
        setStep(DONE); // park on the completed state, no looping
        return;
      }
      let s = 0;
      setStep(0);
      id = setInterval(() => {
        s = s >= DONE + HOLD ? 0 : s + 1;
        setStep(s);
      }, TICK);
    };

    run();
    mq.addEventListener("change", run);
    return () => {
      clearInterval(id);
      mq.removeEventListener("change", run);
    };
  }, []);

  const at = (n: number) => step >= n;
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="card-lift relative overflow-hidden">
      {/* macOS-style Messenger window chrome */}
      <div className="relative flex h-12 items-center border-b border-white/[0.08] bg-black/20 px-4">
        <div className="flex items-center gap-2" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]" />
        </div>
        <div className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
          <MessengerIcon />
          <span className="text-xs font-semibold text-ink">Messenger</span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
      {/* conversation header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span className="absolute h-3 w-3 animate-[ping_2.6s_ease-out_infinite] rounded-full bg-[#31c85a]/40" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-[#31c85a]" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-ink">Avernek Assistant</span>
            <span className="block text-[10px] font-medium text-muted">Active now</span>
          </span>
        </div>
        <span className="rounded-full bg-brass-wash px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brass">
          Preview
        </span>
      </div>

      <div aria-hidden className="rule-fade my-5 h-px w-full" />

      {/* channel line */}
      <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
        <span>New inquiry</span>
        <span>8:42 PM</span>
      </div>

      {/* conversation */}
      <div className="mt-3 flex flex-col gap-2">
        <motion.div
          animate={{ opacity: at(1) ? 1 : 0, y: at(1) ? 0 : 8 }}
          transition={{ duration: 0.4, ease }}
          className="max-w-[80%] self-start rounded-2xl rounded-tl-md bg-paper-deep px-4 py-2.5 text-sm leading-relaxed text-graphite"
        >
          Weekend IELTS class ko fee kati ho?
        </motion.div>

        {/* the reply slot holds its own height; typing overlays it */}
        <div className="relative flex min-h-[3.9rem] flex-col items-end justify-start">
          <motion.div
            animate={{ opacity: step === 2 ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="absolute right-0 top-0 flex items-center gap-1.5 rounded-2xl rounded-tr-md bg-white/[0.06] px-4 py-3"
            aria-hidden
          >
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                className="h-1.5 w-1.5 animate-node rounded-full bg-brass"
                style={{ animationDelay: `${d * 0.18}s` }}
              />
            ))}
          </motion.div>

          <motion.div
            animate={{ opacity: at(3) ? 1 : 0, y: at(3) ? 0 : 8 }}
            transition={{ duration: 0.4, ease }}
            className="max-w-[85%] self-end rounded-2xl rounded-tr-md bg-[linear-gradient(180deg,#a66cff,#8b41fb)] px-4 py-2.5 text-sm leading-relaxed text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
          >
            Namaste! Weekend batch runs Sat–Sun. Want me to share the fee and hold a seat?
          </motion.div>
        </div>
      </div>

      <div aria-hidden className="rule-fade my-5 h-px w-full" />

      {/* status rail — each stage lights up in turn */}
      <ul className="relative flex flex-col gap-4 pl-1">
        <span aria-hidden className="absolute bottom-3 left-[15px] top-3 w-px bg-line" />
        {steps.map((s, i) => {
          const live = at(4 + i);
          return (
            <motion.li
              key={s.label}
              animate={{ opacity: live ? 1 : 0.25, y: live ? 0 : 4 }}
              transition={{ duration: 0.35, ease }}
              className="relative flex items-center gap-3"
            >
              <span
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                  live && i === steps.length - 1
                    ? "bg-brass text-white"
                    : live
                      ? "bg-brass-wash text-brass"
                      : "bg-white/[0.04] text-muted"
                }`}
              >
                <StepIcon name={s.icon} />
              </span>
              <div className="flex flex-1 items-center justify-between gap-3">
                <span className="text-sm font-semibold text-ink">{s.label}</span>
                <span className="text-[11px] font-medium text-muted">{s.meta}</span>
              </div>
            </motion.li>
          );
        })}
      </ul>

      <p className="mt-5 text-center text-xs text-muted">
        <span className="font-semibold text-ink">0 leads missed</span> after hours — every
        conversation logged.
      </p>
      </div>
    </div>
  );
}
