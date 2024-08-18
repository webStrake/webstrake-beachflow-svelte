<script>import { createEventDispatcher } from "svelte";
import { slide } from "svelte/transition";
export let items = [];
export let isOpen = false;
export let position = "left";
const dispatch = createEventDispatcher();
function handleItemClick(value) {
  dispatch("select", { value });
  isOpen = false;
}
function handleClickOutside(event) {
  if (isOpen && !event.composedPath().some((el) => el instanceof Element && el.classList.contains("menu-container"))) {
    isOpen = false;
  }
}
</script>
  
  <svelte:window on:click={handleClickOutside} />
  
  <div class="menu-container">
    <slot name="trigger"></slot>
    
    {#if isOpen}
      <div 
        class="menu" 
        class:menu-right={position === 'right'}
        transition:slide={{ duration: 300 }}
      >
        {#each items as item}
          <button 
            class="menu-item" 
            on:click={() => handleItemClick(item.value)}
          >
            {#if item.icon}
              <span class="menu-item-icon">{item.icon}</span>
            {/if}
            <span class="menu-item-label">{item.label}</span>
          </button>
        {/each}
      </div>
    {/if}
  </div>