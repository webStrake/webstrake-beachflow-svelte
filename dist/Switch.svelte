<script>export let checked = false;
export let disabled = false;
export let color = "primary";
export let size = "md";
export let label = "";
export let labelPosition = "right";
export let name = "";
export let required = false;
export let error = null;
const id = `switch-${Math.random().toString(36).substring(2, 9)}`;
function toggle() {
  if (!disabled) {
    checked = !checked;
  }
}
</script>

<div class="switch-wrapper">
  <label 
    for={id} 
    class="switch-container {size} {labelPosition}" 
    class:disabled
  >
    <input
      {id}
      type="checkbox"
      bind:checked
      {disabled}
      {name}
      {required}
      on:change
      class="switch-input sr-only"
    />
    <span 
      class="switch-track {color}" 
      class:checked 
      class:disabled
      aria-hidden="true"
    >
      <span class="switch-thumb absolute"></span>
    </span>
    {#if label}
      <span class="switch-label">{label}</span>
    {/if}
  </label>
  
  {#if error}
    <span class="switch-error">{error}</span>
  {/if}
</div>