import type { Expense } from "$lib/model/Expense";
import { writable } from "svelte/store";

export const selectedExpense = writable<Expense | null>(null);
