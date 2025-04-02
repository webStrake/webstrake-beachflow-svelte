<script>import { createEventDispatcher, setContext } from "svelte";
import { writable } from "svelte/store";
export let color = "plain";
export let outlined = false;
export let activeItem = null;
export let items = [];
const dispatch = createEventDispatcher();
const activeButton = writable(activeItem);
setContext("buttonGroup", {
  activeButton,
  selectButton: (value) => {
    activeButton.set(value);
    activeItem = value;
    dispatch("change", { value });
  }
});
$: {
  activeButton.set(activeItem);
}
</script>

<div class="btn-group {color} {outlined ? 'outline' : ''}">
  {#if items.length > 0}
    {#each items as item}
      <button 
        type="button" 
        class="btn {$activeButton === item.value ? 'active' : ''}" 
        on:click={() => !item.disabled && activeButton.update(value => {
          const newValue = item.value;
          dispatch('change', { value: newValue });
          return newValue;
        })}
        disabled={item.disabled}
      >
        {item.label}
      </button>
    {/each}
  {:else}
    <slot></slot>
  {/if}
</div> 