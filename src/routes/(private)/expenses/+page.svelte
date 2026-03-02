<script lang="ts">
	import { goto } from "$app/navigation";
	import type { Expense } from "$lib/model/Expense";
	import type { MonthlyExpenses } from "$lib/model/MonthlyExpenses";
	import { saveMonthlyExpenses } from "$lib/services/ExpensesService";
	import { selectedExpense } from "$lib/stores/expenses";
	import { selectedMonthlyExpenses } from "$lib/stores/monthly-expenses";
	import { toaster } from "$lib/stores/toast";
	import { CustomRuntimeError } from "$lib/util/CustomRuntimeError";

  let monthlyExpenses: MonthlyExpenses = $state($selectedMonthlyExpenses || { } as MonthlyExpenses);

  let selected: Expense | undefined = $state();

  function select(e: Expense) {
    if (selected == e)
      selected = undefined;
    else
      selected = e;
  }

  function save() {
    if (!monthlyExpenses.referenceDate) {
      toaster.error({ description: "Reference date is mandatory."});
      return;
    }

    saveMonthlyExpenses(monthlyExpenses).then(() => {
      toaster.info({ description: "Expense succesfully saved!"});
      monthlyExpenses = {} as MonthlyExpenses;
    }).catch(error => {
      if (error instanceof CustomRuntimeError) {
        toaster.error({ description: error.message });
        return;
      }

      toaster.error({ description: "Error saving month expenses." });
    });
  }

  function back() {
    goto("/expenses")
  }
</script>

<div class="text-lg text-center mb-8">Monthly Expenses</div>

<form>
  <div class="flex flex-col gap-4 items-center">
    <label class="label">
      <span class="label-text">Reference Date</span>
      <input class="input" type="text" bind:value={monthlyExpenses.referenceDate} />
    </label>

    {#if monthlyExpenses && monthlyExpenses.expenses && monthlyExpenses.expenses.length > 0}
      <div class="table-wrap">
        <table class="table caption-bottom">
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Payment processed</th>
            </tr>
          </thead>
          <tbody class="[&>tr]:hover:preset-tonal-primary">
            {#each monthlyExpenses.expenses as e}
              <tr class={selected == e ? 'bg-gray-300' : ''} onclick={() => select(e)}>
                <td>{ e.recurringExpense?.name }</td>
                <td>{ e.value }</td>
                <td>{ e.processed ? 'YES' : 'NO' }</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}

    <button type="button" class="btn preset-outlined-surface-300-700 w-full" onclick={save}>Save</button>

    <button type="button" class="btn preset-outlined-surface-300-700 w-full" onclick={back}>Back</button>
  </div>
</form>
