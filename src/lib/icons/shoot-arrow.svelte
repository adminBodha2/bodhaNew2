<script lang="ts">

	export let size = 24
	export let color = 'var(--primary)'
	export let goTime = false

</script>

<div class="hold xcenter ycenter column">
	<svg class="stay" width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M13.833 7.5V11.167H7.16699V24.833H20.833V18.167H24.5V26.667C24.4998 27.6793 23.6793 28.4998 22.667 28.5H5.33301C4.32076 28.4998 3.50018 27.6793 3.5 26.667V9.33301C3.50018 8.32075 4.32075 7.50018 5.33301 7.5H13.833Z" fill={color}/>
		</svg>		
		<svg class:goTime={goTime} class="go" width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M28.4995 3.5V17.207L27.646 16.3535L22.9409 11.6494L15.2964 19.2959L14.9429 19.6504L14.5894 19.2959L12.7036 17.4111L12.3501 17.0576L12.7036 16.7041L20.3491 9.05664L15.646 4.35352L14.7935 3.5H28.4995Z" fill={color}/>
			</svg>
</div>

<style lang="sass">

.hold
	position: relative

svg.stay
	position: absolute
	top: 0
	left: 0

svg.goTime
	animation: shootUp 0.76s forwards

@keyframes shootUp
	0%
		transform: translateY(0) translateX(0)
		opacity: 1
	50%
		transform: translateY(-10px) translateX(10px)
		opacity: 0.8
	100%
		transform: translateY(-20px) translateX(20px)
		opacity: 0


</style>