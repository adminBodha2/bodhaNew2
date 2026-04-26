<script lang="ts">

	import Container from '$lib/comps/container.svelte'
	import { nodes, edges } from '$lib/graph';

</script>

<Container narrow={true}>
	<div class="stdbox padded-ontop">
		<div class="row wrap cgap32 rgap32">
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c1"></div>
				<p class="small-text">color-primary<br>#070707</p>
			</div>
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c2"></div>
				<p class="small-text">color-alt-1<br>#FAFAFA</p>
			</div>
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c3"></div>
				<p class="small-text">color-alt-2<br>#Efefef</p>
			</div>
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c4"></div>
				<p class="small-text">color-alt-3<br>#f4f4f5</p>
			</div>
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c5"></div>
				<p class="small-text">color-alt-4<br>#F8FAFC</p>
			</div>
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c6"></div>
				<p class="small-text">color-grey-1<br>#d1d1d1</p>
			</div>
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c7"></div>
				<p class="small-text">color-grey-2<br>#a7a7a7</p>
			</div>
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c8"></div>
				<p class="small-text">color-grey-3<br>#878787</p>
			</div>
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c9"></div>
				<p class="small-text">color-grey-4<br>#474747</p>
			</div>
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c10"></div>
				<p class="small-text">color-back<br>#FFFFFF</p>
			</div>
		</div>
		<div class="row wrap cgap32 rgap32">
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c17"></div>
				<p class="small-text">color-stone<br>#F9F8F6</p>
			</div>
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c18"></div>
				<p class="small-text">color-stone-2<br>#F8F7F4</p>
			</div>
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c19"></div>
				<p class="small-text">color-stone-3<br>#FBFBF9</p>
			</div>
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c11"></div>
				<p class="small-text">color-theme<br>#1971c2</p>
			</div>
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c12"></div>
				<p class="small-text">color-theme-2<br>#054370</p>
			</div>
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c13"></div>
				<p class="small-text">color-theme-3<br>#014694</p>
			</div>
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c14"></div>
				<p class="small-text">color-theme-4<br>#4dabf7</p>
			</div>
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c15"></div>
				<p class="small-text">color-theme-5<br>#daf2fc</p>
			</div>
			<div class="labelbox xcenter ta-c mleft">
				<div class="col c16"></div>
				<p class="small-text">color-theme-6<br>#f3fafd</p>
			</div>
		</div>
	</div>
</Container>

<style lang="sass">

.col
	height: 32px
	width: 32px

.c1
	background: var(--color-primary)
.c2
	background: var(--color-alt-1)
.c3
	background: var(--color-alt-2)
.c4
	background: var(--color-alt-3)
.c5
	background: var(--color-alt-4)
.c6
	background: var(--color-grey-1)
.c7
	background: var(--color-grey-2)
.c8
	background: var(--color-grey-3)
.c9
	background: var(--color-grey-4)
.c10
	background: var(--color-back)
.c11
	background: var(--color-theme)
.c12
	background: var(--color-theme-2)
.c13
	background: var(--color-theme-3)
.c14
	background: var(--color-theme-4)
.c15
	background: var(--color-theme-5)
.c16
	background: var(--color-theme-6)
.c17
	background: var(--color-stone)
.c18
	background: var(--color-stone-2)
.c19
	background: var(--color-stone-3)

</style>