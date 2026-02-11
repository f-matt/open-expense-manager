import type { Expense } from "$lib/model/Expense";
import { api } from "$lib/util/api";
import { CustomRuntimeError } from "$lib/util/CustomRuntimeError";

export async function findAllExpenses() : Promise<Expense[]> {
  try {
    return api("/api/expenses/");
  } catch (error) {
    if (error instanceof CustomRuntimeError)
      throw error;

    throw new CustomRuntimeError("Error fetching existing expenses.");
  }
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
