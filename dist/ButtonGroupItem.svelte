<script>import { getContext } from "svelte";
export let value;
export let disabled = false;
const { activeButton, selectButton } = getContext("buttonGroup");
function handleClick() {
  if (!disabled) {
    selectButton(value);
  }
}
</script>

<button 
  type="button"
  class="btn {$activeButton === value ? 'active' : ''}"
  on:click={handleClick}
  {disabled}
>
  <slot></slot>
</button> 