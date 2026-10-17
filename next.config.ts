import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // agent guidance lives in CLAUDE.md, so `next dev` need not write AGENTS.md
  agentRules: false,
};

export default nextConfig;
