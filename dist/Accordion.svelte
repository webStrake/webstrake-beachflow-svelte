<script>import { setContext } from "svelte";
import { writable } from "svelte/store";
const openItem = writable(null);
setContext("accordion", {
  openItem,
  toggle: (item) => {
    openItem.update((current) => current === item ? null : item);
  }
});
</script>

<div class="accordion">
  <slot></slot>
</div>