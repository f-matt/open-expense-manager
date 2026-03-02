import type { MonthlyExpenses } from "$lib/model/MonthlyExpenses";
import type { RecurringExpense } from "$lib/model/RecurringExpense";
import { writable } from "svelte/store";

export const selectedMonthlyExpenses = writable<MonthlyExpenses | null>(null);
