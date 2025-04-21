<script>export let checked = false;
export let disabled = false;
export let color = "primary";
export let size = "md";
export let label = "";
function toggle() {
  if (!disabled) {
    checked = !checked;
  }
}
</script>
  
  <label class="switch-container {size} relative inline-flex items-center">
    <input
      type="checkbox"
      bind:checked
      {disabled}
      on:change
      class="switch-input sr-only"
    />
    <span class="switch-track {color} relative inline-block" class:checked class:disabled>
      <span class="switch-thumb absolute"></span>
    </span>
    {#if label}
      <span class="switch-label ml-2">{label}</span>
    {/if}
  </label>