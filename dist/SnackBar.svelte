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
function getTransitionParams(pos) {
  const y = pos.startsWith("top") ? -10 : 10;
  return {
    y,
    duration: 300,
    opacity: 0.5
  };
}
</script>

<div class="toast-stack {getPositionClass(position)}">
  {#each visibleToasts as toast (toast.id)}
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

<style>
  .toast-stack {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    max-width: 400px;
    width: 100%;
    z-index: 9999;
  }

  .toast {
    width: 100%;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .toast-icon {
    margin-right: 0.5rem;
  }

</style>