"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { lockScroll } from "@/lib/motion/scroll-lock";
import type { NavItem } from "@/content/types";

/**
 * The narrow-viewport navigation: a burger in the masthead and the full-screen
 * accent panel it opens.
 *
 * Button and panel share one piece of state, so they are one component. The
 * panel stops the page behind it — both Lenis and native scrolling — and
 * closes on Escape as well as on any link inside it.
 *
 * It covers the document rather than sitting inside it, which is what makes it
 * a dialog and not a disclosure: while it is open, everything underneath is
 * unreachable to a pointer and has to be unreachable to a keyboard too. That
 * costs three things a plain `<div>` does not give for free — focus moving in,
 * focus staying in, and focus going back where it came from — and all three are
 * handled below.
 */
export function MobileMenu({
  items,
  contact,
  menuLabel,
  closeLabel,
  dialogLabel,
}: {
  items: readonly NavItem[];
  contact: NavItem;
  menuLabel: string;
  closeLabel: string;
  dialogLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  /* Whether the panel has been open at least once. Focus is returned to the
     burger on close, but only on a close — running that on the first render
     would steal focus from wherever the reader actually was. */
  const wasOpen = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) {
      // Send focus back to the control that opened the panel, so the reader
      // resumes from where they left rather than at the top of the document.
      if (wasOpen.current) triggerRef.current?.focus();
      return;
    }

    wasOpen.current = true;
    lockScroll(true);

    const panel = panelRef.current;
    // Everything the panel can hand focus to, in document order. Read on each
    // keypress rather than cached: it is a handful of nodes, and a cached list
    // is a list that can be wrong.
    const focusable = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );

    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;

      // The trap. Tab off either end of the panel and focus wraps to the other
      // end instead of walking into the masthead the panel is covering.
      const nodes = focusable();
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      lockScroll(false);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={menuLabel}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        // The two bars are 25px tall between them. The box around them is what
        // a thumb actually has to hit, so it is sized to the 44px the rest of
        // the page's controls are held to rather than to the mark it draws.
        className="flex size-11 cursor-pointer flex-col items-center justify-center gap-[5px] border-0 bg-transparent nav:hidden"
      >
        <span className="block h-0.5 w-6 bg-text" />
        <span className="block h-0.5 w-6 bg-text" />
      </button>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label={dialogLabel}
          className="fixed inset-0 z-[55] flex flex-col justify-center bg-accent px-edge pb-edge pt-24 text-bg"
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-edge top-[18px] cursor-pointer border-2 border-bg bg-transparent px-3 py-[9px] font-heading text-[12px] font-extrabold uppercase tracking-[0.08em] text-bg"
          >
            {closeLabel}
          </button>

          {/* Labelled separately from the dialog: a reader listing landmarks
              should find the navigation, not just the box it sits in. */}
          <nav aria-label={dialogLabel} className="flex flex-col">
            {[...items, contact].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="font-heading text-menu font-extrabold text-bg"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
