<script lang="ts">
	import { DatePicker, Portal } from '@skeletonlabs/skeleton-svelte';

  let {
    label = "",
    value = $bindable()
  } = $props();

	function handleMonthClick(monthValue: any, api: any) {
		console.log("handleMonthClick");
		console.log(monthValue);
		console.log(api);

		const currentYear = api.focusedValue.year; 
		console.log("year: " + currentYear);

		//value = monthValue;
	}

</script>

<DatePicker { value } view="month">
	<DatePicker.Label>{ label }</DatePicker.Label>
	<DatePicker.Control>
		<DatePicker.Input placeholder="mm/yyyy" />
		<DatePicker.Trigger />
	</DatePicker.Control>
	<Portal>
		<DatePicker.Positioner>
			<DatePicker.Content>
				<DatePicker.View view="month">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableBody>
									{#each datePicker().getMonthsGrid({ columns: 4, format: 'short' }) as months, id (id)}
										<DatePicker.TableRow>
											{#each months as month, id (id)}
												<DatePicker.TableCell value={month.value}>
													<DatePicker.TableCellTrigger onclick={() => handleMonthClick(month.value, datePicker())}>
														{month.label}
													</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
			</DatePicker.Content>
		</DatePicker.Positioner>
	</Portal>
</DatePicker>
