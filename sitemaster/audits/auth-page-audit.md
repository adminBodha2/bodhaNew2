# Auth Pages Audit

Routes:
- `src/routes/auth/+page.svelte`
- `src/routes/auth/test/+page.svelte`

Date: 2026-06-06

## Summary

Two minimal redirect pages. These are placeholder/prototyping pages and deviate significantly from the design system — which is acceptable for their purpose.

## Pages

### `auth/+page.svelte`

```svelte
<svelte:head>
  <title>Members | Bodha</title>
</svelte:head>

<p>Redirecting to members.</p>
```

### `auth/test/+page.svelte`

```svelte
<svelte:head>
  <title>Protected Members Test | Bodha</title>
</svelte:head>

<p>Redirecting to members.</p>
```

## Design System Issues

### 1. No `Head` Component

Both pages use `<svelte:head>` directly instead of the `Head` component from `$lib/comps/headcomponent.svelte`. The `Head` component provides canonical URL, meta description, OG image, and JSON-LD — none of which are present here.

**Severity**: Low — these are redirect pages that users never really see. Not worth fixing unless the auth flow becomes a real feature.

### 2. No `Container` / No Layout

Neither page uses the `Container` (wrapper) component, so the text has no padding or centering. The `<p>` tag renders at the browser default position.

### 3. Incomplete Route Coverage

The `auth` route has no `+layout.svelte` and no server-side logic for authentication. These pages rely on client-side redirects (likely in `+page.ts` load functions not shown here).

## Positive

- ✅ Minimal — they load fast
- ✅ Uses `<svelte:head>` for title (bare minimum SEO)

## Recommendations

1. **No action needed** — these are dev/prototype pages. If they graduate to production, rebuild them with the standard page shell pattern.
