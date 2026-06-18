<script lang="ts">
  let recipeName = $state<string>('');
  let recipeDerivation = $state<string>('');
  let recipeMeaning = $state<string>('');
  let recipeCiv = $state<string>('');

  function closeModal(): void {
    recipeName = '';
    recipeDerivation = '';
    recipeMeaning = '';
    recipeCiv = '';
  }
</script>

<div
	class="modal-overlay"
	role="presentation"
	onclick={(e) => {
		if ((e.target as HTMLElement).id === 'modal-overlay') {
			closeModal();
		}
	}}
	onkeydown={(e) => {
		if (e.key === 'Escape') {
			closeModal();
		}
	}}
>
  <div class="modal">
    <button class="close-btn" type="button" onclick={closeModal}>×</button>
    
    <div class="modal-content">
      <h2 class="modal-title">New Concept</h2>
      
      <div class="modal-body">
        <div class="concept-name">
          <p class="name-label">Concept Name</p>
          <p class="name-value">{recipeName}</p>
        </div>
        
        <div class="concept-derivation">
          <p class="derivation-label">Derivation</p>
          <p class="derivation-value">{recipeDerivation}</p>
        </div>
        
        <div class="concept-meaning">
          <p class="meaning-label">Meaning</p>
          <p class="meaning-value">{recipeMeaning}</p>
        </div>
        
        <div class="concept-civ">
          <p class="civ-label">Civilization Insight</p>
          <div class="civ-container">
            <p class="civ-text">{recipeCiv}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="sass">

.modal-overlay
	position: fixed
	inset: 0
	background: rgba(23, 23, 23, 0.7)
	display: flex
	align-items: center
	justify-content: center
	z-index: 200

.modal
	background: var(--surface-d-2)
	padding: 8px
	max-width: 480px
	width: 90%
	box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5)
	border-radius: 8px

.close-btn
	position: absolute
	top: 8px
	right: 8px
	background: transparent
	border: none
	color: var(--text-primary)
	font-size: 24px
	cursor: pointer
	opacity: 0.7
	transition: opacity 0.15s

	&:hover
		opacity: 1

.modal-content
	max-width: 480px
	margin: 0 auto

.modal-title
	font-size: 20px
	margin-bottom: 24px
	color: var(--accent)

.modal-body
	display: flex
	flex-direction: column
	gap: 16px

.concept-name, .concept-derivation, .concept-meaning, .concept-civ
	display: flex
	flex-direction: column
	gap: 8px

.name-label, .derivation-label, .meaning-label, .civ-label
	font-size: 12px
	color: var(--text-secondary)
	text-transform: uppercase
	letter-spacing: 1px

.name-value, .derivation-value, .meaning-value, .civ-text
	font-size: 14px
	line-height: 1.6
	color: var(--text-primary)

.civ-container
	background: var(--bg-light)
	padding: 12px
	border-radius: 4px
	font-size: 14px

</style>
