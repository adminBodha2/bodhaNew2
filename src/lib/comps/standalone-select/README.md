# Standalone Select

A fully self-contained port of the Melt UI Select component.

## Files

- `create-select.ts` — Headless builder (closest to original `@melt-ui/svelte` API)
- `Select.svelte` — Modern Svelte 5 snippet-based component (recommended for new code)
- `SelectDemo.svelte` — Faithful recreation of the original usage example

## Requirements

```bash
npm install @floating-ui/dom
```

## Quick Start — Builder API (closest to original)

```svelte
<script lang="ts">
  import { createSelect } from './standalone-select/create-select.js';
  import { fade } from 'svelte/transition';

  const {
    elements: { trigger, menu, option, group, groupLabel, label },
    states: { selectedLabel, open },
    helpers: { isSelected },
  } = createSelect<string>({
    forceVisible: true,
    positioning: { placement: 'bottom', sameWidth: true, fitViewport: true },
  });

  const options = {
    sweet: ['Caramel', 'Chocolate'],
    savory: ['Basil', 'Rosemary'],
  };
</script>

<label use:label.action {...label.attrs()}>Favorite Flavor</label>

<button use:trigger.action {...trigger.attrs()}>
  {selectedLabel.value || 'Select...'}
</button>

{#if open.value}
  <div use:menu.action {...menu.attrs()} transition:fade>
    {#each Object.entries(options) as [key, arr]}
      <div {...group(key)}>
        <div {...groupLabel(key)}>{key}</div>
        {#each arr as item}
          <div use:option.action {...option.attrs({ value: item, label: item })}>
            {#if isSelected(item)}✓{/if}
            {item}
          </div>
        {/each}
      </div>
    {/each}
  </div>
{/if}
```

## Recommended: Simple Component Version

For most projects, just copy `create-select.ts` and use the builder, or create a thin wrapper component around it.

## Notes

- All keyboard navigation, typeahead, click-outside, escape, scroll lock, and floating positioning are included.
- No dependency on `@melt-ui/svelte` or any internal melt packages.
- Uses Svelte 5 runes internally but the builder returns a store-like shape for easy migration.
