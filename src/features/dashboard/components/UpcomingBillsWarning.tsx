import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

import { useSubscriptionStore } from "@/features/finance/store/subscriptionStore";
import { projectUpcomingCashFlow, UPCOMING_HORIZON_DAYS } from "@/features/finance/utils/upcomingCashFlow";
import { useTranslation } from "@/i18n/useTranslation";

const baht = (value: number) => value.toLocaleString(undefined, { maximumFractionDigits: 0 });

// Renders nothing unless active subscriptions due soon would push the
// overall balance below zero -- same "quiet until there's something worth
// showing" precedent as BackupReminderCard. The math lives in
// projectUpcomingCashFlow; this only formats it.
export default function UpcomingBillsWarning({ balance }: { balance: number }) {
  const { t } = useTranslation();
  const subscriptions = useSubscriptionStore((s) => s.subscriptions);
  const loadSubscriptions = useSubscriptionStore((s) => s.loadSubscriptions);

  useEffect(() => {
    void loadSubscriptions();
  }, [loadSubscriptions]);

  const { upcomingExpense, upcomingIncome, projectedBalance } = projectUpcomingCashFlow(subscriptions, balance);
  if (upcomingExpense === 0 || projectedBalance >= 0) return null;

  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/60 dark:bg-red-950/30"
    >
      <AlertTriangle size={20} className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" />

      <div className="min-w-0 flex-1">
        <h2 className="font-semibold">{t("dashboard.billsWarningTitle")}</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {t("dashboard.billsWarningBody", {
            days: UPCOMING_HORIZON_DAYS,
            expense: baht(upcomingExpense),
            income: baht(upcomingIncome),
            balance: baht(balance),
            projected: baht(projectedBalance),
          })}
        </p>
        <Link
          to="/subscriptions"
          className="mt-3 inline-block rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-700"
        >
          {t("dashboard.billsWarningAction")}
        </Link>
      </div>
    </div>
  );
}
