import type { RecurringExpense } from "$lib/model/RecurringExpense";
import { writable } from "svelte/store";

export const selectedExpense = writable<RecurringExpense | null>(null);
