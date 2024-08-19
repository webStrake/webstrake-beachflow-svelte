<script>export let value;
export let group;
export let disabled = false;
export let color = "primary";
function handleChange() {
  group = value;
}
</script>

<label class="radio-container">
  <input
    type="radio"
    {value}
    checked={group === value}
    on:change={handleChange}
    {disabled}
    class="radio-input"
  />
  <span class="radio-control {color}"></span>
  <span class="radio-label">
    <slot></slot>
  </span>
</label>