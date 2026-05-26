Monthly Yearly Save 17%

Regular

$12/mo

For individual developers

* 50 AI generations per month

* All text animation effects

* Code export & copy

Most Popular

Max

$29/mo

For teams & power users

* Unlimited AI generations

* All text animation effects

* Priority support

* Premium templates & effects

Deep Dive Guide

Master scroll-driven animations and build interactive scroll stories. Learn to trigger animations on viewport entry, scrub with scroll, pin elements, and create sophisticated parallax effects. Complete with interactive demos and real-world patterns.

## What You'll Learn

* [1. What is ScrollTrigger?](https://gsapify.com/gsap-scrolltrigger/#what-is-scrolltrigger)

* [2. Installation & Setup](https://gsapify.com/gsap-scrolltrigger/#installation-setup)

* [3. ScrollTrigger Basics](https://gsapify.com/gsap-scrolltrigger/#scrolltrigger-basics)

* [4. Start & End Positions](https://gsapify.com/gsap-scrolltrigger/#start-end-positions)

* [5. Scrubbing](https://gsapify.com/gsap-scrolltrigger/#scrubbing)

* [6. Pinning](https://gsapify.com/gsap-scrolltrigger/#pinning)

* [7. Toggle Actions & Classes](https://gsapify.com/gsap-scrolltrigger/#toggle-actions)

* [8. Callbacks & Events](https://gsapify.com/gsap-scrolltrigger/#callbacks-events)

* [9. Markers & Debugging](https://gsapify.com/gsap-scrolltrigger/#markers-debugging)

* [10. Advanced Patterns](https://gsapify.com/gsap-scrolltrigger/#advanced-patterns)

* [11. ScrollTrigger + Timelines](https://gsapify.com/gsap-scrolltrigger/#scrolltrigger-timelines)

* [12. React Integration](https://gsapify.com/gsap-scrolltrigger/#react-integration)

* [13. Webflow Integration](https://gsapify.com/gsap-scrolltrigger/#webflow-integration)

* [14. 20+ Code Examples](https://gsapify.com/gsap-scrolltrigger/#code-examples)

Chapter 1

## What is ScrollTrigger?

**ScrollTrigger** is a powerful GSAP plugin that binds animations to scroll position. Instead of animations playing when the page loads, they trigger when elements enter the viewport or at specific scroll positions. This unlocks scroll-driven animations, parallax effects, scroll stories, and interactive scroll experiences—all with the performance and control of GSAP.

At its core, ScrollTrigger watches scroll position and fires animations when triggers are met. It handles all the complex viewport calculations, performance optimization, and browser quirks automatically. You define when animations should trigger (start and end positions), what animations play, and whether they scrub with scroll or play at specific moments.

JavaScript

```text
// Basic ScrollTrigger animation
gsap.to('.box', {
  duration: 1,
  opacity: 1,
  y: 0,
  scrollTrigger: {
    trigger: '.box',           // Element that triggers animation
    start: 'top 80%',          // When top of box hits 80% of viewport
    end: 'top 50%',            // When top of box hits 50% of viewport
    toggleActions: 'play none none none'  // Play on enter only
  }
});

// Register ScrollTrigger plugin (required)
gsap.registerPlugin(ScrollTrigger);

// Detect when trigger fires
gsap.to('.box', {
  x: 100,
  scrollTrigger: {
    trigger: '.box',
    onEnter: () => console.log('Entered viewport'),
    onLeave: () => console.log('Left viewport')
  }
});
```

#### Why ScrollTrigger?

* **Viewport awareness:** Automatically detect when elements enter/leave viewport

* **Scroll-driven:** Link animation progress directly to scroll position

* **Performance:** GPU-accelerated with automatic optimization

* **Flexibility:** Works with timelines, tweens, and custom callbacks

* **Responsive:** Recalculates positions on resize automatically

* **Debugging:** Visual markers show trigger positions

ScrollTrigger is the foundation for modern scroll animations. Every time you want animations to respond to scroll—entrance effects, parallax, scroll stories, interactive experiences—ScrollTrigger is your tool. Master it and unlock sophisticated scroll experiences.

Chapter 2

## Installation & Setup

Getting ScrollTrigger up and running is straightforward. You have multiple installation options depending on your project setup: CDN for quick testing, NPM/Yarn for modern projects, or native Webflow integration for no-code setup.

### Method 1: CDN (Quickest)

HTML

```text
<!-- Add before closing body tag -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<script>
  gsap.registerPlugin(ScrollTrigger);

  // Your animations here
  gsap.to(".box", {
    scrollTrigger: ".box",
    x: 500,
    duration: 2
  });
</script>
```

### Method 2: NPM/Yarn

Terminal

```text
# Install GSAP
npm install gsap

# Or with Yarn
yarn add gsap
```

JavaScript

```text
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

// Your animations here
gsap.to(".box", {
  scrollTrigger: ".box",
  x: 500
});
```

### Method 3: Webflow (Native Integration)

As of 2025, GSAP and ScrollTrigger are natively integrated into Webflow. Enable it in your project settings:

1. Go to Project Settings → Integrations

2. Toggle "GSAP Library" ON

3. Check "ScrollTrigger" plugin

4. Add custom code in Page Settings or Embed elements

Webflow Custom Code

```text
<script>
  document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Your animations here
    gsap.to(".hero-image", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1
      },
      y: 200,
      scale: 1.2
    });
  });
</script>
```

#### Important Notes

* Always register the plugin with `gsap.registerPlugin(ScrollTrigger)` before using it

* Wrap code in DOMContentLoaded or window.onload to ensure DOM is ready

* Check that GSAP library is loaded before your custom code runs

Chapter 3

## ScrollTrigger Basics

The simplest way to use ScrollTrigger is to add it as a property to any GSAP animation. Define a trigger element, set start and end positions, and let ScrollTrigger handle the rest.

### Your First ScrollTrigger Animation

JavaScript

```text
gsap.to(".box", {
  scrollTrigger: ".box", // trigger when .box enters viewport
  x: 500,
  duration: 2
});
```

This animates the box when it enters the viewport. Once triggered, the animation plays once and completes. For more control, pass ScrollTrigger as an object with configuration options.

### ScrollTrigger as an Object

JavaScript

```text
gsap.to(".box", {
  scrollTrigger: {
    trigger: ".box",
    start: "top center",     // when top of trigger hits center of viewport
    end: "bottom top",       // when bottom of trigger hits top of viewport
    markers: true,           // show visual markers (for debugging)
    scrub: true,             // link animation to scrollbar
    pin: true                // pin the element while scrolling
  },
  x: 500
});
```

#### Key ScrollTrigger Properties

* **trigger:** Element that triggers the animation

* **start:** When to start the animation (e.g., "top center")

* **end:** When to end the animation (e.g., "bottom top")

* **scrub:** Link animation to scrollbar (true or number for smoothing)

* **pin:** Pin element during scroll

* **markers:** Show visual debugging markers

* **toggleActions:** Control play, pause, resume, reverse on enter/leave

* **onEnter, onLeave, onEnterBack, onLeaveBack:** Callback functions

Chapter 4

## Start & End Positions

The **start** and **end** positions define when ScrollTrigger fires. They use a simple syntax: `'triggerPosition viewportPosition'`. The trigger position is relative to the trigger element (top, center, bottom), and the viewport position is a percentage or pixel value of the viewport height.

For example, `'top 80%'` means "fire when the top of the trigger element hits 80% down the viewport." This gives you pixel-perfect control over when animations start and stop. Understanding start/end positions is critical for precise animation timing and scroll-driven effects.

JavaScript

```text
// Start/End Position Syntax: 'triggerPosition viewportPosition'

// START POSITION EXAMPLES
gsap.to('.box', {
  x: 100,
  scrollTrigger: {
    trigger: '.box',
    start: 'top 80%'      // Fire when box top hits 80% of viewport
  }
});

gsap.to('.box', {
  x: 100,
  scrollTrigger: {
    trigger: '.box',
    start: 'center center'  // Fire when box center hits viewport center
  }
});

gsap.to('.box', {
  x: 100,
  scrollTrigger: {
    trigger: '.box',
    start: 'bottom top'   // Fire when box bottom hits top of viewport
  }
});

// END POSITION
gsap.to('.box', {
  x: 100,
  scrollTrigger: {
    trigger: '.box',
    start: 'top 80%',
    end: 'top 20%'        // Stop when box top hits 20% of viewport
  }
});

// TRIGGER POSITION OPTIONS
// 'top' - Top of element
// 'center' - Center of element
// 'bottom' - Bottom of element

// VIEWPORT POSITION OPTIONS
// 'top' - Top of viewport
// 'center' - Center of viewport (50%)
// 'bottom' - Bottom of viewport
// Or any percentage: '75%', '25%'
// Or pixel offsets: 'top +=100', 'center -=50'
```

#### Position Reference Guide

| Start Position  | When It Fires                            | Use Case                                |
| --------------- | ---------------------------------------- | --------------------------------------- |
| `top 80%`       | When element is 80% down viewport        | Early trigger (element already visible) |
| `top center`    | When element reaches viewport center     | Moderate scroll position                |
| `top top`       | When element hits top of viewport        | Late trigger (element just entered)     |
| `center center` | When element center hits viewport center | Perfect viewport alignment              |
| `bottom top`    | When element leaves viewport             | Very late trigger                       |

Chapter 5

## Scrubbing Animations

**Scrubbing** ties animation progress directly to scroll position. Instead of playing an animation when triggered, the animation's playhead moves with the user's scroll. This creates interactive, scroll-driven experiences where users feel in control of the animation. Scrubbing is essential for scroll stories, progress indicators, and parallax effects.

Use `scrub: true` for instant scrubbing with no smoothing, or `scrub: 1` for 1 second of smoothing between scroll and animation position. The smoothing value creates a lag effect where the animation catches up to scroll position—useful for polished, organic feeling animations.

JavaScript

```text
// Scrubbing links animation to scroll position

// INSTANT SCRUBBING (no smoothing)
gsap.to('.box', {
  duration: 2,
  x: 500,
  scrollTrigger: {
    trigger: '.box',
    start: 'top 80%',
    end: 'top 20%',
    scrub: true  // Instant scrubbing
  }
});

// SMOOTH SCRUBBING (with lag)
gsap.to('.box', {
  duration: 2,
  x: 500,
  scrollTrigger: {
    trigger: '.box',
    start: 'top 80%',
    end: 'top 20%',
    scrub: 1  // 1 second of smoothing/lag
  }
});

// SCRUBBING WITH DURATION
// The duration determines the distance the animation covers
// longer duration = longer distance traveled
gsap.to('.box', {
  duration: 5,      // Animation lasts 5 seconds of scroll
  rotation: 360,
  x: 1000,
  scrollTrigger: {
    trigger: '.section',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true
  }
});

// SCRUBBING WITH TIMELINE
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.section',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 2  // 2 seconds of smoothing
  }
});

tl.to('.box1', { x: 100 }, 0)
  .to('.box2', { y: 100 }, 0)
  .to('.box3', { rotate: 360 }, 0);

// PRACTICAL: Scroll Progress Bar
gsap.to('.progress-bar', {
  width: '100%',
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true
  }
});
```

#### Scrubbing Tips

* **scrub: true** - Instant scrubbing, animation follows scroll exactly

* **scrub: 1** - 1 second lag between scroll and animation (smooth, organic feel)

* **Duration matters:** Longer duration = more distance covered during scroll range

* **Use with end position:** Define both start and end for scrubbing to know the full range

* **Performance tip:** Scrub many properties simultaneously for complex animations

* **Not for play/pause:** Scrubbing replaces normal playback—don't mix scrub with play toggles

Chapter 6

## Pinning Elements

**Pinning** freezes an element in place while the page scrolls underneath it. This is perfect for hero sections, sticky headers, or keeping elements visible while their content animates. The element stays at its position for a defined scroll distance (the end position), then unpins and scrolls normally again.

Set `pin: true` to pin the trigger element, or `pin: '.custom-element'` to pin a different element. Control the pin duration with the `end` position, typically using `end: '+=1500'` to pin for 1500px of scroll. ScrollTrigger automatically handles spacing and layout adjustments.

JavaScript

```text
// BASIC PINNING - Pin the trigger element
gsap.to('.hero', {
  scrollTrigger: {
    trigger: '.hero',
    pin: true,              // Pin the .hero element
    start: 'top top',       // Start pinning at top
    end: '+=1500',          // Pin for 1500px of scroll
    markers: true           // Debug markers
  }
});

// PIN DIFFERENT ELEMENT
gsap.to('.content', {
  x: 100,
  scrollTrigger: {
    trigger: '.section',
    pin: '.header',         // Pin .header, not .section
    start: 'top top',
    end: 'bottom bottom'
  }
});

// PIN WITH SCRUBBING (Common Pattern)
gsap.timeline({
  scrollTrigger: {
    trigger: '.full-screen',
    pin: true,
    start: 'top top',
    end: '+=2000',          // Pin for 2000px
    scrub: 1                // Scrub animations while pinned
  }
})
.to('.box', { x: 100 })
.to('.box', { y: 100 }, '<')
.to('.box', { rotate: 360 }, '<');

// PINNING WITH SPACING CONTROL
gsap.to('.section', {
  scrollTrigger: {
    trigger: '.section',
    pin: true,
    pinSpacing: false,      // Don't add extra space after pin ends
    start: 'top top',
    end: 'bottom top'
  }
});

// HORIZONTAL SCROLL WITH PIN
gsap.to('.horizontal-list', {
  x: -500,
  scrollTrigger: {
    trigger: '.horizontal-container',
    pin: true,
    start: 'top top',
    end: '+=1000',
    scrub: true
  }
});

// PRACTICAL: Sticky Hero with Animation
gsap.timeline({
  scrollTrigger: {
    trigger: '.hero-section',
    pin: true,
    start: 'top top',
    end: '+=1000',
    scrub: 1
  }
})
.from('.hero-title', { opacity: 0, y: 100 }, 0)
.to('.hero-title', { opacity: 0, y: -100 }, '+=0.5')
.to('.hero-bg', { opacity: 0.5 }, 0);
```

#### Pinning Configuration

* **pin: true** - Pin the trigger element

* **pin: '.selector'** - Pin a different element

* **pinSpacing: true** - Add padding after pin ends (default, prevents layout jump)

* **pinSpacing: false** - No padding added (use when you control spacing)

* **end position:** Use '+=1500' for pixels or 'bottom bottom' for viewport-based

* **Perfect with scrub:** Combine pin + scrub + timeline for full control

* **Responsive:** Recalculates pin duration on window resize automatically

Chapter 7

## Toggle Actions & Classes

**toggleActions** controls what happens when the trigger fires and unfires. Specify actions for entering/leaving the viewport in either direction. You can play, pause, resume, or reset animations based on scroll behavior. This is perfect for reversing animations when scrolling back up or toggling visibility.

The syntax is `'onEnter onLeave onEnterBack onLeaveBack'`. For example, `'play pause none none'` plays when entering viewport, pauses when leaving. You can also use `toggleClass` to add/remove CSS classes based on scroll position, enabling complex state changes with CSS.

JavaScript

```text
// TOGGLE ACTIONS SYNTAX
// 'onEnter onLeave onEnterBack onLeaveBack'
// Actions: play, pause, resume, reset, restart, complete, reverse

// PLAY ON ENTER, PAUSE ON LEAVE (most common)
gsap.to('.box', {
  x: 100,
  scrollTrigger: {
    trigger: '.box',
    start: 'top 80%',
    end: 'top 20%',
    toggleActions: 'play pause none none'
    // onEnter: play, onLeave: pause, onEnterBack: none, onLeaveBack: none
  }
});

// PLAY FORWARD ON ENTER, REVERSE ON LEAVE
gsap.to('.box', {
  duration: 1,
  x: 100,
  scrollTrigger: {
    trigger: '.box',
    toggleActions: 'play reverse none none'
    // Scrolling down: play forward
    // Scrolling back up: reverse animation
  }
});

// PLAY AND RESTART CONTINUOUSLY
gsap.to('.box', {
  duration: 1,
  opacity: 0.5,
  scrollTrigger: {
    trigger: '.box',
    toggleActions: 'restart none none none'
    // Every enter triggers play from start
  }
});

// NO TOGGLE (runs once)
gsap.to('.box', {
  x: 100,
  scrollTrigger: {
    trigger: '.box',
    toggleActions: 'play none none none'
  }
});

// TOGGLE CSS CLASSES
gsap.to('.section', {
  scrollTrigger: {
    trigger: '.section',
    start: 'top 80%',
    toggleClass: 'active'  // Add 'active' class on enter, remove on leave
  }
});

// MULTIPLE CLASSES
gsap.to('.section', {
  scrollTrigger: {
    trigger: '.section',
    start: 'top center',
    toggleClass: 'in-view active visible'
  }
});

// COMBINE TOGGLEACTIONS AND TOGGLECLASS
gsap.timeline({
  scrollTrigger: {
    trigger: '.card',
    start: 'top 75%',
    toggleActions: 'play none none none',
    toggleClass: 'animated'
  }
})
.from('.card', { opacity: 0, y: 50 })
.to('.card', { boxShadow: '0 10px 30px rgba(0,255,102,0.2)' }, 0);

// PRACTICAL: Scroll-linked class states
document.querySelectorAll('.section').forEach(section => {
  gsap.to(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      toggleClass: 'in-viewport'  // CSS can target .section.in-viewport
    }
  });
});
```

#### toggleActions Reference

**Available Actions:**

* `play` - Start animation from start

* `pause` - Pause at current position

* `resume` - Resume from pause

* `reset` - Jump to start, don't play

* `restart` - Jump to start and play

* `reverse` - Play backwards

* `complete` - Jump to end

* `none` - Do nothing

**Common Patterns:**

* `'play none none none'` - Fire once

* `'play pause none none'` - Play/pause toggle

* `'play reverse none none'` - Reverse on leave

* `'restart none none none'` - Restart on each enter

* `'play pause play pause'` - Full toggle both directions

Chapter 8

## Callbacks & Events

**Callbacks** let you execute custom code when trigger events fire. ScrollTrigger provides `onEnter`, `onLeave`, `onEnterBack`, `onLeaveBack`, `onUpdate`, and `onRefresh` callbacks. These let you synchronize animations with other code, track scroll events, or update UI elements based on trigger state.

Callbacks receive the trigger object as a parameter, letting you inspect properties like `isActive`, `progress`, and `direction`. This enables responsive logic where your code adapts based on scroll direction, progress through the animation, or visibility state.

JavaScript

```text
// BASIC CALLBACKS
gsap.to('.box', {
  x: 100,
  scrollTrigger: {
    trigger: '.box',
    start: 'top 80%',
    end: 'top 20%',

    onEnter: () => console.log('Entered!'),
    onLeave: () => console.log('Left!'),
    onEnterBack: () => console.log('Entered again (scrolling back)'),
    onLeaveBack: () => console.log('Left (scrolling back)')
  }
});

// CALLBACK WITH TRIGGER OBJECT
gsap.to('.section', {
  scrollTrigger: {
    trigger: '.section',
    start: 'top center',
    onEnter: (self) => {
      console.log('Progress:', self.progress);
      console.log('Direction:', self.direction);  // 1 or -1
      console.log('Is active:', self.isActive);
    },
    onUpdate: (self) => {
      // Fires on every frame during animation
      console.log('Progress:', self.progress);  // 0-1
    },
    onRefresh: (self) => {
      // Fires when ScrollTrigger recalculates (resize, etc)
      console.log('Refreshed, new trigger:', self.start);
    }
  }
});

// PRACTICAL: Update UI based on scroll
gsap.to('.section', {
  scrollTrigger: {
    trigger: '.section',
    start: 'top center',
    onEnter: () => {
      document.querySelector('.indicator').classList.add('active');
    },
    onLeave: () => {
      document.querySelector('.indicator').classList.remove('active');
    }
  }
});

// CONDITIONAL LOGIC IN CALLBACKS
gsap.to('.box', {
  x: 100,
  scrollTrigger: {
    trigger: '.box',
    start: 'top 75%',
    onEnter: (self) => {
      if (self.direction === 1) {
        console.log('Scrolling down');
      } else {
        console.log('Scrolling up');
      }
    },
    onUpdate: (self) => {
      // Update progress bar
      const progressPercent = self.progress * 100;
      document.querySelector('.progress-bar').style.width = progressPercent + '%';
    }
  }
});

// TIMELINE WITH CALLBACKS
gsap.timeline({
  scrollTrigger: {
    trigger: '.section',
    start: 'top center',
    onEnter: () => {
      console.log('Timeline started');
      // Load content dynamically
      loadMoreContent();
    },
    onLeave: () => {
      console.log('Timeline left');
    }
  }
})
.from('.content', { opacity: 0, y: 50 })
.to('.content', { opacity: 1, y: 0 });

// MULTIPLE TRIGGERS WITH CALLBACKS
document.querySelectorAll('.card').forEach((card, i) => {
  gsap.to(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top center',
      onEnter: () => {
        card.style.background = 'rgba(0,255,102,0.1)';
      },
      onLeave: () => {
        card.style.background = 'transparent';
      }
    }
  });
});
```

#### Callback Events

**Scroll Events:**

* `onEnter` - Element enters viewport

* `onLeave` - Element leaves viewport

* `onEnterBack` - User scrolls back into trigger

* `onLeaveBack` - User scrolls back out

**Utility Events:**

* `onUpdate` - Every frame during animation

* `onRefresh` - When trigger recalculates

* `onToggle` - When active/inactive state changes

Chapter 9

## Markers & Debugging

**Markers** are visual indicators that show trigger start and end positions on the page. When debugging animations, enable markers to see exactly where your animations trigger. This is invaluable for fine-tuning animations and understanding viewport positions. Markers only appear during development—disable in production.

Enable markers with `markers: true` in your scrollTrigger config. You'll see three colored lines: the start position, end position, and the trigger element's boundary. ScrollTrigger also provides `getAll()` to inspect all active triggers and debug complex scenarios.

JavaScript

```text
// ENABLE MARKERS FOR DEBUGGING
gsap.to('.box', {
  x: 100,
  scrollTrigger: {
    trigger: '.box',
    start: 'top 80%',
    end: 'top 20%',
    markers: true  // Show visual markers
  }
});

// CUSTOM MARKER LABELS
gsap.to('.box', {
  x: 100,
  scrollTrigger: {
    trigger: '.box',
    start: 'top 80%',
    end: 'top 20%',
    markers: {
      startColor: 'white',
      endColor: 'fuchsia',
      fontSize: '16px'
    }
  }
});

// INSPECT ALL ACTIVE TRIGGERS
const allTriggers = ScrollTrigger.getAll();
console.log('Total triggers:', allTriggers.length);

allTriggers.forEach(trigger => {
  console.log({
    trigger: trigger.trigger,
    start: trigger.start,
    end: trigger.end,
    progress: trigger.progress,
    isActive: trigger.isActive,
    direction: trigger.direction
  });
});

// GET SPECIFIC TRIGGER
const trigger = ScrollTrigger.getById('myTrigger');

// DEBUGGING: Log all trigger data
gsap.to('.box', {
  x: 100,
  id: 'myTrigger',  // Give it an ID
  scrollTrigger: {
    trigger: '.box',
    start: 'top 80%',
    end: 'top 20%',
    onEnter: (self) => {
      console.log('Trigger data:', {
        progress: self.progress,
        direction: self.direction,
        isActive: self.isActive,
        getVelocity: self.getVelocity()
      });
    }
  }
});

// REFRESH TRIGGERS MANUALLY
ScrollTrigger.refresh();

// DISABLE ALL TRIGGERS TEMPORARILY
ScrollTrigger.disable();

// RE-ENABLE TRIGGERS
ScrollTrigger.enable();

// KILL SPECIFIC TRIGGER
const tween = gsap.to('.box', { x: 100, scrollTrigger: { trigger: '.box' } });
tween.scrollTrigger.kill();

// KILL ALL TRIGGERS
ScrollTrigger.getAll().forEach(trigger => trigger.kill());

// PRACTICAL: Development-only markers
const isDev = true;  // Set based on environment

gsap.to('.section', {
  scrollTrigger: {
    trigger: '.section',
    start: 'top center',
    markers: isDev,  // Only show in development
    onEnter: isDev ? () => console.log('Debug: Entered') : undefined
  }
});
```

#### Debugging Tips

* **Always use markers:** Enable them while developing, disable for production

* **Console logging:** Log in onEnter, onUpdate callbacks to track state

* **Inspect triggers:** Use ScrollTrigger.getAll() to see all active triggers

* **Check progress:** Log self.progress in callbacks to see animation progress (0-1)

* **Refresh on changes:** Call ScrollTrigger.refresh() after dynamic content changes

* **Direction matters:** Check self.direction (1=down, -1=up) for conditional logic

* **Browser DevTools:** Scroll through trigger positions manually to test edge cases

Chapter 10

## Advanced Patterns

Advanced ScrollTrigger patterns include batch processing for performance, responsive configurations with matchMedia, horizontal scrolling, snap positioning, and complex nested timelines. These techniques enable professional production-quality animations that handle edge cases, respond to screen size changes, and maintain performance with many elements.

Master batch(), matchMedia(), and snap() to build sophisticated, responsive scroll experiences that work across all devices. These patterns are essential for production applications where performance and responsiveness are critical requirements.

JavaScript

```text
// BATCH: Optimize many similar triggers
// More performant than creating individual triggers
ScrollTrigger.batch('.card', {
  onEnter: (elements) => {
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15
    });
  },
  onLeave: (elements) => {
    gsap.to(elements, { opacity: 0.5 });
  },
  start: 'top 90%',
  interval: 200  // Wait 200ms between batches
});

// MATCH MEDIA: Responsive ScrollTrigger
gsap.matchMedia().add(
  {
    isDesktop: '(min-width: 1024px)',
    isMobile: '(max-width: 768px)'
  },
  (context) => {
    let { isDesktop, isMobile } = context.conditions;

    if (isDesktop) {
      gsap.to('.section', {
        scrollTrigger: {
          trigger: '.section',
          start: 'top center',
          pin: true,
          end: '+=1000'
        }
      });
    }

    if (isMobile) {
      gsap.to('.section', {
        scrollTrigger: {
          trigger: '.section',
          start: 'top 75%'
        }
      });
    }

    return () => {
      // Optional: cleanup code
    };
  }
);

// SNAP: Snap to specific timeline positions
gsap.timeline({
  scrollTrigger: {
    trigger: '.section',
    pin: true,
    start: 'top top',
    end: '+=2000',
    scrub: 1,
    snap: {
      snapTo: 0.5,  // Snap to 50% increments
      duration: 0.5,
      delay: 0
    }
  }
})
.to('.box1', { x: 100 })
.to('.box2', { y: 100 }, 0);

// SNAP WITH CUSTOM ARRAY
gsap.to('.box', {
  x: 500,
  scrollTrigger: {
    trigger: '.box',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    snap: [0, 0.25, 0.5, 0.75, 1]  // Snap to specific points
  }
});

// HORIZONTAL SCROLL WITH PIN
gsap.to('.horizontal-list', {
  x: -500,
  duration: 1,
  scrollTrigger: {
    trigger: '.horizontal-container',
    pin: true,
    start: 'top top',
    end: '+=1000',
    scrub: 1,
    onUpdate: (self) => {
      // Custom logic during horizontal scroll
    }
  }
});

// PARALLAX LAYERS
document.querySelectorAll('.parallax-layer').forEach((layer, i) => {
  gsap.to(layer, {
    y: (i + 1) * 100,  // Each layer moves at different speed
    scrollTrigger: {
      trigger: '.parallax-section',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      markers: false
    }
  });
});

// COMPLEX NESTED TIMELINE WITH SCROLLTRIGGER
gsap.timeline({
  scrollTrigger: {
    trigger: '.complex-section',
    pin: true,
    start: 'top top',
    end: '+=2000',
    scrub: 1,
    snap: 0.25,
    onUpdate: (self) => {
      // Sync other UI elements
      updateProgressBar(self.progress);
    }
  }
})
.from('.intro', { opacity: 0, y: 50 }, 0)
.to('.intro', { opacity: 0, y: -50 }, 0.25)
.from('.content', { opacity: 0 }, 0.25)
.to('.content', { y: 100 }, 0.5)
.to('.bg', { opacity: 0 }, 0);

// PERFORMANCE: Kill unused triggers
function cleanupScrollTriggers(selector) {
  ScrollTrigger.getAll()
    .filter(trigger => trigger.trigger.matches(selector))
    .forEach(trigger => trigger.kill());
}

// Dynamic content: refresh triggers
async function loadMoreContent() {
  const html = await fetch('/more-content').then(r => r.text());
  document.getElementById('container').innerHTML += html;
  ScrollTrigger.refresh();  // Recalculate all trigger positions
}
```

#### Advanced Techniques

* **Batch:** Create multiple triggers efficiently with one config, scales to hundreds of elements

* **matchMedia:** Apply different configs at different breakpoints, fully responsive

* **Snap:** Snap animation progress to specific values as user scrolls

* **Parallax:** Move elements at different speeds based on scroll for depth effects

* **Horizontal scroll:** Combine pin + scrub to scroll horizontally while page scrolls vertically

* **Dynamic refresh:** Call ScrollTrigger.refresh() after adding content dynamically

* **Cleanup:** Kill triggers before removing elements to prevent memory leaks

Chapter 11

## ScrollTrigger with GSAP Timelines

Combining ScrollTrigger with GSAP timelines lets you create complex, choreographed scroll animations. Rather than individual scroll-triggered tweens, timelines orchestrate multiple animations in sequence based on scroll position. This is perfect for scroll stories where multiple elements animate in a coordinated sequence.

JavaScript

```text
// Timeline with ScrollTrigger
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    start: "top top",
    end: "bottom top",
    scrub: 1,
    pin: true
  }
});

tl.to(".box1", { x: 500 })
  .to(".box2", { y: 300 })
  .to(".box3", { rotation: 360 });

// Multiple ScrollTriggers with Timeline
let tl = gsap.timeline();

tl.from(".heading", { opacity: 0, y: 50 })
  .from(".subheading", { opacity: 0, y: 30 }, "-=0.3")
  .from(".content", { opacity: 0 }, "-=0.2");

ScrollTrigger.create({
  trigger: ".section",
  start: "top 80%",
  animation: tl
});
```

#### Timeline + ScrollTrigger Patterns

* Create timeline with `gsap.timeline({ scrollTrigger: {...} })`

* Add tweens to timeline with `.to()`, `.from()`, `.fromTo()`

* Use position parameters like `'<'` for parallel animations

* Combine scrub with timelines for interactive scroll experiences

* Use scrub numbers (1, 2, etc.) for smooth scroll-linked timelines

* Perfect for complex sequences: fade-in → animate → fade-out

Chapter 12

## ScrollTrigger in React

Using ScrollTrigger in React requires proper cleanup and lifecycle management. Always register the plugin, use refs to target elements, and kill triggers on component unmount to prevent memory leaks.

### React Functional Component

React

```text
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ScrollComponent() {
  const boxRef = useRef(null);

  useEffect(() => {
    const element = boxRef.current;

    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top center",
        end: "bottom top",
        scrub: true,
        markers: true
      },
      x: 500
    });

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return <div ref={boxRef} className="box">Scroll Me</div>;
}
```

### Using useGSAP Hook (Recommended)

React

```text
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ScrollComponent() {
  const container = useRef();

  useGSAP(() => {
    gsap.to(".box", {
      scrollTrigger: {
        trigger: ".box",
        scrub: true
      },
      x: 500
    });
  }, { scope: container }); // Auto cleanup!

  return <div ref={container}>...</div>;
}
```

#### React Best Practices

* Always use refs for targeting elements

* Clean up ScrollTriggers in useEffect return function

* Use useGSAP hook from @gsap/react for automatic cleanup

* Call ScrollTrigger.refresh() after route changes

* Register plugin at module level, not inside components

Chapter 13

## ScrollTrigger in Webflow

Since Webflow's native GSAP integration in 2025, using ScrollTrigger is easier than ever. Add custom code in Embed elements or Page Settings and leverage Webflow's class names for targeting.

### Webflow Custom Code Setup

Webflow Embed

```text
<script>
// Wait for page load
document.addEventListener('DOMContentLoaded', () => {

  // Register plugin (already loaded in Webflow)
  gsap.registerPlugin(ScrollTrigger);

  // Your animations
  gsap.to(".hero-image", {
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: 1
    },
    y: 200,
    scale: 1.2
  });

});
</script>
```

### Using Webflow Class Names

JavaScript

```text
// Target Webflow combo classes
gsap.to(".card.is-featured", {
  scrollTrigger: ".card.is-featured",
  scale: 1.1
});

// Animate collection items
gsap.from(".collection-item", {
  scrollTrigger: {
    trigger: ".collection-list",
    start: "top 80%"
  },
  y: 50,
  opacity: 0,
  stagger: 0.2
});
```

#### Webflow + ScrollTrigger Tips

* Always wrap code in DOMContentLoaded

* Call ScrollTrigger.refresh() after Webflow interactions

* Test thoroughly in published site, not just Designer

* Use Webflow's native interactions for simple fades when possible

* GSAP is automatically available in Webflow—don't load it separately

Chapter 14

## 20+ ScrollTrigger Code Examples

Here are production-ready examples you can copy and customize for your projects. Each example demonstrates a common scroll animation pattern.

### Example 1: Fade In on Scroll

JavaScript

```text
gsap.from(".fade-in", {
  scrollTrigger: {
    trigger: ".fade-in",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  opacity: 0,
  y: 50,
  duration: 1
});
```

### Example 2: Parallax Background

JavaScript

```text
gsap.to(".parallax-bg", {
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top top",
    end: "bottom top",
    scrub: true
  },
  y: 300,
  ease: "none"
});
```

### Example 3: Horizontal Scroll Gallery

JavaScript

```text
let sections = gsap.utils.toArray(".panel");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector(".container").offsetWidth
  }
});
```

These three examples demonstrate fade-in, parallax, and horizontal scroll—the most common ScrollTrigger patterns. Explore the complete guide for 20+ additional examples covering all use cases.

## ScrollTrigger Best Practices

#### Performance First

Use batch() for many elements, avoid onUpdate for heavy calculations, kill triggers when elements are removed. Performance is critical for scroll animations.

#### Mobile-First

Test extensively on mobile. Use matchMedia() for different animations at different breakpoints. Pin durations, timing, and scroll distances vary on mobile.

#### Refresh on Changes

Call ScrollTrigger.refresh() after window resize, content changes, or images load. Triggers won't recalculate automatically for some changes.

#### Debug Systematically

Enable markers, log in callbacks, test viewport positions. Use ScrollTrigger.getAll() to inspect all active triggers and verify positions.

#### Respect Preferences

Check prefers-reduced-motion and disable ScrollTrigger animations for users who prefer no motion. Animations should enhance, not hinder usability.

#### Plan Your Timing

Plan start/end positions before coding. Sketch viewport positions and trigger moments. Proper planning prevents timing bugs and improves animation quality.

## ScrollTrigger Questions

ScrollTrigger is a GSAP plugin that ties animations to scroll events. Instead of animations playing on page load, they trigger when elements enter the viewport. You can scrub animations with scroll, pin elements while content scrolls, create parallax effects, and build scroll stories. It handles all viewport calculations and performance optimization automatically, making scroll-driven animations accessible without complex JavaScript.

Use the scrollTrigger config on any tween or timeline: `gsap.to(element, { x: 100, scrollTrigger: { trigger: element, start: 'top 80%' } })`. When the top of the element hits 80% of the viewport height, the animation plays. Adjust start/end positions to control when animations trigger. Use `start: 'top center'` for center viewport, `start: 'top top'` for top of viewport.

Scrubbing links animation progress directly to scroll position. Set `scrub: true` for instant scrubbing, or `scrub: 1` for 1 second of smoothing. This creates interactive effects where users control animations by scrolling—perfect for scroll stories, progress indicators, and parallax layers. The duration of your animation determines how far it travels during the scroll range.

Set `pin: true` in scrollTrigger config and define an `end` position. The element stays visible at its position while the page scrolls underneath. Use `pin: '.container'` to pin a specific element. Control the pin duration with `end: '+=1500'` (1500px of scroll) or `end: 'bottom bottom'`. ScrollTrigger automatically handles spacing and layout adjustments.

toggleActions controls what happens at scroll trigger events: `'onEnter onLeave onEnterBack onLeaveBack'`. Example: `'play pause none none'` plays when entering viewport, pauses when leaving. Use them to reverse animations or create toggle effects based on scroll direction. Actions include: play, pause, resume, reset, restart, complete, reverse, and none.

Enable `markers: true` in scrollTrigger config to see visual start/end markers on the page. Use the ScrollTrigger.getAll() method to inspect all active triggers in the console. Log in callbacks (onEnter, onLeave, onUpdate) to trace what's happening. The browser DevTools console is your friend—log trigger progress, direction, and active state to understand behavior.

Yes. Use `gsap.utils.toArray()` and forEach() to loop through elements. Or use `ScrollTrigger.batch()` for better performance with many elements—it groups them and staggers initialization. Example: `ScrollTrigger.batch('.card', { onEnter: (elements) => { gsap.to(elements, {...}) } })`. Batch is more efficient than individual triggers for large numbers of elements.

Use `gsap.matchMedia()` to apply different configs at different breakpoints. Or use `ScrollTrigger.refresh()` after window resize to recalculate trigger positions. Test thoroughly on mobile devices since trigger positions change with viewport size. Many animations work great on desktop but need adjustment for mobile—use matchMedia to provide device-specific experiences.

## Ready to Master ScrollTrigger?

You now have all the knowledge to create sophisticated, scroll-driven animations. From simple trigger-based animations to complex pinned sections with scrubbing and parallax, you can build anything. The key is practice—start small, experiment with timing, and scale up to complex patterns.
