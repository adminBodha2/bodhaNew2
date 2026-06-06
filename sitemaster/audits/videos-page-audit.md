# Videos Page Audit

Page: `src/routes/videos/+page.svelte`
Date: 2026-06-06

## Summary

A clean video listing page using the shared `Swipes` carousel component and `VideoPlayer`. Minimal and well-structured.

## Design System Issues

### 1. Custom `.video-card` Styles

**Location**: Lines 58–72 (page SASS).

```sass
.video-card
  overflow: hidden
  background: var(--color-back)
  transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease
  &:hover
    background: var(--color-stone-1)
    .theme-line
      transform: scaleX(1.5)
```

The video card hover effect extends the `.theme-line-parent` pattern from `_modifiers.sass` (which already scales the theme line on hover). The page-level styles add an additional `background` change. The `.theme-line` scaling is duplicated — `_modifiers.sass` already does `transform: scaleX(2)` on hover.

**Observation**: Minor duplication. The `_modifiers.sass` version scales to `scaleX(2)` while this page scales to `scaleX(1.5)`. Different animation intensity.

### 2. Citation Class

**Location**: Line 47.

```svelte
<p class="citation-big lgrey tt-u">{item.channel}</p>
```

`.citation-big` is referenced but not defined in the design system or page SASS. Similarly `.lgrey` is not a design system class. These may be defined globally elsewhere but are not in the audited SASS files.

**Severity**: Low — likely inherited from a global stylesheet. But these aren't in the design system.

### 3. Inline Card Pattern

The video cards use `Swipes` carousel + `VideoPlayer` + custom footer. This is a specialized card that doesn't match the generic `CardGrid` proposal. ✅ Keep as-is.

### 4. No `any[]` Type

**Location**: Line 12.

```ts
let vids = $derived(data.vids ?? []);
```

Typed as `any[]` via inference. Should use a proper interface.

### Positive

- ✅ Standard page shell: Head → Container → Crumb → content
- ✅ Uses shared `Swipes` carousel component
- ✅ Uses shared `VideoPlayer` component
- ✅ JSON-LD with collection schema
- ✅ No legacy Svelte patterns

## Recommendations

1. **Remove or fix undefined classes** — `.citation-big` and `.lgrey` aren't in the design system
2. **Type `vids` properly** — add an interface for video items
3. **No critical issues**
