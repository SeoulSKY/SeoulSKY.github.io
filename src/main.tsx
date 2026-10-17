import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource-variable/bricolage-grotesque";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@/index.css";
import "@/lib/gsap";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";

// biome-ignore lint/style/noNonNullAssertion: root always exists in index.html
ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
