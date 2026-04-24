import type { Snippet } from 'svelte';

export type SliderDirection = 'previous' | 'next';

export type SliderMobileConfig = {
  visibleSlides?: number;
  showPagination?: boolean;
  swipable?: boolean;
};

export type SliderNavigationState = {
  disabled: boolean;
  direction: SliderDirection;
  currentPage: number;
  totalPages: number;
};

export type SliderPaginationState = {
  page: number;
  isActive: boolean;
  totalPages: number;
};

export type SliderSlideState<T> = {
  item: T;
  index: number;
  isVisible: boolean;
  currentPage: number;
};

export type SliderProps<T> = {
  items: T[];
  visibleSlides?: number;
  mobile?: SliderMobileConfig;
  mobileBreakpoint?: number;
  showPagination?: boolean;
  gap?: number;
  ariaLabel?: string;
  className?: string;
  previousButton?: Snippet<[SliderNavigationState, () => void]>;
  nextButton?: Snippet<[SliderNavigationState, () => void]>;
  paginationItem?: Snippet<[SliderPaginationState, () => void]>;
  slide?: Snippet<[SliderSlideState<T>]>;
};
