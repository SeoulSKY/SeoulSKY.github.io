import type { NextConfig } from "next";
// validates the env vars, so a missing one fails the build
import "./src/env";

const nextConfig: NextConfig = {
  // agent guidance lives in CLAUDE.md, so `next dev` need not write AGENTS.md
  agentRules: false,
  experimental: {
    // the Tailwind CSS is small, so it rides in the HTML rather than
    // holding up the first paint behind two stylesheet requests
    inlineCss: true,
  },
};

export default nextConfig;
