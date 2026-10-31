import { advanceOneBillingCycle, resolveBillingAnchorDay, resolveNextBillingDate } from "@/features/finance/utils/subscriptionMath";
import { toLocalDateString } from "@/utils/localDate";
import type { Subscription } from "@/features/finance/types";

export const UPCOMING_HORIZON_DAYS = 14;
// Bounds a daily subscription's occurrences inside the horizon (14 + margin).
const MAX_OCCURRENCES = 60;

export interface UpcomingCashFlow {
  upcomingExpense: number;
  upcomingIncome: number;
  projectedBalance: number;
}

// Deterministic look-ahead over active subscriptions only: every occurrence
// from today through `horizonDays` ahead, applied to the current overall
// balance. Past-due occurrences are not counted here -- the foreground
// due-check turns those into real transactions, which are already in
// `balance`. There is no per-account balance in this app, so this is an
// overall figure, matching the Dashboard's Balance card.
export function projectUpcomingCashFlow(
  subscriptions: Subscription[],
  balance: number,
  now: Date = new Date(),
  horizonDays: number = UPCOMING_HORIZON_DAYS
): UpcomingCashFlow {
  const end = toLocalDateString(new Date(now.getFullYear(), now.getMonth(), now.getDate() + horizonDays));
  let upcomingExpense = 0;
  let upcomingIncome = 0;

  for (const subscription of subscriptions) {
    if (subscription.status !== "active") continue;

    const anchor = resolveBillingAnchorDay(subscription.nextBillingDate, subscription.billingAnchorDay);
    let date = resolveNextBillingDate(subscription.nextBillingDate, subscription.billingFrequency, now, anchor);

    for (let i = 0; i < MAX_OCCURRENCES && date <= end; i++) {
      if ((subscription.kind ?? "expense") === "income") upcomingIncome += subscription.amount;
      else upcomingExpense += subscription.amount;
      date = advanceOneBillingCycle(date, subscription.billingFrequency, anchor);
    }
  }

  return { upcomingExpense, upcomingIncome, projectedBalance: balance + upcomingIncome - upcomingExpense };
}
