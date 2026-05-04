<script lang="ts">
    import { gsap } from "gsap";
    import { SplitText } from "gsap/SplitText";
    import { onMount } from "svelte";
    import type { Snippet } from "svelte";
    import { registerPluginOnce } from "$lib/utils/gsaphelper";

    interface ComponentProps {
        children?: Snippet;
        class?: string;
        /**
         * Trigger: Scrambles when this becomes true.
         */
        isScramble?: boolean;
        scrambleDuration?: number;
        stagger?: number;
        cycles?: number;
        characters?: string;
        [prop: string]: unknown;
    }

    let {
        children,
        class: className = "",
        isScramble = false, // New prop
        scrambleDuration = 0.6,
        stagger = 0.03,
        cycles = 12,
        characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*",
        ...restProps
    }: ComponentProps = $props();

    onMount(() => {
        registerPluginOnce(SplitText);
    });

    let wrapperRef: HTMLSpanElement | undefined;
    let splitInstance: SplitText | null = null;
    let scrambleTimeline: gsap.core.Timeline | null = null;

    const attachWrapperRef = (node: HTMLSpanElement) => {
        wrapperRef = node;
        return {
            destroy() {
                if (wrapperRef === node) wrapperRef = undefined;
            }
        };
    };

    const getRandomChar = (pool: string) => {
        const index = Math.floor(Math.random() * pool.length);
        return pool[index] ?? "";
    };

    const createScrambleTimeline = (nodes: HTMLElement[]) => {
        if (!nodes.length) return null;
        const pool = characters || "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const timeline = gsap.timeline({ paused: true });
        const stepCount = Math.max(1, Math.floor(cycles));
        const stepDuration = Math.max(0.1, scrambleDuration) / stepCount;

        nodes.forEach((node, index) => {
            const finalChar = node.dataset.originalChar ?? node.textContent ?? "";
            const charTimeline = gsap.timeline();

            if (finalChar.trim().length === 0) {
                charTimeline.call(() => { node.textContent = finalChar; });
            } else {
                for (let i = 0; i < stepCount; i++) {
                    charTimeline.call(() => { node.textContent = getRandomChar(pool); });
                    charTimeline.to({}, { duration: stepDuration });
                }
                charTimeline.call(() => { node.textContent = finalChar; });
            }
            timeline.add(charTimeline, index * stagger);
        });
        return timeline;
    };

    // Effect to initialize SplitText
    $effect(() => {
        if (typeof window === "undefined" || !wrapperRef) return;
        
        splitInstance?.revert();
        splitInstance = SplitText.create(wrapperRef, {
            type: "chars",
            reduceWhiteSpace: false,
            charsClass: "inline-block",
        });

        splitInstance.chars?.forEach((node) => {
            const el = node as HTMLElement;
            el.dataset.originalChar = el.textContent ?? "";
            if (!el.textContent?.trim()) el.style.whiteSpace = "pre";
        });

        scrambleTimeline = createScrambleTimeline(splitInstance.chars as HTMLElement[]);

        return () => {
            scrambleTimeline?.kill();
            splitInstance?.revert();
        };
    });

    // Effect to watch the boolean variable
    $effect(() => {
        if (isScramble) {
            scrambleTimeline?.restart();
        } else {
            // Instantly finish the animation when isScramble is false
            scrambleTimeline?.progress(1);
        }
    });

    function cn(...classes: Array<string | false | null | undefined>) {
        return classes.filter(Boolean).join(" ");
    }
</script>

<span
    {...restProps}
    class={cn("scrambled-text-container", className)}
    use:attachWrapperRef
>
    {@render children?.()}
</span>

<style lang="sass">

.scrambled-text-container
	display: inline-block
	vertical-align: baseline
	color: var(--color-desb2)
	font-size: 0.8rem

</style>
