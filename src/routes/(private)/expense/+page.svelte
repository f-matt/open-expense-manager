<script lang="ts">
	import { goto } from "$app/navigation";
	import type { Expense } from "$lib/model/Expense";
	import { saveExpense } from "$lib/services/ExpensesService";
	import { selectedExpense } from "$lib/stores/expenses";
	import { toaster } from "$lib/stores/toast";
	import { CustomRuntimeError } from "$lib/util/CustomRuntimeError";

  let expense = $selectedExpense || { active: true } as Expense;

  function save() {
    if (!expense.name) {
      toaster.error({ description: "Name is mandatory."});
      return;
    }

    saveExpense(expense).then(() => {
      toaster.info({ description: "Expense succesfully saved!"});
      expense = {} as Expense;
    }).catch(error => {
      if (error instanceof CustomRuntimeError) {
        toaster.error({ description: error.message });
        return;
      }

      toaster.error({ description: "Error saving expense." });
    });
  }

  function back() {
    goto("/expenses")
  }
</script>

<div class="text-lg text-center mb-8">Expense Details</div>

<form>
  <div class="flex flex-col gap-4 items-center">
    <label class="label">
      <span class="label-text">Name</span>
      <input class="input" type="text" bind:value={expense.name} />
    </label>

    <label class="label">
      <span class="label-text">Value</span>
      <input class="input" type="text" bind:value={expense.value} />
    </label>

    <label class="label">
      <input class="checkbox mr-2" type="checkbox" bind:checked={expense.active} /> Active
    </label>

    <button type="button" class="btn preset-outlined-surface-300-700 w-full" onclick={save}>Save</button>

    <button type="button" class="btn preset-outlined-surface-300-700 w-full" onclick={back}>Back</button>
  </div>
</form>
