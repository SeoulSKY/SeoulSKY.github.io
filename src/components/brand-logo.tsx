import type { SVGProps } from "react";

/**
 * The SeoulSKY brand logo: the swallow. Every curve is an arc whose radius
 * is 3.5·φⁿ; see `brand/logo-construction.svg`. Same shape as
 * `src/app/icon.svg`. It fills with `currentColor`, so colour it with a
 * text class (`text-peach`).
 */
export default function BrandLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="44.73 46.69 161.88 161.88"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M136.607 172.612 L52.128 171.523 A1126.989 1126.989 0 0 0 135.715 147.781 A164.425 164.425 0 0 1 110.503 49.800 L165.779 107.489 A38.816 38.816 0 0 1 187.478 115.378 A23.989 23.989 0 0 0 199.152 120.108 A38.816 38.816 0 0 0 186.678 138.947 A62.805 62.805 0 0 1 162.932 172.165 A266.046 266.046 0 0 1 99.592 205.476 L136.607 172.612 Z" />
    </svg>
  );
}
