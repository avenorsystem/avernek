"use client";

import { type MouseEvent, useEffect, useState } from "react";
import Logo from "./Logo";
import { LinkButton } from "./Button";
import { nav } from "@/lib/site";

const sectionIds = nav.map((item) => item.href.slice(1));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("demo");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.68;
      const current =
        sections.find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= activationLine && rect.bottom >= activationLine;
        }) ??
        sections
          .filter((section) => section.getBoundingClientRect().top <= activationLine)
          .at(-1) ??
        sections[0];

      setActiveSection(current.id);
    };

    const observer = new IntersectionObserver(updateActiveSection, {
      rootMargin: "-20% 0px -30% 0px",
      threshold: 0,
    });

    sections.forEach((section) => observer.observe(section));
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;

    const id = href.slice(1);
    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    setActiveSection(id);
    setOpen(false);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/*
        backdrop-filter breaks under a transformed ancestor, so the glass and
        any movement live on the same element.
      */}
      <header
        className={`fixed left-4 right-4 top-3 z-50 mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-full border py-2 pl-5 pr-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ease-out sm:left-6 sm:right-6 sm:top-4 sm:pl-6 sm:pr-2.5 ${
          scrolled
            ? "border-white/10 bg-paper-deep/95 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.8)]"
            : "border-white/[0.06] bg-paper-deep/75 shadow-[0_16px_44px_-28px_rgba(0,0,0,0.6)]"
        }`}
      >
        {/* Left: logo — default tone renders a light wordmark for the dark bar */}
        <Logo />

        {/* Center: nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const id = item.href.slice(1);
            const isActive = activeSection === id;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className={`rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
                  isActive
                    ? "bg-white/[0.08] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: primary CTA */}
        <div className="hidden md:block">
          <LinkButton href="#contact" className="px-5 py-2.5">
            Book a Free Audit
            <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden>
              <path
                d="M6 14 14 6M8 6h6v6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </LinkButton>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-ink transition-colors duration-200 hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-paper md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </header>

      {/* Mobile menu — own fixed element so its glass blur works. */}
      {open && (
        <div className="fixed left-4 right-4 top-[4.5rem] z-50 mx-auto max-w-6xl rounded-3xl border border-white/10 bg-paper-deep/97 p-3 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)] backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className="rounded-2xl px-3 py-3 text-base font-medium text-ink/85 transition-colors hover:bg-white/[0.05] hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <LinkButton href="#contact" className="mt-2 w-full">
              Book a Free Audit
            </LinkButton>
          </div>
        </div>
      )}
    </>
  );
}
