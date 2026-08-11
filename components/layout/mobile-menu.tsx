"use client";

import { useEffect, useId, useState } from "react";

import { lockScroll } from "@/lib/motion/scroll-lock";
import type { NavItem } from "@/content/types";

/**
 * The narrow-viewport navigation: a burger in the masthead and the full-screen
 * accent panel it opens.
 *
 * Button and panel share one piece of state, so they are one component. The
 * panel stops the page behind it — both Lenis and native scrolling — and
 * closes on Escape as well as on any link inside it.
 */
export function MobileMenu({
  items,
  contact,
  menuLabel,
  closeLabel,
}: {
  items: readonly NavItem[];
  contact: NavItem;
  menuLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    lockScroll(true);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      lockScroll(false);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={menuLabel}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
        className="flex cursor-pointer flex-col gap-[5px] border-0 bg-transparent p-2 nav:hidden"
      >
        <span className="block h-0.5 w-6 bg-text" />
        <span className="block h-0.5 w-6 bg-text" />
      </button>

      {open ? (
        <div
          id={panelId}
          className="fixed inset-0 z-[55] flex flex-col justify-center bg-accent px-edge pb-edge pt-24 text-bg"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-edge top-[18px] cursor-pointer border-2 border-bg bg-transparent px-3 py-[9px] font-heading text-[12px] font-extrabold uppercase tracking-[0.08em] text-bg"
          >
            {closeLabel}
          </button>

          {[...items, contact].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-heading text-menu font-extrabold text-bg"
            >
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </>
  );
}
