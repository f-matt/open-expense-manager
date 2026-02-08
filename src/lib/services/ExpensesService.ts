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

export async function saveExpense(expense: Expense) {
  if (expense.id) {
    return fetch("/api/expenses/", {
      method: "PATCH",
      body: JSON.stringify(expense),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(() => {
      throw new CustomRuntimeError("Error updating expense data.");
    });
  } else {
    return fetch("/api/expenses/", {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(() => {
      throw new CustomRuntimeError("Error saving expense.");
    });
  }
}
