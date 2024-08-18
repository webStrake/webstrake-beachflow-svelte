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
  
  <label class="switch-container {size}">
    <span class="switch-wrapper">
      <input
        type="checkbox"
        bind:checked
        {disabled}
        on:change
        class="switch-input"
      />
      <span class="switch-track {color}" class:checked class:disabled>
        <span class="switch-thumb"></span>
      </span>
    </span>
    {#if label}
      <span class="switch-label">{label}</span>
    {/if}
  </label>