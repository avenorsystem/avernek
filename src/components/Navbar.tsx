"use client";

import { type MouseEvent, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import Logo from "./Logo";
import { nav } from "@/lib/site";

const sectionIds = nav.map((item) => item.href.slice(1));
const menuId = "primary-navigation-menu";
type ViewportTier = "mobile" | "tablet" | "laptop" | "desktop";

function getViewportTier(width: number): ViewportTier {
  if (width >= 1280) return "desktop";
  if (width >= 1024) return "laptop";
  if (width >= 640) return "tablet";
  return "mobile";
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("demo");
  const [viewportTier, setViewportTier] = useState<ViewportTier>("mobile");
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled((current) => {
      // A small hysteresis gap prevents flicker around the transition point.
      const next = current ? latest > 18 : latest > 42;
      return next === current ? current : next;
    });
  });

  useEffect(() => {
    const updateViewportTier = () => setViewportTier(getViewportTier(window.innerWidth));

    updateViewportTier();
    setScrolled(window.scrollY > 42);
    window.addEventListener("resize", updateViewportTier);
    return () => window.removeEventListener("resize", updateViewportTier);
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

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const closeAtDesktop = () => {
      if (window.innerWidth >= 1280) setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeAtDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeAtDesktop);
    };
  }, [open]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;

    const id = href.slice(1);
    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    setActiveSection(id);
    setOpen(false);
    section.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const motionTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };
  const scrolledWidth = {
    mobile: "calc(100% - 20px)",
    tablet: "calc(100% - 32px)",
    laptop: "calc(100% - 32px)",
    // Cap the floating bar around its actual content instead of tying it to
    // the viewport, which leaves excessive empty space on wide displays.
    desktop: "min(calc(100% - 32px), 70rem)",
  }[viewportTier];
  const mobileMenuWidth = scrolled
    ? scrolledWidth
    : viewportTier === "mobile"
      ? "calc(100% - 20px)"
      : "calc(100% - 32px)";
  const floatingTop = viewportTier === "mobile" ? 8 : 12;
  const mobileMenuTop = scrolled
    ? viewportTier === "mobile"
      ? 78
      : 82
    : viewportTier === "mobile"
      ? 86
      : 90;

  return (
    <>
      <motion.header
        initial={reduceMotion ? false : { opacity: 0, y: -8 }}
        animate={{
          opacity: 1,
          y: 0,
          width: scrolled ? scrolledWidth : "100%",
          top: scrolled ? floatingTop : 0,
          borderRadius: scrolled ? 999 : 0,
          backgroundColor: scrolled ? "rgba(19, 19, 23, 0.9)" : "rgba(19, 19, 23, 0)",
          borderColor: scrolled ? "rgba(243, 242, 238, 0.12)" : "rgba(243, 242, 238, 0)",
          boxShadow: scrolled
            ? "0 20px 55px -24px rgba(0, 0, 0, 0.9)"
            : "0 0 0 0 rgba(0, 0, 0, 0)",
          backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
        }}
        transition={motionTransition}
        style={{ left: "50%", x: "-50%" }}
        className="fixed z-50 border border-transparent"
      >
        <div
          className={`mx-auto flex w-full max-w-container items-center justify-between transition-[padding] duration-500 ease-out ${
            scrolled
              ? "px-3 py-2 sm:px-4 xl:px-5"
              : "px-3 py-4 sm:px-6 xl:px-8 xl:py-5"
          }`}
        >
          <Logo className="shrink-0 [&>span:first-of-type]:h-8 [&>span:first-of-type]:w-8 [&>span:last-of-type]:text-base max-[360px]:[&>span:last-of-type]:hidden sm:[&>span:first-of-type]:h-9 sm:[&>span:first-of-type]:w-9 sm:[&>span:last-of-type]:text-lg" />

          <nav aria-label="Primary navigation" className="hidden items-center gap-0.5 xl:flex">
            {nav.map((item) => {
              const id = item.href.slice(1);
              const isActive = activeSection === id;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className={`group relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors duration-200 xl:px-3.5 ${
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                  <span className="absolute inset-x-3 -bottom-px h-px overflow-hidden xl:inset-x-3.5">
                    {isActive ? (
                      <motion.span
                        layoutId="navbar-active-indicator"
                        className="block h-full rounded-full bg-sky-bright"
                        transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 430, damping: 36 }}
                      />
                    ) : (
                      <span className="block h-full origin-left scale-x-0 rounded-full bg-ink/45 transition-transform duration-200 ease-out group-hover:scale-x-100" />
                    )}
                  </span>
                </a>
              );
            })}
          </nav>

          <motion.a
            href="#contact"
            onClick={(event) => handleNavClick(event, "#contact")}
            whileHover={reduceMotion ? undefined : { y: -1, scale: 1.015 }}
            whileTap={reduceMotion ? undefined : { scale: 0.975 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="btn-sheen hidden min-h-10 shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold tracking-wide text-white transition-[filter,box-shadow] duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-paper xl:inline-flex"
          >
            Book a Free Audit
            <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden>
              <path d="M6 14 14 6M8 6h6v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>

          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 text-ink transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:rounded-full xl:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Menu"}</span>
            <span className="relative block h-4 w-5" aria-hidden>
              <motion.span
                className="absolute left-0 top-0.5 h-0.5 w-5 rounded-full bg-current"
                animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={motionTransition}
              />
              <motion.span
                className="absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current"
                animate={open ? { opacity: 0, scaleX: 0.5 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.18 }}
              />
              <motion.span
                className="absolute bottom-0.5 left-0 h-0.5 w-5 rounded-full bg-current"
                animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={motionTransition}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 cursor-default bg-black/45 backdrop-blur-[2px] xl:hidden"
            />
            <motion.nav
              id={menuId}
              aria-label="Mobile navigation"
              initial={
                reduceMotion
                  ? { opacity: 0, top: mobileMenuTop, width: mobileMenuWidth }
                  : { opacity: 0, y: -10, scale: 0.985, top: mobileMenuTop, width: mobileMenuWidth }
              }
              animate={{ opacity: 1, y: 0, scale: 1, top: mobileMenuTop, width: mobileMenuWidth }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
              transition={motionTransition}
              style={{ left: "50%", x: "-50%" }}
              className="fixed z-50 max-h-[calc(100dvh-6rem)] max-w-container overflow-y-auto overscroll-contain rounded-3xl border border-white/[0.12] bg-paper-deep/[0.97] p-2.5 shadow-[0_30px_80px_-28px_rgba(0,0,0,0.95)] backdrop-blur-2xl xl:hidden"
            >
              <motion.div
                initial="closed"
                animate="open"
                variants={{
                  closed: {},
                  open: { transition: { staggerChildren: reduceMotion ? 0 : 0.045, delayChildren: reduceMotion ? 0 : 0.04 } },
                }}
                className="flex flex-col gap-1"
              >
                {nav.map((item) => {
                  const id = item.href.slice(1);
                  const isActive = activeSection === id;

                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      onClick={(event) => handleNavClick(event, item.href)}
                      variants={{
                        closed: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -5 },
                        open: { opacity: 1, y: 0 },
                      }}
                      className={`flex min-h-12 items-center justify-between rounded-2xl px-4 py-3 text-[15px] font-medium transition-colors ${
                        isActive ? "bg-white/[0.07] text-ink" : "text-graphite hover:bg-white/[0.05] hover:text-ink"
                      }`}
                    >
                      {item.label}
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-sky-bright" aria-hidden />}
                    </motion.a>
                  );
                })}
                <motion.a
                  href="#contact"
                  onClick={(event) => handleNavClick(event, "#contact")}
                  variants={{
                    closed: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -5 },
                    open: { opacity: 1, y: 0 },
                  }}
                  whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                  className="btn-sheen mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold tracking-wide text-white"
                >
                  Book a Free Audit
                  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden>
                    <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
