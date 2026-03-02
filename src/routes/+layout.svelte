<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { goto } from '$app/navigation';
	import { AppBar, Menu, Portal, Toast } from '@skeletonlabs/skeleton-svelte';
	import { LogOutIcon, MenuIcon, ChevronRightIcon } from '@lucide/svelte';
	import { toaster } from '$lib/stores/toast';

	let { children } = $props();

	function logout() {
		localStorage.removeItem("oemToken");
		goto("/login");
	}

	function handleMenu(x:any) {
		switch (x.value) {
			case "recurring":
				goto("/recurring-expenses");
				break;
			case "expenses":
				goto("/monthly-expenses");
				break;
			default:
				goto("/home");
		}
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="grid h-screet grid-rows-[auto_1fr_auto]">
	<AppBar>
		<AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
			<AppBar.Lead>
				<Menu onSelect={handleMenu}>
					<Menu.Trigger>
						<button type="button" class="btn-icon btn-icon-lg hover:preset-tonal">
							<MenuIcon />
						</button>
					</Menu.Trigger>
					<Portal>
						<Menu.Positioner>
							<Menu.Content>
								<Menu onSelect={handleMenu}>
									<Menu.TriggerItem value="configuration">
										<Menu.ItemText>Configuration</Menu.ItemText>
										<Menu.ItemIndicator>
											<ChevronRightIcon class="size-4" />
										</Menu.ItemIndicator>
									</Menu.TriggerItem>
									<Portal>
										<Menu.Positioner>
											<Menu.Content>
												<Menu.Item value="recurring">
													<Menu.ItemText>Recurring Expenses</Menu.ItemText>
												</Menu.Item>
											</Menu.Content>
										</Menu.Positioner>
									</Portal>
								</Menu>
								<Menu.Item value="expenses">
									<Menu.ItemText>Expenses</Menu.ItemText>
								</Menu.Item>
							</Menu.Content>
						</Menu.Positioner>
					</Portal>
				</Menu>
			</AppBar.Lead>
			<AppBar.Headline>
				<p class="text-2xl">Open Expense Manager</p>
			</AppBar.Headline>
			<AppBar.Trail>
				<button type="button" class="btn-icon hover:preset-tonal">
					<LogOutIcon class="size-6" onclick={logout} />
				</button>
			</AppBar.Trail>
		</AppBar.Toolbar>
	</AppBar>

	<div class="grid grid-cols-1 md:grid-cols-[auto_1fr]" style="min-height:84vh">
		<main class="space-y-4 p-4">
			<div style="display: contents">{@render children()}</div>
		</main>
	</div>

	<Toast.Group {toaster}>
		{#snippet children(toast)}
			<Toast {toast}>
				<Toast.Message>
					<Toast.Title>{toast.title}</Toast.Title>
					<Toast.Description>{toast.description}</Toast.Description>
				</Toast.Message>
				<Toast.CloseTrigger />
			</Toast>
		{/snippet}
	</Toast.Group>

	<footer class="bg-gray-200 p-4">2026 | github.com/f-matt</footer>
</div>
