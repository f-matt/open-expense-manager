<script lang="ts">
	import type { Expense } from "$lib/model/Expense";
	import { createExpense, findAllExpenses } from "$lib/services/ExpensesService";
	import { toaster } from "$lib/stores/toast";
	import { CustomRuntimeError } from "$lib/util/CustomRuntimeError";

  let e = {} as Expense;
  e.active = true;

  let expense = $state(e);

  function save() {
    if (!expense.name) {
      toaster.error({ description: "Name is mandatory."});
      return;
    }

    createExpense(expense).then(() => {
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
</script>

<div class="text-lg text-center mb-8">Expense Details</div>

<form class="w-full max-w-md space-y-4 p-4">
  <fieldset class="space-y-4">
    <label class="label">
      <span class="label-text">Name</span>
      <input class="input" type="text" bind:value={expense.name} />
    </label>

    <label class="label">
      <span class="label-text">Value</span>
      <input class="input" type="text" bind:value={expense.value} />
    </label>

    <label class="flex">
      <input class="checkbox mr-2" type="checkbox" bind:checked={expense.active} /> Active
    </label>
  </fieldset>

  <fieldset class="flex justify-end">
    <button type="button" class="btn preset-outlined-surface-300-700 w-100" onclick={save}>Save</button>
  </fieldset>
</form>
