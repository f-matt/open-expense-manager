import type { RecurringExpense } from "./RecurringExpense";
import type { MonthlyExpenses } from "./MonthlyExpenses";

export interface Expense {
  id?: number;
  recurringExpense?: RecurringExpense;
  monthExpenses?: MonthlyExpenses;
  value?: boolean;
  processed?: boolean;
}
