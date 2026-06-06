# Transition Demo Layout Audit

Page: `src/routes/transition/vertical-wipe/+layout.svelte`
Date: 2026-06-06

## Summary

A self-contained demo layout for the vertical wipe page transition feature. This is a prototype/demo page and is intentionally isolated from the design system.

## Design System Observations

### 1. Complete Design System Bypass

This layout:
- Does not import `Container` or any design system components
- Uses no design system classes
- Uses no design system tokens
- Sets its own background (`#050506`), text color (`#f7f2e8`), and font
- Hides the site's global `<footer>` and mobile button via `:global(footer), :global(button.for-mobile) { display: none }`
- Hides the site's fixed-position elements via `:global(.pos-fixed) { display: none }`

This is **intentional** — the demo has its own visual language (dark background, gold accents, glassmorphism nav bar). The demo is not meant to look like the rest of the site.

### 2. Custom View Transition API

**Location**: Lines 43–60.

```ts
onNavigate((navigation) => {
  armWipeTransition();
});

function armWipeTransition() {
  if (!document.startViewTransition) return;
  document.documentElement.classList.add(transitionClass);
}
```

Uses the experimental View Transition API with custom `clip-path` animations. The CSS keyframes are defined in the layout's `<style>` block:

```sass
@keyframes vertical-wipe-demo
  from
    clip-path: inset(0 0 100% 0)
  to
    clip-path: inset(0 0 0 0)
```

This is advanced browser API usage that doesn't belong in the design system. ✅ Correct to keep isolated.

### 3. Reduced Motion Support

**Location**: Lines 53–55, 123–125.

```ts
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
```

And:

```sass
@media (prefers-reduced-motion: reduce)
  :global(html.vertical-wipe-demo-transition::view-transition-new(page))
    animation: none
```

✅ Proper accessibility consideration.

### 4. Hardcoded Colors

All colors in this layout are hardcoded — no CSS custom properties from the design system are used. This is acceptable for a demo/prototype that deliberately differentiates itself from the main site.

## Positive

- ✅ Self-contained demo with its own visual identity
- ✅ Proper SSR guards (`if (!browser) return`)
- ✅ Reduced motion support
- ✅ Clean View Transition API implementation
- ✅ All styles are scoped to `.wipe-demo-shell` to avoid leaking to the rest of the site
- ✅ `:global` overrides to hide site chrome are specific and minimal

## Recommendations

1. **No action needed** — this is a prototype/demo page, not a production content page
2. **If the wipe transition is ever productionized**, it should be extracted into a reusable Svelte component and integrated with the design system's animation wrapper pattern (Slide, Reveal, etc.)
