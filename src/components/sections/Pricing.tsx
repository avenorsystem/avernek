import Container from "../Container";
import SectionHeading from "../SectionHeading";
import ScrollReveal from "../ScrollReveal";
import { LinkButton } from "../Button";
import ShineBorder from "../ui/ShineBorder";
import { packages, packagesNote } from "@/lib/content";

export default function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-24 overflow-hidden bg-paper py-32 md:py-48">
      <Container className="relative">
        <SectionHeading
          eyebrow="Packages"
          title={
            <>
              Three depths of the same <em>system.</em>
            </>
          }
          description="Each package builds on the last — the audit picks the fit."
        />

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => {
            const featured = Boolean(pkg.featured);
            return (
              <ScrollReveal key={pkg.id} delay={i * 0.1} className="h-full">
                <div
                  className={`card-lift relative flex h-full flex-col overflow-hidden p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover md:p-8 ${
                    featured ? "lg:z-10 lg:scale-[1.04]" : ""
                  }`}
                >
                  {/* The recommended tier earns the travelling violet stroke. */}
                  {featured && <ShineBorder borderWidth={1.5} duration={12} />}

                  {featured && (
                    <span className="absolute -top-0 left-1/2 -translate-x-1/2 rounded-b-lg bg-sky px-4 py-1 text-[11px] font-semibold uppercase tracking-wide text-paper">
                      Recommended
                    </span>
                  )}

                  <span className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-sky">
                    {pkg.tier}
                  </span>
                  <h3 className="relative mt-2 font-display text-2xl font-medium text-ink">
                    {pkg.name}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted">{pkg.summary}</p>

                  <div className="relative mt-6 flex flex-col gap-2 rounded-2xl border border-line bg-white/[0.02] p-4 text-xs">
                    <div className="flex gap-2">
                      <span className="shrink-0 text-muted">Best for:</span>
                      <span className="text-graphite">{pkg.whoFor}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="shrink-0 text-muted">System depth:</span>
                      <span className="text-graphite">{pkg.depth}</span>
                    </div>
                  </div>

                  <p className="relative mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    Key inclusions
                  </p>
                  <ul className="relative mt-3 flex flex-1 flex-col gap-3">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-graphite">
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          className="mt-0.5 h-4 w-4 shrink-0 text-sky"
                          aria-hidden
                        >
                          <path
                            d="M4 10.5 8 14 16 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="relative mt-7">
                    <LinkButton
                      href="#contact"
                      variant={featured ? "primary" : "secondary"}
                      className="w-full"
                    >
                      See if it&apos;s a fit
                    </LinkButton>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <p className="mx-auto mt-12 max-w-2xl rounded-2xl border border-line bg-card p-5 text-center text-sm leading-relaxed text-muted">
          {packagesNote}
        </p>
      </Container>
    </section>
  );
}
