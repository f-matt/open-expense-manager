import type { Expense } from "$lib/model/Expense";
import { CustomRuntimeError } from "$lib/util/CustomRuntimeError";

export async function findAllExpenses() : Promise<Expense[]> {
  return fetch("/api/expenses/").then(r => {
    return r.json();
  })
  .catch(() => {
    throw new CustomRuntimeError("Error fetching existing expenses.");
  });
}
