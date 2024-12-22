<script>import { fade, fly } from "svelte/transition";
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
      return "toast-top-left";
    case "top-right":
      return "toast-top-right";
    case "bottom-left":
      return "toast-bottom-left";
    case "bottom-right":
      return "toast-bottom-right";
    case "top-center":
      return "toast-top-center";
    case "bottom-center":
      return "toast-bottom-center";
    default:
      return "toast-bottom-center";
  }
}
function getTransitionParams(pos) {
  const y = pos.startsWith("top") ? -10 : 10;
  return {
    y,
    duration: 300,
    opacity: 0.5
  };
}
</script>

<div class="toast-container {getPositionClass(position)}">
  {#each visibleToasts as toast (toast.id)}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="toast {toast.type}"
      in:fly={getTransitionParams(position)}
      out:fade={{ duration: 200 }}
      on:click={() => close(toast.id)}
    >
      <span class="toast-icon {toast.type}"></span>
      <span class="toast-message">{toast.message}</span>
    </div>
  {/each}
</div>