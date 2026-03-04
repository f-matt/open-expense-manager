<script lang="ts">
	import { goto } from "$app/navigation";
	import type { MonthlyExpenses } from "$lib/model/MonthlyExpenses";
	import { findMonthlyExpenses } from "$lib/services/ExpensesService";
	import { selectedExpense } from "$lib/stores/expenses";
	import { selectedMonthlyExpenses } from "$lib/stores/monthly-expenses";
	import { toaster } from "$lib/stores/toast";
	import { CustomRuntimeError } from "$lib/util/CustomRuntimeError";

  let monthExpenses: MonthlyExpenses[] = $state([]);

  findMonthlyExpenses().then(r => {
    monthExpenses = r;
  })
  .catch(error => {
    if (error instanceof CustomRuntimeError) {
      toaster.error({ title: "Error", description: error.message });
      return;
    }

    toaster.error({ title: "Error", description: "Unknown error while fetching last processed months." });
  });

  let selected: MonthlyExpenses | undefined = $state();

  function select(m: MonthlyExpenses) {
    if (selected == m)
      selected = undefined;
    else
      selected = m;
  }

  function newMonthlyExpenses() {
    selectedMonthlyExpenses.set(null);
    goto("/expenses");
  }

  function editMonthExpenses() {
    if (!selected) {
      toaster.error({ description: "You must select a reference month to edit." });
      return;
    }

    selectedExpense.set(selected);
    goto("/expenses");
  }

</script>

<div class="text-lg text-center mb-8">Monthly Expenses</div>

{#if monthExpenses.length > 0}
  <div class="table-wrap">
    <table class="table caption-bottom">
      <thead>
        <tr>
          <th>Id</th>
          <th>Reference Date</th>
          <th>Processing Date</th>
        </tr>
      </thead>
      <tbody class="[&>tr]:hover:preset-tonal-primary">
        {#each monthExpenses as m}
          <tr class={selected == m ? 'bg-gray-300' : ''} onclick={() => select(m)}>
            <td>{ m.id }</td>
            <td>{ m.referenceDate }</td>
            <td>{ m.processingDate }</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}

<div class="flex flex-col gap-4">
  <button type="button" class="btn preset-outlined-surface-300-700 w-full" onclick={newMonthlyExpenses}>New</button>

  <button type="button" class="btn preset-outlined-surface-300-700 w-full" onclick={editMonthExpenses}>Edit</button>
</div>
