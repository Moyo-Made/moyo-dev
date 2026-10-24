"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getProject } from "@/lib/projects";

const CARD_W = 320;
const GAP = 14;
const EDGE = 16;

type Position = { left: number; top: number; above: boolean };

/** Card position for an anchor; x is the cursor, or the phrase's centre. */
function positionFor(anchor: HTMLElement, clientX?: number): Position {
  const rect = anchor.getBoundingClientRect();
  const x = clientX ?? rect.left + rect.width / 2;
  const left = Math.min(
    Math.max(x - CARD_W / 2, EDGE),
    window.innerWidth - CARD_W - EDGE,
  );
  // Room above for the card (roughly 300px)? Otherwise drop below.
  const above = rect.top > 320;
  return { left, top: above ? rect.top - GAP : rect.bottom + GAP, above };
}

/**
 * An underlined phrase in the README that previews a project — after
 * oyin.design's "hover the underlined words to see the work".
 *
 * - Mouse: a card follows the cursor along the line, above the phrase (or
 *   below it near the top of the screen).
 * - Keyboard: the same card on focus. Esc dismisses it.
 * - Touch: no card; the inline thumbnail does the job and a tap opens the work.
 * - Screen readers: the project's outcome is the link's description.
 */
export function Reveal({
  project: slug,
  children,
}: {
  project: string;
  children: React.ReactNode;
}) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const lastX = useRef<number | undefined>(undefined);
  const [pos, setPos] = useState<Position | null>(null);
  const descId = useId();
  const open = pos !== null;

  // While open: Esc dismisses, and the card follows its phrase when the page
  // scrolls (focusing a link scrolls it into view, so closing would be wrong).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPos(null);
    const onScroll = () =>
      anchorRef.current && setPos(positionFor(anchorRef.current, lastX.current));
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  const project = getProject(slug);
  if (!project) throw new Error(`<Reveal> has no project "${slug}"`);

  function place(clientX?: number) {
    lastX.current = clientX;
    setPos(positionFor(anchorRef.current!, clientX));
  }

  const hide = () => setPos(null);

  const href = project.caseStudy
    ? `/work/${project.slug}`
    : (project.links.live ?? project.links.code ?? "/#work");
  const external = !href.startsWith("/");

  const triggerProps = {
    ref: anchorRef,
    href,
    "aria-describedby": descId,
    onPointerEnter: (e: React.PointerEvent) =>
      e.pointerType === "mouse" && place(e.clientX),
    onPointerMove: (e: React.PointerEvent) =>
      e.pointerType === "mouse" && place(e.clientX),
    onPointerLeave: hide,
    onFocus: (e: React.FocusEvent<HTMLAnchorElement>) =>
      e.currentTarget.matches(":focus-visible") && place(),
    onBlur: hide,
    className:
      "underline decoration-muted/50 decoration-1 underline-offset-[0.18em] transition-[text-decoration-color] hover:decoration-signal hover:decoration-2 focus-visible:decoration-signal",
  };

  return (
    <>
      {external ? (
        <a {...triggerProps} target="_blank" rel="noreferrer">
          {children}
        </a>
      ) : (
        <Link {...triggerProps}>{children}</Link>
      )}
      {project.image && (
        <Image
          src={project.image.src}
          alt=""
          width={96}
          height={60}
          sizes="48px"
          className="mx-1.5 inline-block h-[0.8em] w-[1.4em] -translate-y-[0.06em] -rotate-3 rounded-[2px] object-cover align-middle shadow-sm"
        />
      )}
      <span id={descId} className="sr-only">
        {project.title}: {project.outcome}
      </span>

      {pos &&
        createPortal(
          <div
            aria-hidden
            className="reveal-card pointer-events-none fixed z-30 -rotate-2 border border-line bg-paper p-2 shadow-[0_24px_48px_-16px_rgb(15_15_13/0.35)]"
            style={{
              left: pos.left,
              top: pos.top,
              width: CARD_W,
              translate: pos.above ? "0 -100%" : undefined,
            }}
          >
            {project.image && (
              <Image
                src={project.image.src}
                alt=""
                width={CARD_W * 2}
                height={CARD_W * 1.25}
                sizes={`${CARD_W}px`}
                className="aspect-[16/10] w-full object-cover object-top"
              />
            )}
            <div className="px-1 pt-3 pb-1">
              <p className="font-serif text-xl leading-tight">{project.title}</p>
              <p className="mt-1 text-sm leading-snug text-muted">
                {project.outcome}
              </p>
              <p className="label-mono mt-3 text-muted">
                {project.stack.slice(0, 3).join(" · ")}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
