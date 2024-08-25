<script>import { fade, fly } from "svelte/transition";
import { createEventDispatcher } from "svelte";
export let isOpen = false;
export let title = "";
export let closeOnClickOutside = true;
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
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
    on:click={handleClickOutside} 
    transition:fade={{ duration: 200 }}
  >
    <div 
      class="bg-white rounded-lg shadow-xl w-full max-w-4xl my-8 flex flex-col"
      transition:fly={{ y: -50, duration: 300 }}
    >
      <div class="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <h2 class="text-xl font-semibold text-gray-800">{title}</h2>
        <button 
          class="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
          on:click={close}
        >
          <span class="material-symbols-rounded text-2xl text-gray-500">close</span>
        </button>
      </div>
      <div class="flex-grow overflow-y-auto p-4 max-h-[calc(100vh-16rem)]">
        <slot></slot>
      </div>
      {#if $$slots.footer}
        <div class="border-t border-gray-200 p-4 sticky bottom-0 bg-white">
          <slot name="footer"></slot>
        </div>
      {/if}
    </div>
  </div>
{/if}