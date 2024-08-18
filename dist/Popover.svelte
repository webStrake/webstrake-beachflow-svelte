<script>import { createEventDispatcher, onMount } from "svelte";
export let position = "bottom";
export let open = false;
const dispatch = createEventDispatcher();
let popoverElement;
function togglePopover() {
  open = !open;
  dispatch("toggle", { open });
}
function handleOutsideClick(event) {
  if (open && popoverElement && !popoverElement.contains(event.target)) {
    open = false;
    dispatch("toggle", { open });
  }
}
onMount(() => {
  document.addEventListener("click", handleOutsideClick);
  return () => {
    document.removeEventListener("click", handleOutsideClick);
  };
});
</script>
  
  <div class="popover {position}" class:open bind:this={popoverElement}>
    <div class="popover-trigger" on:click={togglePopover}>
      <slot name="trigger"></slot>
    </div>
    {#if open}
      <div class="popover-content">
        <div class="popover-arrow"></div>
        <slot></slot>
      </div>
    {/if}
  </div>