<svg width="32px" height="32px" stroke-width="1.4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"
	>
<path class="uppath up1" d="M6 3L6 21" stroke="#000000" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
<path class="uppath up2" d="M18 3L18 21" stroke="#000000" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
<path class="sidepath" d="M3 6L21 6" stroke="#000000" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
<path class="thispath"
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M9.6 9H14.4C14.7314 9 15 9.26863 15 9.6V14.4C15 14.7314 14.7314 15 14.4 15H9.6C9.26863 15 9 14.7314 9 14.4V9.6C9 9.26863 9.26863 9 9.6 9Z"
		fill="#000000"></path
	>
<path class="sidepath" d="M3 18L21 18" stroke="#000000" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>

<style lang="sass">

svg
	opacity: 0.85
	&:hover
		.thispath, .uppath
			animation-play-state: paused

.thispath
	transform-origin: center center
	animation: scalers 0.5s cubic-bezier(0.095, 0.895, 0.000, 0.995) infinite forwards

.uppath, .sidepath
	transform-origin: center center

.uppath
	animation: uppie infinite alternate

.up1
	animation-duration: 0.4s

.up2
	animation-duration: 0.3s

@keyframes uppie
	from
		transform: scaleY(1)
	to
		transform: scaleY(0.2)

@keyframes scalers
	0%
		transform: scale(1)
	25%
		transform: scale(1.2)
	50%
		transform: scale(1.1)
	75%
		transform: scale(0.9)
	100%
		transform: scale(1)

</style>
