<script>import { flip } from "svelte/animate";
import { fade, fly } from "svelte/transition";
import { toast } from "./services/toast.service.js";
export let duration = 3e3;
export let max = 3;
function close(id) {
  toast.remove(id);
}
$: visibleToasts = $toast.slice(-max);
$: if (duration > 0) {
  visibleToasts.forEach((toast2) => {
    setTimeout(() => close(toast2.id), duration);
  });
}
</script>

<div class="toast-stack">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  {#each visibleToasts as toast (toast.id)}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="toast {toast.type}"
      transition:fly="{{ y: 20, duration: 300 }}"
      animate:flip="{{ duration: 300 }}"
      on:click={() => close(toast.id)}
    >
      <span class="toast-icon {toast.type}"></span>
      <span class="toast-message">{toast.message}</span>
    </div>
  {/each}
</div>
