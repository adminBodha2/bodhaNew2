<script lang="ts">

	import { onDestroy, onMount, tick } from 'svelte';
	import { browser } from '$app/environment';
	import Full from '$lib/icons/vid/full.svelte';
	import FullX from '$lib/icons/vid/full-x.svelte';
	import Mute from '$lib/icons/vid/mute.svelte';
	import Pause from '$lib/icons/vid/pause.svelte';
	import Play from '$lib/icons/vid/play.svelte';
	import Unmute from '$lib/icons/vid/unmute.svelte';

	type PlayerState = -1 | 0 | 1 | 2 | 3 | 5;

	type YouTubePlayer = {
		playVideo: () => void;
		pauseVideo: () => void;
		mute: () => void;
		unMute: () => void;
		isMuted: () => boolean;
		seekTo: (seconds: number, allowSeekAhead: boolean) => void;
		getCurrentTime: () => number;
		getDuration: () => number;
		getPlayerState: () => PlayerState;
		destroy: () => void;
	};

	type YouTubeConstructor = new (
		element: HTMLElement,
		options: {
			videoId: string;
			host?: string;
			width?: string;
			height?: string;
			playerVars?: Record<string, string | number>;
			events?: {
				onReady?: () => void;
				onStateChange?: (event: { data: PlayerState }) => void;
				onError?: () => void;
				onAutoplayBlocked?: () => void;
			};
		}
	) => YouTubePlayer;

	type YouTubeWindow = Window & {
		YT?: {
			Player: YouTubeConstructor;
		};
		onYouTubeIframeAPIReady?: () => void;
		__bodhaYouTubeApiReady?: Promise<void>;
		__bodhaResolveYouTubeApiReady?: () => void;
	};

	interface Props {
		src?: string;
		videoId?: string;
		title?: string;
		autoplay?: boolean;
		muted?: boolean;
		loop?: boolean;
		hideControls?: boolean;
		lazy?: boolean;
		lazyRootMargin?: string;
		aspectRatio?: string;
		class?: string;
	}

	let {
		src = '',
		videoId = '',
		title = 'YouTube video',
		autoplay = false,
		muted = false,
		loop = false,
		hideControls = false,
		lazy = true,
		lazyRootMargin = '300px',
		aspectRatio = '16 / 9',
		class: className = ''
	}: Props = $props();

	let containerRef = $state<HTMLDivElement>();
	let playerMountRef = $state<HTMLDivElement>();
	let player: YouTubePlayer | null = null;
	let pollId: ReturnType<typeof setInterval> | null = null;
	let observer: IntersectionObserver | null = null;
	let isCreatingPlayer = false;

	let isReady = $state(false);
	let isPlaying = $state(false);
	let isMuted = $state(false);
	let isHovered = $state(false);
	let isFullscreen = $state(false);
	let shouldLoadPlayer = $state(false);
	let currentTime = $state(0);
	let duration = $state(0);
	let seekPercent = $state(0);
	let isSeeking = $state(false);
	let hasError = $state(false);
	let posterSrc = $state('');

	let resolvedVideoId = $derived(videoId || extractYouTubeId(src));
	let showPoster = $derived(!!resolvedVideoId && !isReady);
	let currentTimeStr = $derived(formatTime(currentTime));
	let durationStr = $derived(formatTime(duration));
	let progressPercent = $derived(duration > 0 ? (currentTime / duration) * 100 : 0);

	function extractYouTubeId(value: string) {
		if (!value) return '';

		if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;

		try {
			const url = new URL(value);

			if (url.hostname.includes('youtu.be')) {
				return url.pathname.split('/').filter(Boolean)[0] ?? '';
			}

			if (url.hostname.includes('youtube.com') || url.hostname.includes('youtube-nocookie.com')) {
				if (url.pathname.startsWith('/embed/')) {
					return url.pathname.split('/').filter(Boolean)[1] ?? '';
				}

				if (url.pathname.startsWith('/shorts/')) {
					return url.pathname.split('/').filter(Boolean)[1] ?? '';
				}

				return url.searchParams.get('v') ?? '';
			}
		} catch {
			return '';
		}

		return '';
	}

	function posterUrl(quality: 'maxresdefault' | 'hqdefault') {
		if (!resolvedVideoId) return '';
		return `https://img.youtube.com/vi/${resolvedVideoId}/${quality}.jpg`;
	}

	function formatTime(seconds: number) {
		if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	function loadYouTubeApi() {
		const ytWindow = window as YouTubeWindow;

		if (ytWindow.YT?.Player) return Promise.resolve();
		if (ytWindow.__bodhaYouTubeApiReady) return ytWindow.__bodhaYouTubeApiReady;

		ytWindow.__bodhaYouTubeApiReady = new Promise<void>((resolve) => {
			const previousReady = ytWindow.onYouTubeIframeAPIReady;

			ytWindow.__bodhaResolveYouTubeApiReady = resolve;
			ytWindow.onYouTubeIframeAPIReady = () => {
				previousReady?.();
				resolve();
			};

			const existingScript = document.querySelector<HTMLScriptElement>(
				'script[src="https://www.youtube.com/iframe_api"]'
			);

			if (existingScript) return;

			const script = document.createElement('script');
			script.src = 'https://www.youtube.com/iframe_api';
			script.async = true;
			document.head.appendChild(script);
		});

		return ytWindow.__bodhaYouTubeApiReady;
	}

	function startPolling() {
		stopPolling();

		pollId = setInterval(() => {
			if (!player || isSeeking) return;

			currentTime = player.getCurrentTime() || 0;
			duration = player.getDuration() || 0;
			seekPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
			isMuted = player.isMuted();
		}, 250);
	}

	function stopPolling() {
		if (!pollId) return;
		clearInterval(pollId);
		pollId = null;
	}

	function syncState(state: PlayerState) {
		isPlaying = state === 1;

		if (state === 0 && loop && player && resolvedVideoId) {
			player.seekTo(0, true);
			player.playVideo();
		}
	}

	function togglePlay() {
		if (!player || !isReady) return;

		if (isPlaying) {
			player.pauseVideo();
		} else {
			player.playVideo();
		}
	}

	function toggleMute() {
		if (!player || !isReady) return;

		if (isMuted) {
			player.unMute();
			isMuted = false;
		} else {
			player.mute();
			isMuted = true;
		}
	}

	function handleSeekInput(event: Event) {
		if (!player || duration <= 0) return;

		isSeeking = true;
		const target = event.currentTarget as HTMLInputElement;
		seekPercent = Number(target.value);
		currentTime = (seekPercent / 100) * duration;
	}

	function commitSeek() {
		if (!player || duration <= 0) return;

		player.seekTo((seekPercent / 100) * duration, true);
		isSeeking = false;
	}

	async function toggleFullscreen() {
		if (!containerRef) return;

		if (document.fullscreenElement) {
			await document.exitFullscreen();
		} else {
			await containerRef.requestFullscreen();
		}
	}

	function handleFullscreenChange() {
		if (!browser) return;
		isFullscreen = document.fullscreenElement === containerRef;
	}

	async function ensurePlayer(playWhenReady = false) {
		if (player || isCreatingPlayer || !resolvedVideoId) {
			if (playWhenReady) player?.playVideo();
			return;
		}

		if (!resolvedVideoId || !playerMountRef) {
			shouldLoadPlayer = true;
			await tick();
		}

		if (!playerMountRef) {
			hasError = true;
			return;
		}

		isCreatingPlayer = true;
		await loadYouTubeApi();

		const ytWindow = window as YouTubeWindow;

		player = new ytWindow.YT!.Player(playerMountRef, {
			videoId: resolvedVideoId,
			host: 'https://www.youtube-nocookie.com',
			width: '100%',
			height: '100%',
			playerVars: {
				autoplay: autoplay ? 1 : 0,
				controls: hideControls ? 0 : 0,
				disablekb: 1,
				fs: 0,
				iv_load_policy: 3,
				loop: loop ? 1 : 0,
				playsinline: 1,
				playlist: loop ? resolvedVideoId : '',
				rel: 0
			},
			events: {
				onReady: () => {
					isReady = true;
					isCreatingPlayer = false;
					hasError = false;

					if (muted) player?.mute();
					if (autoplay || playWhenReady) player?.playVideo();

					duration = player?.getDuration() || 0;
					startPolling();
				},
				onStateChange: (event) => syncState(event.data),
				onError: () => {
					hasError = true;
					isReady = false;
					isCreatingPlayer = false;
				},
				onAutoplayBlocked: () => {
					isPlaying = false;
				}
			}
		});
	}

	function handlePosterError() {
		if (posterSrc !== posterUrl('hqdefault')) {
			posterSrc = posterUrl('hqdefault');
		}
	}

	onMount(() => {
		isMuted = muted;
		posterSrc = posterUrl('maxresdefault');

		document.addEventListener('fullscreenchange', handleFullscreenChange);

		if (!resolvedVideoId) {
			hasError = true;
			return;
		}

		if (!lazy) {
			shouldLoadPlayer = true;
			void tick().then(() => ensurePlayer(false));
			return;
		}

		if (!containerRef || !('IntersectionObserver' in window)) {
			shouldLoadPlayer = true;
			void tick().then(() => ensurePlayer(false));
			return;
		}

		observer = new IntersectionObserver(
			(entries) => {
				if (!entries.some((entry) => entry.isIntersecting)) return;

				observer?.disconnect();
				observer = null;
				shouldLoadPlayer = true;
				void tick().then(() => ensurePlayer(false));
			},
			{ rootMargin: lazyRootMargin }
		);

		observer.observe(containerRef);
	});

	onDestroy(() => {
		stopPolling();
		observer?.disconnect();
		if (browser) {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
		}
		player?.destroy();
		player = null;
	});
</script>

<div
	bind:this={containerRef}
	class={`custom-video-player ${className}`}
	style={`aspect-ratio: ${aspectRatio};`}
	role="region"
	aria-label={title}
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
>
	{#if resolvedVideoId}
		{#if shouldLoadPlayer}
			<div bind:this={playerMountRef} class="custom-video-player__frame" title={title}></div>
		{/if}

		{#if showPoster}
			<img
				class="custom-video-player__poster"
				src={posterSrc}
				alt={title}
				loading="lazy"
				onerror={handlePosterError}
			/>
			<div class="custom-video-player__poster-shade"></div>
		{/if}
	{:else}
		<div class="custom-video-player__message">Invalid YouTube link</div>
	{/if}

	<button
		class="custom-video-player__hit-area"
		type="button"
		aria-label={isPlaying ? 'Pause video' : 'Play video'}
		onclick={() => (player ? togglePlay() : ensurePlayer(true))}
	>
		{#if showPoster}
			<span class="custom-video-player__poster-play">
				<Play />
			</span>
		{/if}
	</button>

	{#if hasError}
		<div class="custom-video-player__message">Video unavailable</div>
	{/if}

	{#if !hideControls}
		<div class:show={isHovered || !isPlaying} class="custom-video-player__controls">
			<button
				type="button"
				class="custom-video-player__button"
				aria-label={isPlaying ? 'Pause video' : 'Play video'}
				onclick={() => (player ? togglePlay() : ensurePlayer(true))}
			>
				{#if isPlaying}
					<Pause />
				{:else}
					<Play />
				{/if}
			</button>
			<input
				class="custom-video-player__range"
				type="range"
				min="0"
				max="100"
				step="0.1"
				value={isSeeking ? seekPercent : progressPercent}
				aria-label="Video timeline"
				oninput={handleSeekInput}
				onchange={commitSeek}
				onpointerup={commitSeek}
			/>
			<div class="custom-video-player__time">{currentTimeStr} / {durationStr}</div>
			<button
				type="button"
				class="custom-video-player__button"
				aria-label={isMuted ? 'Unmute video' : 'Mute video'}
				onclick={toggleMute}
			>
				{#if isMuted}
					<Mute />
				{:else}
					<Unmute />
				{/if}
			</button>
			<button
				type="button"
				class="custom-video-player__button"
				aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
				onclick={toggleFullscreen}
			>
				{#if isFullscreen}
					<FullX />
				{:else}
					<Full />
				{/if}
			</button>
		</div>
	{/if}
</div>

<style lang="sass">
	.custom-video-player
		position: relative
		width: 100%
		overflow: hidden
		background: var(--color-back)

	.custom-video-player__poster,
	.custom-video-player__frame
		position: absolute
		inset: 0
		width: 100%
		height: 100%

	.custom-video-player__poster
		z-index: 1
		object-fit: cover

	.custom-video-player__poster-shade
		position: absolute
		inset: 0
		z-index: 1
		background: linear-gradient(to top, rgba(0, 0, 0, 0.46), rgba(0, 0, 0, 0.1))

	.custom-video-player__frame
		pointer-events: none

	.custom-video-player__frame :global(iframe)
		width: 100%
		height: 100%

	.custom-video-player__hit-area
		position: absolute
		inset: 0
		z-index: 2
		border: 0
		background: transparent
		cursor: pointer

	.custom-video-player__poster-play
		position: absolute
		top: 50%
		left: 50%
		display: flex
		align-items: center
		justify-content: center
		width: 4.25rem
		height: 4.25rem
		border-radius: 999px
		background: rgba(0, 0, 0, 0.38)
		backdrop-filter: blur(12px)
		transform: translate(-50%, -50%)
		transition: transform 160ms ease, background 160ms ease
		:global(svg)
			width: 2.75rem
			height: 2.75rem

	.custom-video-player__hit-area:hover .custom-video-player__poster-play
		background: rgba(0, 0, 0, 0.54)
		transform: translate(-50%, -50%) scale(1.04)

	.custom-video-player__controls
		position: absolute
		right: 0
		bottom: 0
		left: 0
		z-index: 3
		display: flex
		align-items: center
		gap: 0.75rem
		padding: 3rem 1rem 1rem
		background: linear-gradient(to top, rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.36), rgba(0, 0, 0, 0))
		color: white
		opacity: 0
		transform: translateY(0.75rem)
		pointer-events: none
		transition: opacity 180ms ease, transform 180ms ease
		&.show
			opacity: 1
			transform: translateY(0)
			pointer-events: auto

	.custom-video-player__button
		position: relative
		z-index: 4
		display: inline-flex
		align-items: center
		justify-content: center
		width: 2.25rem
		height: 2rem
		border: none
		border-radius: 999px
		background: none
		color: white
		font-size: 0.72rem
		font-weight: 600
		cursor: pointer
		transition: background 140ms ease, transform 140ms ease
		&:hover
			background: rgba(255, 255, 255, 0.2)
		&:active
			transform: scale(0.96)
		:global(svg)
			width: 1.35rem
			height: 1.35rem

	.custom-video-player__range
		position: relative
		z-index: 4
		flex: 1
		min-width: 4rem
		accent-color: white
		cursor: pointer

	.custom-video-player__time
		position: relative
		z-index: 4
		min-width: 5.5rem
		font-family: monospace
		font-size: 0.72rem
		font-weight: 600
		color: rgba(255, 255, 255, 0.82)
		white-space: nowrap

	.custom-video-player__message
		position: absolute
		inset: 0
		z-index: 5
		display: flex
		align-items: center
		justify-content: center
		padding: 1rem
		background: #050505
		color: rgba(255, 255, 255, 0.78)
		font-size: 0.9rem
		text-align: center

	@media screen and (max-width: 640px)
		.custom-video-player__controls
			gap: 0.5rem
			padding: 2.5rem 0.75rem 0.75rem
		.custom-video-player__button
			width: 2rem
			font-size: 0.66rem
		.custom-video-player__time
			display: none
</style>
