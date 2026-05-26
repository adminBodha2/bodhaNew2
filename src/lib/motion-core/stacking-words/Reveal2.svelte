<script lang="ts">
    import type { Snippet } from "svelte";
    import { cn } from "../utils/cn";

    interface Props {
        children?: Snippet;
        class?: string;
        start?: string;
        end?: string;
        scrub?: boolean | number;
        ease?: string;
        stagger?: number;
        scrollElement?: string | HTMLElement | null;
        [prop: string]: unknown;
    }

    let {
        children,
        class: className = "",
        start = "top 90%",
        end = "top 30%",
        scrub = 1,
        ease = "power3.out",
        stagger = 0.1,
        scrollElement,
        ...restProps
    }: Props = $props();

    let wrapperRef = $state<HTMLElement | null>(null);
    let splitInstanceLines: any = null;
    let splitInstanceWords: any = null;
    let lineTweens: any[] = [];

    const attachWrapperRef = (node: HTMLElement) => {
        wrapperRef = node;
        return () => {
            if (wrapperRef === node) {
                wrapperRef = null;
            }
        };
    };

    function killLineTweens() {
        lineTweens.forEach((tween) => tween.kill());
        lineTweens = [];
    }

    async function waitForLayout() {
        await document.fonts.ready;
        await new Promise<void>((resolve) =>
            requestAnimationFrame(() => resolve()),
        );
        await new Promise<void>((resolve) =>
            requestAnimationFrame(() => resolve()),
        );
    }

    $effect(() => {
        if (typeof window === "undefined") return;
        const node = wrapperRef;
        if (!node) return;
        const triggerStart = start;
        const triggerEnd = end;
        const triggerScrub = scrub;
        const lineEase = ease;
        const lineStagger = stagger;
        const resolvedScroller =
            typeof scrollElement === "string"
                ? document.querySelector<HTMLElement>(scrollElement)
                : scrollElement instanceof HTMLElement
                    ? scrollElement
                    : null;
        const triggerScroller =
            resolvedScroller instanceof HTMLElement ? resolvedScroller : window;

        let cancelled = false;
        let ctx: any = null;

        const init = async () => {
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            const { SplitText } = await import("gsap/SplitText");
            gsap.registerPlugin(ScrollTrigger, SplitText);

            await waitForLayout();
            if (cancelled) return;

            ctx?.revert();
            ctx = null;
            splitInstanceLines?.revert();
            splitInstanceWords?.revert();
            killLineTweens();

            ctx = gsap.context(() => {
                // 1. First split by lines to create the outer overflow-hidden wrappers
                splitInstanceLines = SplitText.create(node, {
                    aria: "hidden",
                    autoSplit: true,
                    linesClass: "reveal-mask",
                    tag: "span",
                    type: "lines",
                });

                // 2. Second split nested inside the first to get the actual text to animate
                splitInstanceWords = SplitText.create(splitInstanceLines.lines, {
                    linesClass: "reveal-content",
                    tag: "span",
                    type: "lines",
                    onSplit: (self: any) => {
                        killLineTweens();

                        const innerLines = (self.lines ?? []) as HTMLElement[];
                        
                        // Start the text shifted down out of its overflow-hidden mask
                        gsap.set(innerLines, { yPercent: 100 });

                        const tween = gsap.to(innerLines, {
                            ease: lineEase,
                            yPercent: 0,
                            stagger: lineStagger,
                            scrollTrigger: {
                                trigger: node,
                                start: triggerStart,
                                end: triggerEnd,
                                scrub: triggerScrub,
                                scroller: triggerScroller,
                                invalidateOnRefresh: true,
                            },
                        });
                        lineTweens.push(tween);

                        ScrollTrigger.refresh();
                    }
                });

                gsap.set(node, { autoAlpha: 1 });
            }, node);
        };

        void init();

        return () => {
            cancelled = true;
            ctx?.revert();
            ctx = null;
            killLineTweens();
            splitInstanceLines?.revert();
            splitInstanceWords?.revert();
            splitInstanceLines = null;
            splitInstanceWords = null;
        };
    });
</script>

<div
    {...restProps}
    class={cn("reveal-container", className)}
    {@attach attachWrapperRef}
>
    {@render children?.()}
</div>

<style>
    .reveal-container {
        visibility: hidden;
    }

    /* The outer container acts as a window boundary */
    .reveal-container :global(.reveal-mask) {
        display: block;
        overflow: hidden;
    }

    /* The inner text block that slides up */
    .reveal-container :global(.reveal-content) {
        display: block;
        will-change: transform;
    }
</style>
