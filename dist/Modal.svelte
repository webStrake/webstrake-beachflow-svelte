<script>import { fade, fly } from "svelte/transition";
import { createEventDispatcher } from "svelte";
export let isOpen = false;
export let title = "";
export let closeOnClickOutside = true;
export let modalClass = "";
const dispatch = createEventDispatcher();
function close() {
  dispatch("close");
}
function handleKeydown(event) {
  if (event.key === "Escape") {
    close();
  }
}
function handleClickOutside(event) {
  if (closeOnClickOutside && event.target === event.currentTarget) {
    close();
  }
}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div 
    class="modal-backdrop"
    on:click={handleClickOutside} 
    transition:fade={{ duration: 200 }}
  >
    <div 
      class="modal-container {modalClass}"
      transition:fly={{ y: -50, duration: 300 }}
    >
      <div class="modal-header">
        <h2 class="modal-title">{title}</h2>
        <button 
          class="modal-close"
          on:click={close}
        >
          <span class="modal-close-icon"></span>
        </button>
      </div>
      <div class="modal-content">
        <slot></slot>
      </div>
      {#if $$slots.footer}
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      {/if}
    </div>
  </div>
{/if}