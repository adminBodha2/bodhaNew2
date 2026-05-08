<script lang="ts">
	import * as NavigationMenu from './index.js'
</script>

<NavigationMenu.Root>
	<NavigationMenu.List>
		<NavigationMenu.Item>
			<NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<NavigationMenu.Link href="/products/web">Web</NavigationMenu.Link>
				<NavigationMenu.Link href="/products/mobile">Mobile</NavigationMenu.Link>
				<NavigationMenu.Link href="/products/desktop" active>Desktop</NavigationMenu.Link>
			</NavigationMenu.Content>
		</NavigationMenu.Item>

		<NavigationMenu.Item>
			<NavigationMenu.Trigger>Company</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<NavigationMenu.Link href="/about">About</NavigationMenu.Link>
				<NavigationMenu.Link href="/careers">Careers</NavigationMenu.Link>
			</NavigationMenu.Content>
		</NavigationMenu.Item>

		<NavigationMenu.Item>
			<NavigationMenu.Link href="/docs">Docs</NavigationMenu.Link>
		</NavigationMenu.Item>
	</NavigationMenu.List>
</NavigationMenu.Root>
