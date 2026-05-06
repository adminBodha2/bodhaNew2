// size.svelte.ts
export function useSize() {
  // we use $state for the width and height to make them reactive
  let width = $state(0);
  let height = $state(0);
  // this is the action function we attach to an element via use:
  const watch = (node: HTMLElement) => {
    // 1. initialize the native resizeobserver
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // 2. update our $state runes whenever the browser detects a change
        // contentrect provides the width/height of the content box
        width = entry.contentRect.width;
        height = entry.contentRect.height;
      }
    });
    // 3. tell the observer to start watching this specific node
    observer.observe(node);
    // 4. cleanup: disconnect when the element is removed from the dom
    return {
      destroy: () => observer.disconnect()
    };
  };
  return {
    get width() { return width; },
    get height() { return height; },
    watch
  };
}