<script>import { createEventDispatcher } from "svelte";
export let checked = false;
export let disabled = false;
export let color = "primary";
export let size = "md";
export let label = "";
export let required = false;
export let error = null;
export let labelPosition = "right";
export let name = "";
export let id = "";
export let showRequiredIndicator = true;
const dispatch = createEventDispatcher();
if (!id) {
  id = "switch-" + Math.random().toString(36).substring(7);
}
function toggle() {
  if (!disabled) {
    checked = !checked;
    dispatch("change", { checked });
  }
}
</script>
  
  <div class="switch-wrapper">
    <label 
      for={id}
      class="switch-container {size} {labelPosition} relative inline-flex items-center"
      class:disabled
    >
      <input
        {id}
        {name}
        type="checkbox"
        bind:checked
        {disabled}
        {required}
        on:change
        class="switch-input sr-only"
        aria-invalid={error ? 'true' : 'false'}
      />
      <span 
        class="switch-track {color} relative inline-block" 
        class:checked 
        class:disabled
        class:error={error !== null}
      >
        <span class="switch-thumb absolute"></span>
      </span>
      {#if label}
        <span class="switch-label">
          {label}
          {#if required && showRequiredIndicator}
            <span class="required-indicator">*</span>
          {/if}
        </span>
      {/if}
    </label>
    {#if error}
      <span class="switch-error">{error}</span>
    {/if}
  </div>