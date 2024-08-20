<script>import { flip } from "svelte/animate";
import { fade, fly } from "svelte/transition";
import { toast } from "./services/toast.service.js";
export let duration = 3e3;
export let max = 3;
export let position = "bottom-center";
function close(id) {
  toast.remove(id);
}
$: visibleToasts = $toast.slice(-max);
$: if (duration > 0) {
  visibleToasts.forEach((toast2) => {
    setTimeout(() => close(toast2.id), duration);
  });
}
function getPositionClass(pos) {
  switch (pos) {
    case "top-left":
      return "top-4 left-4";
    case "top-right":
      return "top-4 right-4";
    case "bottom-left":
      return "bottom-4 left-4";
    case "bottom-right":
      return "bottom-4 right-4";
    case "top-center":
      return "top-4 left-1/2 -translate-x-1/2";
    case "bottom-center":
      return "bottom-4 left-1/2 -translate-x-1/2";
    default:
      return "bottom-4 left-1/2 -translate-x-1/2";
  }
}
function getFlightDirection(pos) {
  if (pos.startsWith("top")) return { y: -20 };
  if (pos.startsWith("bottom")) return { y: 20 };
  return { x: pos.endsWith("left") ? -20 : 20 };
}
</script>

<div class="toast-stack {getPositionClass(position)}">
  {#each visibleToasts as toast (toast.id)}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="toast {toast.type}"
      transition:fly="{{ ...getFlightDirection(position), duration: 300 }}"
      animate:flip="{{ duration: 300 }}"
      on:click={() => close(toast.id)}
    >
      <span class="toast-icon {toast.type}"></span>
      <span class="toast-message">{toast.message}</span>
    </div>
  {/each}
</div>
