import type { Expense } from "$lib/model/Expense";
import type { MonthlyExpenses } from "$lib/model/MonthlyExpenses";
import type { RecurringExpense } from "$lib/model/RecurringExpense";
import { api } from "$lib/util/api";
import { CustomRuntimeError } from "$lib/util/CustomRuntimeError";

export async function findAllExpenses() : Promise<RecurringExpense[]> {
  try {
    return api("/api/expenses/");
  } catch (error) {
    if (error instanceof CustomRuntimeError)
      throw error;

    throw new CustomRuntimeError("Error fetching existing expenses.");
  }
}

export async function saveExpense(expense: RecurringExpense) {
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

export async function findMonthlyExpenses() : Promise<MonthlyExpenses[]> {
  try {
    return api("/api/monthly-expenses/");
  } catch (error) {
    if (error instanceof CustomRuntimeError)
      throw error;

    throw new CustomRuntimeError("Error fetching processed months.");
  }
}

export async function saveMonthlyExpenses(monthlyExpenses: MonthlyExpenses) {
  if (monthlyExpenses.id) {
    return fetch("/api/month-expenses/", {
      method: "PATCH",
      body: JSON.stringify(monthlyExpenses),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(() => {
      throw new CustomRuntimeError("Error updating month expenses.");
    });
  } else {
    return fetch("/api/month-expenses/", {
      method: "POST",
      body: JSON.stringify(monthlyExpenses),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(() => {
      throw new CustomRuntimeError("Error saving month expenses.");
    });
  }
}

