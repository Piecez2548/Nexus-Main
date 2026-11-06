import type { ScanProgressSnapshot } from "@/features/finance/slipScanner/progress/scanProgress";
import ScanControls from "@/features/finance/slipScanner/components/ScanControls";
import { useTranslation } from "@/i18n/useTranslation";

interface Props {
  progress: ScanProgressSnapshot | null;
  running: boolean;
  onPause: () => void;
  onResume: () => void;
  onCancel: () => void;
  onBackground: () => void;
}

const RADIUS = 88;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Full-screen progress for the hands-free (open/resume) gallery scan: a ring
// that fills with the real percent, or spins while the total is still unknown,
// plus a "run in background" button that hides this screen while the scan
// keeps going. Presentational only -- the parent owns the scan and its state.
export default function ScanProgressRing({ progress, running, onPause, onResume, onCancel, onBackground }: Props) {
  const { t } = useTranslation();
  const percent = progress?.percent ?? null;
  const dashOffset = percent === null ? CIRCUMFERENCE * 0.75 : CIRCUMFERENCE * (1 - percent / 100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("slipScanner.galleryScan.ringTitle")}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-8 bg-white/95 p-6 backdrop-blur dark:bg-zinc-950/95"
    >
      <h2 className="text-xl font-semibold">{t("slipScanner.galleryScan.ringTitle")}</h2>

      <div className="relative h-56 w-56">
        <svg
          viewBox="0 0 200 200"
          className={`h-full w-full -rotate-90 ${percent === null && running ? "motion-safe:animate-spin" : ""}`}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent ?? undefined}
          aria-label={t("slipScanner.progressDashboard.title")}
        >
          <circle cx="100" cy="100" r={RADIUS} fill="none" strokeWidth="12" className="stroke-zinc-200 dark:stroke-zinc-800" />
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            className="stroke-brand-500 transition-[stroke-dashoffset] duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold tabular-nums">{percent !== null ? `${percent}%` : "…"}</span>
          <span className="mt-1 text-sm text-zinc-500 dark:text-zinc-400" aria-live="polite">
            {progress && progress.total !== null
              ? t("slipScanner.galleryScan.ringCount", { done: progress.scanned, total: progress.total })
              : t("slipScanner.galleryScan.ringPreparing")}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={onBackground}
          className="min-h-11 rounded-xl bg-brand-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-brand-500"
        >
          {t("slipScanner.galleryScan.runInBackground")}
        </button>
        <ScanControls running={running} onPause={onPause} onResume={onResume} onCancel={onCancel} />
      </div>
    </div>
  );
}
