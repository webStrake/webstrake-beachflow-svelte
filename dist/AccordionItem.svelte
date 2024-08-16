<script>import { getContext } from "svelte";
export let title = "";
const { openItem, toggle } = getContext("accordion");
const thisItem = {};
let isOpen;
openItem.subscribe((value) => {
  isOpen = value === thisItem;
});
function toggleItem(event) {
  event.preventDefault();
  toggle(thisItem);
}
</script>
  
  <details bind:open={isOpen}>
    <summary on:click={toggleItem}>
      {title}
    </summary>
    <div class="accordion-content">
      <slot></slot>
    </div>
  </details>