import Container from "../Container";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import IntegrationNetwork from "../IntegrationNetwork";
import Mark from "../Mark";
import Marquee from "../ui/Marquee";
import ShineBorder from "../ui/ShineBorder";
import { testimonials, type Testimonial } from "@/lib/content";

type SignalMetric = {
  value?: number;
  lead?: string;
  suffix: string;
  label: string;
  note: string;
};

const signalMetrics: SignalMetric[] = [
  {
    lead: "Under ",
    value: 60,
    suffix: "s",
    label: "First response target",
    note: "Designed so new inquiries get a professional answer while intent is still hot.",
  },
  {
    value: 100,
    suffix: "%",
    label: "Inquiry capture",
    note: "Messages, forms, and lead details are pushed into one organized system.",
  },
  {
    value: 24,
    suffix: " / 7",
    label: "Coverage window",
    note: "After-hours questions are handled instead of waiting for the next business day.",
  },
  {
    value: 1,
    suffix: " pipeline",
    label: "Follow-up visibility",
    note: "Owners see who is new, qualified, followed up, booked, or lost.",
  },
];

// Avatar tints, assigned by index — WhatsApp-style deep fill + light initials,
// so a new real testimonial gets a unique colour with no extra styling work.
const avatarTints = [
  { bg: "#123b35", fg: "#6fd8c0" },
  { bg: "#3d1d2b", fg: "#f18fa9" },
  { bg: "#262048", fg: "#9d94ea" },
  { bg: "#3b2d13", fg: "#e2bb6c" },
  { bg: "#14303f", fg: "#7cc3e0" },
  { bg: "#33241f", fg: "#dda183" },
];

function SignalMetricCard({ metric }: { metric: SignalMetric }) {
  return (
    <div className="card-lift h-full p-7 md:p-8">
      <p className="font-display text-4xl font-medium text-ink">
        {metric.lead}
        {typeof metric.value === "number"
          ? `${metric.value.toLocaleString("en-US")}${metric.suffix}`
          : metric.suffix}
      </p>
      <h3 className="mt-4 text-base font-semibold text-ink">{metric.label}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{metric.note}</p>
    </div>
  );
}

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const tint = avatarTints[index % avatarTints.length];
  return (
    <figure className="card-lift relative flex w-[23rem] shrink-0 flex-col p-6 transition-colors duration-300 hover:border-brass/40">
      <svg viewBox="0 0 38 28" className="h-5 w-7 text-sky/50" fill="currentColor" aria-hidden>
        <path d="M0 28V15.5C0 6.8 5.2 1.3 14 0l1.2 4.4C9.6 6 6.6 9 6.6 13.4H13V28H0zm22 0V15.5C22 6.8 27.2 1.3 36 0l1.2 4.4C31.6 6 28.6 9 28.6 13.4H35V28H22z" />
      </svg>
      <blockquote className="mt-4 text-[13.5px] leading-relaxed text-graphite">{t.quote}</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold"
          style={{ backgroundColor: tint.bg, color: tint.fg }}
        >
          {t.initials}
        </span>
        <span>
          <span className="block text-[13.5px] font-semibold text-ink">{t.name}</span>
          <span className="block text-xs text-muted">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Proof() {
  return (
    <section id="proof" className="relative scroll-mt-24 overflow-hidden bg-paper-deep py-32 md:py-48">
      <Container className="relative">
        <SectionHeading
          title={
            <>
              A system built for <em>cleaner</em> inquiry handling.
            </>
          }
          description="The operating standards built into every system we ship."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {signalMetrics.map((metric, i) => (
            <ScrollReveal key={metric.label} delay={(i % 4) * 0.06} className="h-full">
              <SignalMetricCard metric={metric} />
            </ScrollReveal>
          ))}
        </div>

        {/* Promise band — dark, with a slow violet shine travelling the stroke */}
        <ScrollReveal className="card-lift relative mt-6 overflow-hidden p-7 text-left sm:p-9">
          <ShineBorder duration={18} />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brass-bright/10 blur-3xl"
          />
          <div className="relative flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brass-wash text-brass">
              <Mark className="h-5 w-5" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Our promise
            </p>
          </div>
          <p className="relative mt-4 max-w-3xl text-sm leading-relaxed text-graphite sm:text-base">
            We guarantee the parts we control: the system live, faster first replies, lead tracking,
            and clear reporting. Sales still depend on your offer, market, and follow-up.
          </p>
        </ScrollReveal>

        {/* Testimonials — rendered only when real, permissioned quotes exist.
            See `testimonials` in lib/content.ts. */}
        {testimonials.length > 0 && (
          <ScrollReveal className="mt-32 text-center md:mt-44">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky">
              Testimonials
            </span>
            <h3 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-medium leading-[1.06] text-ink md:text-[2.5rem]">
              What our clients are <em>saying.</em>
            </h3>
          </ScrollReveal>
        )}
      </Container>

      {testimonials.length > 0 && (
        <div className="relative mt-14 flex w-full flex-col items-center gap-4 overflow-hidden">
          {/* Top row: right to left. */}
          <Marquee pauseOnHover className="[--duration:44s] [--gap:1.25rem]">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} t={t} index={i} />
            ))}
          </Marquee>
          {/* Bottom row: left to right. */}
          <Marquee reverse pauseOnHover className="[--duration:44s] [--gap:1.25rem]">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} t={t} index={i} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-paper-deep to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-paper-deep to-transparent" />
        </div>
      )}

      {/* "Built on" strip — its own beat, so it needs the same breathing room
          as a section break rather than a paragraph gap. */}
      <div className="relative mt-32 md:mt-44">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
          Built on technology you already trust
        </p>
        <div className="mt-10 px-4 sm:px-6">
          <IntegrationNetwork />
        </div>
      </div>
    </section>
  );
}
