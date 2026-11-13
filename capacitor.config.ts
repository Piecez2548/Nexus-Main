import type { CapacitorConfig } from "@capacitor/cli";

// Nexus Finance: the standalone Android app for this repo. Its own app id so
// it installs next to the Nexus hub app (com.nexus.app, built from the Nexus
// repo) instead of replacing it.
const config: CapacitorConfig = {
  appId: "com.nexus.finance",
  appName: "Nexus Finance",
  webDir: "dist",
  // Capacitor's default ("debug") writes every plugin call and its result to
  // logcat in debug builds, including the app-lock PIN returned by
  // NativeBiometric.getCredentials, so bridge logging stays off.
  loggingBehavior: "none",
};

export default config;
