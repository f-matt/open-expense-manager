import type { Expense } from "./Expense";

export interface MonthlyExpenses {
  id?: number;
  referenceDate?: Date;
  processingDate?: Date;
  expenses?: Expense[];
}
