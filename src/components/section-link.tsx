import type { ComponentProps, MouseEvent } from "react";
import type { SectionId } from "@/data/content";
import { scrollToSection } from "@/lib/gsap";

interface SectionLinkProps extends Omit<ComponentProps<"a">, "href"> {
  /** the section to go to; "top" is the hero */
  to: SectionId | "top";
}

/**
 * A link to a section of this page. It is a real `#id` link, so it can be
 * middle-clicked, copied and followed before hydration; a plain click
 * scrolls there through scrollToSection() instead of jumping.
 */
export default function SectionLink({
  to,
  onClick,
  ...props
}: SectionLinkProps) {
  function follow(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    // modified clicks (new tab, new window) keep their usual meaning
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    scrollToSection(to);
  }
  return <a href={`#${to}`} onClick={follow} {...props} />;
}
