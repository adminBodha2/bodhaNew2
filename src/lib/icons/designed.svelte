<svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.8" fill="none" xmlns="http://www.w3.org/2000/svg" color="#D7D7D7"
	>
	<path class="thepath1" d="M6 3H3V6" stroke="#4dabf7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
	<path class="thepath2" d="M18 3H21V6" stroke="#4dabf7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
	<path class="thepath3" d="M6 21H3V18" stroke="#4dabf7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
	<path class="thepath4"
		d="M18 21H21V18"
		stroke="#4dabf7"
		stroke-width="1.8"
		stroke-linecap="round"
		stroke-linejoin="round">
	</path>
	<path class="thepath5"
		d="M12.5145 17.6913L16.5145 15.2913C16.8157 15.1106 17 14.7851 17 14.4338V10.5662C17 10.2149 16.8157 9.88942 16.5145 9.7087L12.5145 7.3087C12.1978 7.11869 11.8022 7.11869 11.4855 7.3087L7.4855 9.7087C7.1843 9.88942 7 10.2149 7 10.5662V14.4338C7 14.7851 7.1843 15.1106 7.4855 15.2913L11.4855 17.6913C11.8022 17.8813 12.1978 17.8813 12.5145 17.6913Z"
		stroke="#D7D7D7"
		stroke-width="1.8"
		stroke-linecap="round"
		stroke-linejoin="round">
	</path>
	<path class="thepath6" d="M7.5 10.5L12 12.9995M12 12.9995C12 12.9995 15.7637 10.9492 16.5 10.5M12 12.9995V17.5" stroke="#D7D7D7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>

<style lang="sass">

svg
	.thepath1, .thepath2, .thepath3, .thepath4, .thepath5, .thepath6
		transition: all 0.2s ease
	.thepath5, .thepath6
		transform-origin: center center
	.thepath1
		animation: forOne 0.16s cubic-bezier(0.215, 0.610, 0.355, 1.000) infinite reverse
	.thepath2
		animation: forTwo 0.26s cubic-bezier(0.215, 0.610, 0.355, 1.000) infinite alternate-reverse
	.thepath3
		animation: forThree 0.1s cubic-bezier(0.500, 1.020, 0.945, -0.035) infinite forwards
	.thepath4
		animation: forFour 0.32s cubic-bezier(0.215, 0.610, 0.355, 1.000) infinite backwards
	&:hover
		.thepath1
			transform: translateY(4px) translateX(4px)
			opacity: 0
		.thepath2
			transform: translateY(4px) translateX(-4px)
			opacity: 0
		.thepath3
			transform: translateY(-4px) translateX(4px)
			opacity: 0
		.thepath4
			transform: translateY(-4px) translateX(-4px)
			opacity: 0
		.thepath5, .thepath6
			transform: scale(1.2)

@keyframes forOne
	0%
		transform: translateY(0) translateX(0)
	50%
		transform: translateY(2px) translateX(2px)
	100%
		transform: translateY(0) translateX(0)

@keyframes forTwo
	0%
		transform: translateY(0) translateX(0)
	50%
		transform: translateY(2px) translateX(-2px)
	100%
		transform: translateY(0) translateX(0)

@keyframes forThree
	0%
		transform: translateY(0) translateX(0)
	50%
		transform: translateY(-2px) translateX(2px)
	100%
		transform: translateY(0) translateX(0)

@keyframes forFour
	0%
		transform: translateY(0) translateX(0)
	50%
		transform: translateY(-2px) translateX(-2px)
	100%
		transform: translateY(0) translateX(0)

</style>
