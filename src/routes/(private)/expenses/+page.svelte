<script lang="ts">
	import type { Expense } from "$lib/model/Expense";
	import { findAllExpenses } from "$lib/services/ExpensesService";
	import { toaster } from "$lib/stores/toast";
	import { CustomRuntimeError } from "$lib/util/CustomRuntimeError";

  let expenses: Expense[] = $state([]);

  findAllExpenses().then(r => {
    expenses = r;
  })
  .catch(error => {
    if (error instanceof CustomRuntimeError) {
      toaster.error({ title: "Error", description: error.message });
      return;
    }

    toaster.error({ title: "Error", description: "Unknown error while fetching expenses." });
  });

  let selected: Expense | undefined = $state();

  function select(e: Expense) {
    if (selected == e)
      selected = undefined;
    else
      selected = e;
  }
</script>

<div class="text-lg text-center mb-8">Recurring Expenses</div>

{#if expenses.length > 0}
  <div class="table-wrap">
    <table class="table caption-bottom">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Value</th>
          <th>Active</th>
        </tr>
      </thead>
      <tbody class="[&>tr]:hover:preset-tonal-primary">
        {#each expenses as expense}
          <tr class={selected == expense ? 'bg-gray-300' : ''} onclick={() => select(expense)}>
            <td>{expense.id}</td>
            <td>{expense.name}</td>
            <td>{expense.value}</td>
            <td>{expense.active ? "YES" : "NO" }</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}