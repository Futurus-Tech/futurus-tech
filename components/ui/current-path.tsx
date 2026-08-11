"use client";

import { useSyncExternalStore } from "react";

/**
 * The address that produced the 404, read from the browser.
 *
 * One prerendered document answers every unmatched URL, so the server cannot
 * know which path it is standing in for without `headers()` — which would turn
 * the whole 404 dynamic for the sake of one line of text. Reading `location`
 * on the client keeps the page static, and where scripting is off the row
 * simply shows its fallback instead of a wrong answer.
 *
 * `useSyncExternalStore` rather than an effect that sets state: the address bar
 * is exactly the "external system" it exists for, and it is the one hook that
 * takes a separate server snapshot, so the fallback renders on the server and
 * the real path on the client without a hydration mismatch between them.
 */

/** The URL cannot change while this page is mounted — nothing to subscribe to. */
const subscribe = () => () => {};

function readPath(): string {
  const { pathname } = window.location;
  // Decoded so a Portuguese path reads as it was typed rather than as
  // percent-escapes; a malformed escape sequence throws, and is left as-is.
  try {
    return decodeURI(pathname);
  } catch {
    return pathname;
  }
}

export function CurrentPath({ fallback }: { fallback: string }) {
  const path = useSyncExternalStore(subscribe, readPath, () => null);

  return <>{path ?? fallback}</>;
}
