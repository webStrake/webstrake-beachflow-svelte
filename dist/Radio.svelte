<script>export let value;
export let group;
export let disabled = false;
export let color = "primary";
function handleChange() {
  group = value;
}
</script>
  
  <label class="radio-container inline-flex items-center cursor-pointer">
    <input
      type="radio"
      {value}
      checked={group === value}
      on:change={handleChange}
      {disabled}
      class="radio-input sr-only"
    />
    <span class="radio-control {color} relative inline-block"></span>
    <span class="radio-label ml-2">
      <slot></slot>
    </span>
  </label>