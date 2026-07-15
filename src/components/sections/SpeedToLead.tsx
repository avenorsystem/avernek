import ScrollReveal from "../ScrollReveal";
import { LinkButton } from "../Button";

/**
 * Speed-to-lead hook. The single most business-owner-relatable idea: the longer
 * an inquiry waits, the far less likely it ever converts.
 *
 * Attribution matters here. These specific figures are Velocify's (analysis of
 * ~3.5M leads) — NOT the MIT/Oldroyd Lead Response Management study, which is
 * frequently but wrongly credited with them. Oldroyd's findings are different
 * (contact within 5 min vs 30 min ≈ 21x more likely to qualify). Presented as
 * industry research, never as Avernek's own results.
 */

type Point = { t: string; v: number };

const data: Point[] = [
  { t: "1 min", v: 391 },
  { t: "2 min", v: 160 },
  { t: "3 min", v: 98 },
  { t: "30 min", v: 62 },
  { t: "1 hr", v: 36 },
  { t: "5 hrs", v: 24 },
  { t: "1 day", v: 17 },
];

// Violet ramp — richest at the fast end, fading as the lead goes cold.
const colors = ["#8b41fb", "#7530df", "#9252f4", "#a66cff", "#b98cff", "#cbb0f5", "#d9c9f2"];

// --- chart geometry (viewBox 1000 × 460) ---
const W = 1000;
const LEFT = 92;
const RIGHT = 940;
const TOP = 72;
const PLOT_H = 280;
const BASE = 384;
const MAX = 391;

const x = (i: number) => LEFT + (i * (RIGHT - LEFT)) / (data.length - 1);
const y = (v: number) => TOP + (1 - v / MAX) * PLOT_H;
const r = (v: number) => 14 + (v / MAX) * 44;

const pts = data.map((d, i) => ({ ...d, cx: x(i), cy: y(d.v), rr: r(d.v), c: colors[i] }));
const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.cx.toFixed(1)} ${p.cy.toFixed(1)}`).join(" ");
const areaPath = `${linePath} L ${RIGHT} ${BASE} L ${LEFT} ${BASE} Z`;
const hGrid = [0, 1, 2, 3, 4].map((k) => TOP + (k * PLOT_H) / 4);

export default function SpeedToLead() {
  return (
    <section className="relative overflow-hidden bg-paper-deep py-32 md:py-48">
      <div aria-hidden className="grid-paper grid-paper-fade absolute inset-0 opacity-60" />
      {/* Wider than the standard container — this section reads better using
          more of the horizontal space so the copy isn't broken into stubs. */}
      <div className="relative mx-auto w-full max-w-[84rem] px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1.15fr] lg:gap-20">
          <ScrollReveal>
            <span className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-brass">
              <span aria-hidden className="h-px w-8 bg-brass/50" />
              The cost of a slow reply
            </span>
            <h2 className="mt-5 max-w-2xl font-display text-4xl font-medium leading-[1.06] tracking-[-0.01em] text-ink md:text-[3.25rem]">
              Slow replies are where your <em>money leaks.</em>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-graphite sm:text-lg">
              It is rarely your ads or your pricing. Every hour an inquiry waits it goes cold, then
              buys from whoever answered first. Avernek replies in{" "}
              <span className="font-semibold text-ink">seconds</span> — turning the same inquiries
              into two to three times the booked conversations.
            </p>
            <div className="mt-8">
              <LinkButton href="#contact">Book a Free System Audit</LinkButton>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <figure className="card-lift p-3 sm:p-7">
              <figcaption className="mb-4 flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-ink">
                  Likelihood a lead converts, by reply time
                </span>
                <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-muted sm:block">
                  Higher = more likely
                </span>
              </figcaption>

              <div className="w-full overflow-hidden">
                <svg viewBox={`0 0 ${W} 460`} className="block h-auto w-full max-w-full" role="img" aria-label="Conversion likelihood falls sharply as reply time increases: 391% at one minute down to 17% after a day.">
                  <defs>
                    <linearGradient id="stlArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b41fb" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#8b41fb" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* grid — rows + columns */}
                  {hGrid.map((gy) => (
                    <line key={`h${gy}`} x1={LEFT} y1={gy} x2={RIGHT} y2={gy} stroke="rgba(243,242,238,0.07)" strokeWidth="1" />
                  ))}
                  {pts.map((p) => (
                    <line key={`v${p.t}`} x1={p.cx} y1={TOP} x2={p.cx} y2={BASE} stroke="rgba(243,242,238,0.05)" strokeWidth="1" />
                  ))}
                  {/* baseline */}
                  <line x1={LEFT} y1={BASE} x2={RIGHT} y2={BASE} stroke="rgba(243,242,238,0.22)" strokeWidth="1.5" />

                  {/* area + curve */}
                  <path d={areaPath} fill="url(#stlArea)" />
                  <path d={linePath} fill="none" stroke="#8b41fb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                  {/* points */}
                  {pts.map((p, i) => {
                    const inside = p.rr >= 24;
                    return (
                      <g key={p.t}>
                        <circle cx={p.cx} cy={p.cy} r={p.rr} fill={p.c} />
                        {inside ? (
                          <text x={p.cx} y={i === 0 ? p.cy - 4 : p.cy + 6} textAnchor="middle" fill="#fff" fontSize={i === 0 ? 34 : 20} fontWeight="700">
                            {p.v}%
                          </text>
                        ) : (
                          <text x={p.cx} y={p.cy - p.rr - 10} textAnchor="middle" fill="#f3f2ee" fontSize="20" fontWeight="700">
                            {p.v}%
                          </text>
                        )}
                        {i === 0 && (
                          <text x={p.cx} y={p.cy + 20} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600" opacity="0.9">
                            more likely
                          </text>
                        )}
                        <text x={p.cx} y={BASE + 34} textAnchor="middle" fill="#8b8b91" fontSize="19" fontWeight="600">
                          {p.t}
                        </text>
                      </g>
                    );
                  })}

                  <text x={(LEFT + RIGHT) / 2} y="446" textAnchor="middle" fill="#8b8b91" fontSize="17">
                    Time before you reply to the lead →
                  </text>
                </svg>
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-muted">
                Source: Velocify lead-response research, based on an analysis of roughly 3.5 million
                leads. Industry findings shown to illustrate the pattern — not Avernek client
                results.
              </p>
            </figure>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
