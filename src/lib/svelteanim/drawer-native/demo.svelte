<script lang="ts">
	import * as Drawer from './index.js'

	let count = $state(0)
</script>

<Drawer.Root direction="bottom">
	<Drawer.Trigger>Open drawer</Drawer.Trigger>
	<Drawer.Content>
		<div style="margin: 0 auto; width: 100%; max-width: 24rem;">
			<Drawer.Header>
				<Drawer.Title>Move Goal</Drawer.Title>
				<Drawer.Description>Set your daily activity goal.</Drawer.Description>
			</Drawer.Header>

			<div style="padding: 1rem; text-align: center;">
				<div style="font-size: 4rem; font-weight: 700;">{count}</div>
				<div style="display:flex; gap: 0.5rem; justify-content: center;">
					<button onclick={() => count--}>-</button>
					<button onclick={() => count++}>+</button>
				</div>
			</div>

			<Drawer.Footer>
				<button>Submit</button>
				<Drawer.Close>Cancel</Drawer.Close>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>
