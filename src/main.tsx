import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LegacyApp from "./LegacyApp";
import { ThemeEffect } from "./providers/ThemeEffect";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeEffect />
    <LegacyApp />
  </StrictMode>,
);
