<script>import { createEventDispatcher } from "svelte";
export let text;
export let color = "primary";
export let outlined = false;
export let closable = false;
export let icon = null;
function handleClose() {
  dispatch("close");
}
const dispatch = createEventDispatcher();
</script>
  
  <div class="chip {color} {outlined ? 'outlined' : ''}">
    {#if icon}
      <span class="chip-icon material-symbols-rounded">{icon}</span>
    {/if}
    <span class="chip-text">{text}</span>
    {#if closable}
      <button class="chip-close" on:click={handleClose}>
        <span class="material-symbols-rounded">close</span>
      </button>
    {/if}
  </div>
  