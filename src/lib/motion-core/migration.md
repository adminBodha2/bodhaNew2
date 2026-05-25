# SSR Fix: Dynamic GSAP Imports

## Problem

SvelteKit renders pages on the server before sending them to the browser. GSAP plugins like `ScrollTrigger`, `SplitText`, and `CustomEase` reference browser globals (`window`, `document`) at **module evaluation time** — meaning the moment the file is imported, not when any function is called. This crashes the server render and returns a **500 error** on hard page loads. Client-side navigation worked fine because the browser already had the JS bundle loaded.

---

## The Fix

Move all GSAP imports from static top-level imports to **dynamic imports inside the `$effect`** (or `onMount`). These only ever run in the browser, so browser globals are always available.

---

## What Was Removed

### Static imports at the top of the file

```ts
// REMOVED from all affected components
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { registerPluginOnce } from "../helpers/gsap";
import { onMount } from "svelte"; // only needed for registerPluginOnce
```

### Plugin registration in `onMount`

```ts
// REMOVED
onMount(() => {
    registerPluginOnce(ScrollTrigger, SplitText);
});
```

---

## What Was Added

### Dynamic imports inside `init()` within `$effect`

```ts
const init = async () => {
    const { gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger"); // if needed
    const { SplitText } = await import("gsap/SplitText");         // if needed
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // ... rest of animation setup
};
```

`gsap.registerPlugin()` is idempotent — calling it multiple times for the same plugin is safe. The `registerPluginOnce` helper is no longer needed.

---

## What Was Changed

### GSAP-typed instance variables → `any`

Because GSAP types come from the static import, removing those imports loses the type information. The typed variables are replaced with `any`:

```ts
// BEFORE
let splitInstance: SplitText | null = null;
let lineTweens: gsap.core.Tween[] = [];
let ctx: gsap.Context | null = null;
let hoverTimeline: gsap.core.Timeline | null = null;

// AFTER
let splitInstance: any = null;
let lineTweens: any[] = [];
let ctx: any = null;
let hoverTimeline: any = null;
```

### `onSplit` / forEach callback parameter types → explicit `any`

Internal callback parameters that previously inferred their types from GSAP's type definitions need explicit annotations:

```ts
// BEFORE
onSplit: (self) => { ... }
self.lines.forEach((line) => { ... })

// AFTER
onSplit: (self: any) => { ... }
(self.lines ?? []).forEach((line: HTMLElement) => { ... })
```

### `createScrambleTimeline` moved inside `init()` (TextScramble only)

The function used `gsap` directly, so it was moved inside `init()` after the dynamic import resolves. Prop values are captured before the async gap:

```ts
$effect(() => {
    // Capture props synchronously before await
    const capturedDuration = scrambleDuration;
    const capturedStagger = stagger;
    // ...

    const init = async () => {
        const { gsap } = await import("gsap");

        // Now safe to define, gsap is in scope
        const createScrambleTimeline = (nodes: HTMLElement[]) => {
            // uses capturedDuration, capturedStagger, gsap
        };
    };
});
```

---

## Affected Components

| File | Plugins removed from static imports |
|------|--------------------------------------|
| `stacking-words/StackingWords.svelte` | `gsap`, `ScrollTrigger`, `SplitText`, `registerPluginOnce` |
| `stacking-words/RevealingLines.svelte` | `gsap`, `ScrollTrigger`, `SplitText`, `onMount`, `registerPluginOnce` |
| `text-scramble/TextScramble.svelte` | `gsap`, `SplitText`, `onMount`, `registerPluginOnce` |

---

## Applying This to Future Components

Any motion-core component that imports GSAP or its plugins must follow this pattern:

1. Do **not** import `gsap`, `ScrollTrigger`, `SplitText`, or any other browser-dependent GSAP module at the top of the file.
2. Use `import type` only if you need TypeScript types from GSAP (though this is limited — prefer `any` for instance variables).
3. Inside `$effect`, create an `async init()` function and use `await import("gsap")` etc. at the start.
4. Keep a `typeof window === "undefined"` guard at the top of `$effect` as a safety net.
5. Use `any` for variables that hold GSAP instances (`gsap.Context`, `SplitText`, `gsap.core.Tween`, etc.).
