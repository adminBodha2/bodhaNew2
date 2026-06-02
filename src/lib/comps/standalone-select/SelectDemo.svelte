<script lang="ts">
	import { createSelect } from './create-select.js';
	import { fade } from 'svelte/transition';

	const Check = '✓';
	const Chevron = '⌄';

	const groups = {
		sweet: ['Caramel', 'Chocolate', 'Strawberry', 'Cookies & Cream'],
		savory: ['Basil', 'Bacon', 'Rosemary'],
	};

	const {
		elements: { trigger, menu, option, group, groupLabel, label },
		states: { selectedLabel, open },
		helpers: { isSelected },
	} = createSelect<string>({
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			sameWidth: true,
			fitViewport: true,
		},
	});
</script>

<div class="flex flex-col gap-1">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="block text-amber-900" use:label.action {...label.attrs()}>Favorite Flavor</label>

	<button
		class="flex h-10 min-w-[220px] items-center justify-between rounded-lg bg-white px-3 py-2 text-amber-700 shadow transition-opacity hover:opacity-90"
		use:trigger.action
		{...trigger.attrs()}
		aria-label="Food"
	>
		{selectedLabel.value || 'Select a flavor'}
		<span>{Chevron}</span>
	</button>

	{#if open.value}
		<div
			class="z-10 flex max-h-[300px] flex-col overflow-y-auto rounded-lg bg-white p-1 shadow focus:!ring-0"
			use:menu.action
			{...menu.attrs()}
			transition:fade={{ duration: 150 }}
		>
			{#each Object.entries(groups) as [key, arr]}
				<div {...group(key)}>
					<div class="py-1 pl-4 pr-4 font-semibold capitalize text-neutral-800" {...groupLabel(key)}>
						{key}
					</div>
					{#each arr as item}
						{@const { 'aria-disabled': ariaDisabled, 'aria-selected': ariaSelected, ...attrs } = option.attrs({ value: item, label: item })}
						<div
							class="relative cursor-pointer rounded-lg py-1 pl-8 pr-4 text-neutral-800 hover:bg-amber-100 focus:z-10 focus:text-amber-700 data-[highlighted]:bg-amber-200 data-[highlighted]:text-amber-900 data-[disabled]:opacity-50"
							use:option.action
							{...attrs}
							aria-disabled={ariaDisabled === 'true'}
						>
							<div class="check {isSelected(item) ? 'block' : 'hidden'}">
								<span class="text-amber-500">{Check}</span>
							</div>
							{item}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.check {
		position: absolute;
		left: 0.5rem;
		top: 50%;
		z-index: 20;
		transform: translateY(calc(-50% + 1px));
	}
</style>
