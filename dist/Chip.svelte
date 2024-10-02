<script>import { createEventDispatcher } from "svelte";
export let text;
export let color = "primary";
export let outlined = false;
export let closable = false;
export let icon = null;
export let type = "chip";
export let disabled = false;
function handleClose() {
  dispatch("close");
}
function onClick() {
  dispatch("click");
}
const dispatch = createEventDispatcher();
</script>
  
{#if type==='chip'}
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
{:else if type==='button'}
<button class="chip {color} {outlined ? 'outlined' : ''}" class:disabled {disabled} on:click={onClick}>
  {#if icon}
    <span class="chip-icon material-symbols-rounded">{icon}</span>
  {/if}
  <span class="chip-text">{text}</span>
</button>
{/if}
  