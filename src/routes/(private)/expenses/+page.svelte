<script lang="ts">
	import { goto } from "$app/navigation";
	import type { Expense } from "$lib/model/Expense";
	import { findAllExpenses } from "$lib/services/ExpensesService";
	import { selectedExpense } from "$lib/stores/expenses";
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

  function newExpense() {
    selectedExpense.set(null);
    goto("/expense");
  }

  function editExpense() {
    if (!selected) {
      toaster.error({ description: "You must select an expense to edit." });
      return;
    }

    selectedExpense.set(selected);
    goto("/expense");
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

<div class="flex flex-col gap-4">
  <button type="button" class="btn preset-outlined-surface-300-700 w-full" onclick={newExpense}>New</button>

  <button type="button" class="btn preset-outlined-surface-300-700 w-full" onclick={editExpense}>Edit</button>
</div>
