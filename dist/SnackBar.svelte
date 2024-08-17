<script>import { fade } from "svelte/transition";
import { createEventDispatcher } from "svelte";
export let type = "info";
export let message;
export let duration = 3e3;
const dispatch = createEventDispatcher();
let visible = true;
function close() {
  visible = false;
  dispatch("close");
}
if (duration > 0) {
  setTimeout(close, duration);
}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if visible}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="toast {type}"
    transition:fade={{ duration: 300 }}
    on:click={close}
  >
    <span class="toast-icon {type}"></span>
    <span class="toast-message">{message}</span>
  </div>
{/if}