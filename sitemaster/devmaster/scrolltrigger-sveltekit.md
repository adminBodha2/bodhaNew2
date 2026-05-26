# GSAP ScrollTrigger in SvelteKit — Project Guide

This guide covers how ScrollTrigger is used in **this specific codebase**. It mirrors the structure of the general ScrollTrigger reference but replaces every pattern with the conventions actually used here: Svelte 5 runes, SSR safety, `gsap.context` cleanup, and the project's motion preference system.

---

## What You'll Learn

1. [How ScrollTrigger fits into this SvelteKit project](#1-how-scrolltrigger-fits-here)
2. [The mandatory boilerplate pattern](#2-the-mandatory-boilerplate-pattern)
3. [The motion preference system](#3-the-motion-preference-system)
4. [Using the built-in animation components](#4-built-in-animation-components)
5. [Start & End positions](#5-start--end-positions)
6. [Scrubbing](#6-scrubbing)
7. [Pinning](#7-pinning)
8. [Toggle actions & replay](#8-toggle-actions--replay)
9. [Callbacks & events](#9-callbacks--events)
10. [Markers & debugging](#10-markers--debugging)
11. [Advanced patterns](#11-advanced-patterns)
12. [ScrollTrigger + GSAP timelines](#12-scrolltrigger--gsap-timelines)
13. [Writing a custom animation component](#13-writing-a-custom-animation-component)

---

## 1. How ScrollTrigger Fits Here

This project uses GSAP + ScrollTrigger for all scroll-driven animations. Three things make SvelteKit usage different from a plain JS setup:

- **SSR**: Svelte components render on the server. GSAP and the DOM do not exist on the server, so every GSAP call must be guarded.
- **Svelte 5 Runes**: All reactive state and effects use `$state`, `$effect`, and `$props`. There are no lifecycle hooks like `onMount` — `$effect` is the equivalent.
- **`gsap.context()`**: GSAP contexts scope all tweens and ScrollTriggers to a root node. When the context is reverted (on component destroy or re-run), every tween and trigger inside it is killed automatically. Always use it.

The project also uses **dynamic imports** for GSAP so that GSAP code is never included in the SSR bundle:

```svelte
// ALWAYS import GSAP dynamically inside $effect or async functions
const { gsap } = await import('gsap');
const { ScrollTrigger } = await import('gsap/ScrollTrigger');
gsap.registerPlugin(ScrollTrigger);
```

---

## 2. The Mandatory Boilerplate Pattern

Every custom ScrollTrigger animation in this codebase follows the same skeleton. Do not deviate from it.

```svelte
<script lang="ts">
  import { browser } from '$app/environment';
  import {
    areMotionAnimationsDisabled,
    revealMotionElement,
    waitForMotionLayout
  } from '$lib/svelteanim/motionPreference.svelte';

  let wrapperRef = $state<HTMLElement | null>(null);
  let tween: any = null;
  let ctx: any = null;

  // {@attach} action — the SvelteKit way to get a ref without bind:this
  const attachRef = (node: HTMLElement) => {
    wrapperRef = node;
    return () => { if (wrapperRef === node) wrapperRef = null; };
  };

  $effect(() => {
    // 1. Guard: never run on the server
    if (!browser) return;
    const node = wrapperRef;
    if (!node) return;

    // 2. Kill any previous animation before re-running
    tween?.kill();
    tween = null;
    ctx?.revert();
    ctx = null;

    // 3. Respect the motion preference toggle & prefers-reduced-motion
    if (areMotionAnimationsDisabled()) {
      revealMotionElement(node);
      return;
    }

    // 4. Capture reactive props into local consts — $effect re-runs when
    //    props change, so these snapshots are always fresh at init time.
    const triggerStart = start;
    const triggerEnd = end;

    let cancelled = false;

    const init = async () => {
      try {
        // 5. Dynamic import — keeps GSAP out of the SSR bundle
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        // 6. Wait for fonts + 2 rAF frames so layout is settled
        await waitForMotionLayout();
        if (cancelled) return;

        // 7. All tweens inside gsap.context are auto-killed on ctx.revert()
        ctx = gsap.context(() => {
          gsap.set(node, { autoAlpha: 0 });

          tween = gsap.to(node, {
            autoAlpha: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: node,
              start: triggerStart,
              end: triggerEnd,
              scrub: false,
              once: true,
              invalidateOnRefresh: true
            }
          });
        }, node);
      } catch {
        // 8. Fallback: if GSAP fails to load, show the element unstyled
        if (cancelled) return;
        ctx?.revert(); ctx = null;
        tween?.kill(); tween = null;
        revealMotionElement(node);
      }
    };

    void init();

    // 9. Cleanup runs when the component is destroyed or $effect re-runs
    return () => {
      cancelled = true;
      ctx?.revert(); ctx = null;
      tween?.kill(); tween = null;
    };
  });
</script>

<div {@attach attachRef}>
  <!-- content -->
</div>
```

**Why `cancelled`?** The `init` function is async. If the component is destroyed while `await waitForMotionLayout()` is still pending, `cancelled = true` from the cleanup prevents the rest of `init` from touching a dead DOM node.

**Why `waitForMotionLayout()`?** It awaits `document.fonts.ready` and 2 `requestAnimationFrame` ticks. This ensures text has rendered and layout is complete before GSAP measures any element — skipping this causes wrong trigger positions on font-heavy pages.

---

## 3. The Motion Preference System

The project has a global animation toggle (`animState` store) and also reads `prefers-reduced-motion`. Both are exposed through `motionPreference.svelte.ts`:

```ts
import {
  areMotionAnimationsDisabled, // true if user turned off anims OR prefers-reduced-motion
  areScrollAnimationsDisabled,  // true only if the global toggle is off
  prefersReducedMotion,         // true only if OS-level prefers-reduced-motion
  revealMotionElement,          // makes a hidden element visible (clears autoAlpha)
  waitForMotionLayout           // awaits fonts + rAF frames
} from '$lib/svelteanim/motionPreference.svelte';
```

**Rule**: always check `areMotionAnimationsDisabled()` before initialising any GSAP animation, and call `revealMotionElement()` on any element that was hidden via `autoAlpha: 0` or `visibility: hidden` so it shows up for users with motion off.

```svelte
if (areMotionAnimationsDisabled()) {
  // Don't animate — but make sure the content is still visible
  revealMotionElement(node);
  return;
}
```

---

## 4. Built-in Animation Components

Before writing custom GSAP — reach for these components. They handle all the boilerplate above and accept props for customisation. Import from `$lib/svelteanim`.

### `<Slide2>` — slide in from a direction

```svelte
<script>
  import { Slide2 } from '$lib/svelteanim';
</script>

<!-- Each direct child slides in from below, staggered -->
<Slide2 direction="down" distance={80} stagger={120} replay>
  <div>Item one</div>
  <div>Item two</div>
  <div>Item three</div>
</Slide2>
```

Key props: `direction` (`up | down | left | right`), `distance`, `duration`, `delay`, `stagger`, `ease`, `start`, `end`, `scrub`, `replay`, `targetSelector`, `scrollElement`, `display`.

### `<Blur>` — blur + scale in on scroll

```svelte
<Blur radius={12} initialScale={1.06} stagger={150} scrub={3} replay>
  <img src="..." alt="..." />
  <img src="..." alt="..." />
</Blur>
```

Key props: `radius`, `initialScale`, `opacity`, `duration`, `delay`, `stagger`, `ease`, `start`, `end`, `scrub`, `replay`, `targetSelector`, `scrollElement`, `display`.

### `<Scale>` — scale in from a starting size

```svelte
<Scale initialScale={0} origin="center bottom" scrub={1} replay>
  <div class="card">...</div>
  <div class="card">...</div>
</Scale>
```

Key props: `initialScale`, `origin`, `rotate`, `opacity`, `duration`, `delay`, `stagger`, `ease`, `start`, `end`, `scrub`, `replay`, `targetSelector`, `scrollElement`, `display`.

### `<StackingLetters>` (motion-core) — letter-by-letter scroll reveal

```svelte
<script>
  import StackingLetters from '$lib/motion-core/stacking-words/StackingLetters.svelte';
</script>

<!-- Letters slide in from the right by default -->
<StackingLetters start="top 90%" end="top 40%" scrub={2}>
  A heading that reveals letter by letter
</StackingLetters>

<!-- Slide in from the left instead -->
<StackingLetters direction="left" scrub={2}>
  Another heading
</StackingLetters>
```

Key props: `direction` (`left | right`), `start`, `end`, `scrub`, `stagger`, `ease`, `scrollElement`.

---

## 5. Start & End Positions

Same syntax as plain GSAP: `'triggerPosition viewportPosition'`. Use these in the `start` / `end` props on any component, or in custom `scrollTrigger` configs.

```svelte
<!-- Trigger when top of element hits 90% down the viewport (element just appearing) -->
<Slide2 start="top 90%">...</Slide2>

<!-- Trigger when top of element hits the center -->
<Slide2 start="top center">...</Slide2>

<!-- Scrub across a range: start when top hits 80%, end when top hits 30% -->
<Blur start="top 80%" end="top 30%" scrub={2}>...</Blur>
```

In custom code:

```ts
scrollTrigger: {
  trigger: node,
  start: 'top 85%',   // top of element at 85% of viewport height
  end: 'top 20%',     // top of element at 20% of viewport height
}
```

| Position | Meaning |
|---|---|
| `top 90%` | Element barely enters viewport |
| `top center` | Element reaches midpoint of viewport |
| `top top` | Element reaches the very top of viewport |
| `center center` | Element center aligns with viewport center |
| `bottom top` | Element has fully scrolled past |

---

## 6. Scrubbing

Scrubbing ties animation progress 1:1 to scroll position. Pass `scrub` as a number (seconds of lag) or `true` (no lag) to any component.

```svelte
<!-- No lag: animation follows scroll exactly -->
<Scale scrub={true}>...</Scale>

<!-- 2-second lag: animation lags behind scroll, feels organic -->
<Blur scrub={2}>...</Blur>

<!-- No scrubbing: animation plays as a one-shot on enter -->
<Slide2 :scrub={false}>...</Slide2>
```

**Important with scrub**: use `ease: "none"` or a symmetric ease (`power1.inOut`) so the animation reverses visibly. Asymmetric eases like `expo.out` make the reverse feel like nothing is happening because the animation is 97% done at 50% scroll progress.

In custom code:

```ts
// Scrubbed timeline — progress moves with scroll, reverses on scroll back
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: node,
    start: 'top 80%',
    end: 'top 20%',
    scrub: 2,
    invalidateOnRefresh: true
  }
});

tl.to(targets, { x: 0, opacity: 1, stagger: 0.05, ease: 'none' });
```

**For scrubbed stagger animations**: always put the `scrollTrigger` on the **timeline**, not on individual `gsap.to` calls. ScrollTrigger on a timeline controls the whole timeline's progress bidirectionally.

```ts
// CORRECT — ScrollTrigger on the timeline
const tl = gsap.timeline({ scrollTrigger: { ..., scrub: 2 } });
tl.to(chars, { x: 0, stagger: 0.05 });

// WRONG — scrub on gsap.to with stagger can break reverse
gsap.to(chars, { x: 0, stagger: 0.05, scrollTrigger: { ..., scrub: 2 } });
```

---

## 7. Pinning

No dedicated component yet — use custom code following the boilerplate pattern.

```ts
ctx = gsap.context(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: node,
      pin: true,             // pin the trigger element
      start: 'top top',
      end: '+=1500',         // stay pinned for 1500px of scroll
      scrub: 1,
      invalidateOnRefresh: true
    }
  });

  tl.from('.panel-title', { opacity: 0, y: 60 })
    .to('.panel-title', { opacity: 0, y: -60 }, '+=0.3')
    .from('.panel-body', { opacity: 0 }, '<');
}, node);
```

**`pinSpacing`**: ScrollTrigger adds spacing after the pin by default to prevent layout jumps. Set `pinSpacing: false` only if you control the spacing yourself.

---

## 8. Toggle Actions & Replay

When **not** scrubbing, `toggleActions` controls what happens at each scroll event:

```
'onEnter  onLeave  onEnterBack  onLeaveBack'
```

In this project's components the `replay` prop maps to:

```ts
const toggleActions = replay
  ? 'play reverse play reverse'   // reverses when scrolling back up
  : 'play none none none';        // plays once and stays
```

`once: !replay && !triggerScrub` is also set, which kills the ScrollTrigger after first play when neither replay nor scrub is active — saving memory for elements that only need to animate in once.

In custom code:

```ts
scrollTrigger: {
  trigger: node,
  start: 'top 85%',
  toggleActions: 'play reverse play reverse', // replay on scroll-back
  once: false
}
```

Common patterns:

| `toggleActions` | Behaviour |
|---|---|
| `'play none none none'` | Fire once, stay in final state |
| `'play reverse play reverse'` | Reverses when scrolling back out |
| `'restart none none none'` | Restarts from beginning on every enter |
| `'play pause resume pause'` | Pauses on leave, resumes on re-enter |

---

## 9. Callbacks & Events

```ts
scrollTrigger: {
  trigger: node,
  start: 'top 80%',
  onEnter: () => console.log('entered'),
  onLeave: () => console.log('left'),
  onEnterBack: () => console.log('entered from below'),
  onLeaveBack: () => console.log('left going up'),
  onUpdate: (self) => {
    // fires every frame while active — use sparingly
    console.log('progress:', self.progress, 'direction:', self.direction);
  },
  onRefresh: (self) => {
    // fires when ScrollTrigger recalculates (resize, etc.)
    console.log('new start:', self.start);
  }
}
```

**SvelteKit note**: callbacks fire in the browser only (you're inside `$effect` and behind `if (!browser) return`), so you can safely reference DOM APIs in them.

Practical — highlight the active nav item based on which section is in view:

```ts
ctx = gsap.context(() => {
  sections.forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveNav(i),
      onEnterBack: () => setActiveNav(i)
    });
  });
}, containerRef);
```

---

## 10. Markers & Debugging

Enable `markers: true` while building — remove before committing.

```ts
scrollTrigger: {
  trigger: node,
  start: 'top 80%',
  end: 'top 20%',
  markers: true   // ← never commit this
}
```

Inspect all active triggers in the browser console:

```js
// Paste in browser DevTools
ScrollTrigger.getAll().forEach(t => console.log({
  trigger: t.trigger,
  start: t.start,
  end: t.end,
  progress: t.progress,
  isActive: t.isActive
}));
```

Force a recalculate (useful after dynamic content loads):

```ts
ScrollTrigger.refresh();
```

**Common debug issues in SvelteKit**:

- **Trigger fires at wrong position**: usually means GSAP measured the element before fonts loaded. Fix: `await waitForMotionLayout()` is already in the boilerplate — don't skip it.
- **Animation doesn't play at all**: check `areMotionAnimationsDisabled()` — the global toggle may be off.
- **SSR error (`document is not defined`)**: you're calling GSAP outside `$effect` or without the `if (!browser) return` guard.
- **Memory leak / duplicate triggers**: the cleanup function in `$effect` is not killing the context. Make sure `ctx?.revert()` runs in the returned cleanup function.

---

## 11. Advanced Patterns

### Batch — many similar elements

Better than individual triggers for lists or grids:

```ts
ctx = gsap.context(() => {
  ScrollTrigger.batch(node.querySelectorAll('.card'), {
    onEnter: (elements) => {
      gsap.to(elements, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      });
    },
    onLeaveBack: (elements) => {
      gsap.to(elements, { autoAlpha: 0, y: 40 });
    },
    start: 'top 90%',
    interval: 0.1
  });
}, node);
```

### Responsive — matchMedia

```ts
ctx = gsap.context(() => {
  const mm = gsap.matchMedia();

  mm.add('(min-width: 1024px)', () => {
    gsap.to('.hero-text', {
      scrollTrigger: { trigger: node, pin: true, end: '+=800', scrub: 1 },
      y: -200
    });
  });

  mm.add('(max-width: 1023px)', () => {
    gsap.to('.hero-text', {
      scrollTrigger: { trigger: node, start: 'top 80%' },
      y: -40,
      duration: 0.6
    });
  });
}, node);
```

### Parallax

```ts
ctx = gsap.context(() => {
  node.querySelectorAll<HTMLElement>('[data-parallax]').forEach((layer) => {
    const speed = Number(layer.dataset.parallax ?? 0.3);
    gsap.to(layer, {
      y: () => layer.offsetHeight * speed * -1,
      ease: 'none',
      scrollTrigger: {
        trigger: node,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  });
}, node);
```

### Horizontal scroll

```ts
ctx = gsap.context(() => {
  const panels = Array.from(node.querySelectorAll<HTMLElement>('.panel'));

  gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: node,
      pin: true,
      start: 'top top',
      end: () => '+=' + node.offsetWidth,
      scrub: 1,
      snap: 1 / (panels.length - 1),
      invalidateOnRefresh: true
    }
  });
}, node);
```

---

## 12. ScrollTrigger + GSAP Timelines

For complex choreographed animations, put the `scrollTrigger` on the timeline — not on individual tweens.

```ts
ctx = gsap.context(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: node,
      pin: true,
      start: 'top top',
      end: '+=2000',
      scrub: 1.5,
      invalidateOnRefresh: true
    }
  });

  tl.from('.headline',    { opacity: 0, y: 80 }, 0)
    .from('.subheadline', { opacity: 0, y: 40 }, 0.1)
    .to('.headline',      { opacity: 0, y: -80 }, 0.5)
    .from('.body-copy',   { opacity: 0 }, 0.5)
    .to('.bg-image',      { scale: 1.2 }, 0);
}, node);
```

Use position offsets to layer animations:

| Position | Meaning |
|---|---|
| `0` | Start of the timeline |
| `'<'` | Same start time as the previous tween |
| `'-=0.2'` | 0.2s before the previous tween ends |
| `'+=0.3'` | 0.3s after the previous tween ends |
| `0.5` | At absolute time 0.5s in the timeline |

---

## 13. Writing a Custom Animation Component

Follow this template when the built-in components don't cover your case. It is the exact same structure as `Slide2.svelte`, `Blur.svelte`, and `Scale.svelte`.

```svelte
<script lang="ts">
  import { browser } from '$app/environment';
  import type { Snippet } from 'svelte';
  import {
    areMotionAnimationsDisabled,
    revealMotionElement,
    waitForMotionLayout
  } from '$lib/svelteanim/motionPreference.svelte';

  interface Props {
    /** Your custom props */
    duration?: number;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    replay?: boolean;
    targetSelector?: string;
    scrollElement?: string | HTMLElement | null;
    display?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    duration = 600,
    start = 'top 90%',
    end = 'bottom 40%',
    scrub = false,
    replay = false,
    targetSelector,
    scrollElement,
    display = 'block',
    children,
    ...rest
  }: Props = $props();

  let wrapperRef = $state<HTMLElement | null>(null);
  let tween: any = null;
  let ctx: any = null;

  const attachWrapperRef = (node: HTMLElement) => {
    wrapperRef = node;
    return () => { if (wrapperRef === node) wrapperRef = null; };
  };

  function getTargets(node: HTMLElement): HTMLElement[] {
    const selected = targetSelector
      ? Array.from(node.querySelectorAll<HTMLElement>(targetSelector))
      : Array.from(node.children).filter(
          (child): child is HTMLElement => child instanceof HTMLElement
        );
    if (selected.length > 0) return selected;
    const fallback = node.firstElementChild;
    return fallback instanceof HTMLElement ? [fallback] : [node];
  }

  function clearTargets(targets: HTMLElement[]) {
    targets.forEach((target) => {
      revealMotionElement(target);
      target.style.transform = '';
      target.style.willChange = '';
      // add target.style.filter = '' if you use filter
    });
  }

  $effect(() => {
    if (!browser) return;
    const node = wrapperRef;
    if (!node) return;

    const targets = getTargets(node);
    tween?.kill(); tween = null;
    ctx?.revert(); ctx = null;

    if (areMotionAnimationsDisabled()) {
      clearTargets(targets);
      return;
    }

    // Snapshot props into consts — $effect re-runs on prop change
    const animationDuration = duration / 1000;
    const triggerStart = start;
    const triggerEnd = end;
    const triggerScrub = scrub;
    const toggleActions = replay ? 'play reverse play reverse' : 'play none none none';
    const resolvedScroller =
      typeof scrollElement === 'string'
        ? document.querySelector<HTMLElement>(scrollElement)
        : scrollElement instanceof HTMLElement ? scrollElement : null;
    const triggerScroller =
      resolvedScroller instanceof HTMLElement ? resolvedScroller : window;

    let cancelled = false;

    const init = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        await waitForMotionLayout();
        if (cancelled) return;

        ctx = gsap.context(() => {
          // Set initial state
          gsap.set(targets, { autoAlpha: 0, y: 40, willChange: 'transform, opacity' });

          // Animate to final state
          tween = gsap.to(targets, {
            autoAlpha: 1,
            y: 0,
            duration: animationDuration,
            ease: 'power3.out',
            clearProps: 'transform,opacity,visibility,willChange',
            scrollTrigger: {
              trigger: node,
              start: triggerStart,
              end: triggerEnd,
              scrub: triggerScrub,
              scroller: triggerScroller,
              toggleActions,
              once: !replay && !triggerScrub,
              invalidateOnRefresh: true
            }
          });
        }, node);
      } catch {
        if (cancelled) return;
        ctx?.revert(); ctx = null;
        tween?.kill(); tween = null;
        clearTargets(targets);
      }
    };

    void init();

    return () => {
      cancelled = true;
      ctx?.revert(); ctx = null;
      tween?.kill(); tween = null;
      clearTargets(targets);
    };
  });
</script>

<div {...rest} style:display={display} {@attach attachWrapperRef}>
  {@render children()}
</div>
```

Once built, export from `$lib/svelteanim/index.ts` alongside the existing components.

---

## Quick Reference

### Must-follow rules

1. All GSAP code runs inside `$effect` behind `if (!browser) return`
2. Always `await import('gsap')` dynamically — never top-level
3. Always `await waitForMotionLayout()` before measuring or animating
4. Always use `gsap.context()` — it cleans up everything on `ctx.revert()`
5. Always call `revealMotionElement()` when skipping animation
6. Always set `invalidateOnRefresh: true` on ScrollTriggers
7. Never use `ease: 'expo.out'` with scrub — use `'none'` or `'power1.inOut'`
8. For scrubbed stagger: put `scrollTrigger` on the **timeline**, not on `gsap.to`

### Cleanup checklist in `$effect` return

```ts
return () => {
  cancelled = true;
  ctx?.revert();   // kills all tweens + ScrollTriggers inside the context
  ctx = null;
  tween?.kill();   // belt-and-suspenders
  tween = null;
  clearTargets(targets);  // removes inline styles, restores visibility
};
```
