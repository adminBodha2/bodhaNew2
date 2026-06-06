# Members Pages Audit

Routes:
- `src/routes/members/+page.svelte`
- `src/routes/members/signed-in/+page.svelte`

Date: 2026-06-06

## Summary

Members pages handle subscription/sign-in flow. These are functional pages with simple layouts.

---

## `members/+page.svelte`

### Observations

#### 1. Use `<svelte:head>` Instead of `Head` Component

**Location**: Line 3.

```svelte
<svelte:head>
  <title>Bodha Members</title>
</svelte:head>
```

No `Head` component import used. No meta description, canonical URL, OG image, or JSON-LD.

**Severity**: Low — this is a functional/auth page. SEO metadata is less critical here.

#### 2. No `Container` / No Wrapper

The page renders content directly without `Container` or `wrapper-std`. The layout depends entirely on the embedded service (memberstack).

#### 3. Minimal Content

Page is essentially a container for the memberstack embed. No design system violations apply since there's very little to violate.

### Positive

- ✅ Clean, minimal embed wrapper
- ✅ No legacy Svelte patterns

---

## `members/signed-in/+page.svelte`

### Observations

#### 1. No `Head` Component

Same as the members index — uses `<svelte:head>` directly instead of the design system's `Head` component.

#### 2. No `Container`

Content renders without the standard wrapper. Same justification — functional page.

#### 3. Simple Redirect Message

Page shows a redirect message and waits for the memberstack embed to handle the flow.

### Positive

- ✅ Minimal and functional
- ✅ No legacy Svelte patterns

## Recommendations

1. **No action needed** — these are functional pages with minimal template content. Design system compliance is less relevant.
