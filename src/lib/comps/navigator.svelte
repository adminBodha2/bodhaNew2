<script lang="ts">

	export let text = 'button'
	export let link = '/'

</script>

<a class="cssbuttons-io-button" href={link}>
	{text}
  <div class="icon">
    <svg
      height="24"
      width="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path
        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
        fill="currentColor"
      ></path>
    </svg>
  </div>
</a>

<style lang="sass">

a.cssbuttons-io-button
	text-decoration: none
	background: var(--color-theme-dark)
	color: white
	font-family: "Google Sans", sans-serif
	padding: 2px
	padding-left: 16px
	font-size: 0.8rem
	font-weight: 500
	border-radius: 6px
	border: none
	display: flex
	align-items: center
	overflow: hidden
	position: relative
	padding-right: 36px
	cursor: pointer
	height: 26px
	.icon
		background: white
		margin-left: 16px
		position: absolute
		display: flex
		align-items: center
		justify-content: center
		height: 21px
		width: 21px
		border-radius: 4px
		right: 2px
		transition: all 0.26s cubic-bezier(0.250, 0.100, 0.250, 1.000)
		svg
			width: 14px
			transition: transform 0.3s
			color: var(--color-theme-dark)
	&:hover
		.icon
			width: calc(100% - 4px)
			svg
				transform: translateX(0.1em)
	&:active
		.icon
			transform: scale(0.95)

</style>