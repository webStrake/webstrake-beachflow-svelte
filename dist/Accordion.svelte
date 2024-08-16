<script>import { slide } from "svelte/transition";
export let items = [];
let openIndex = -1;
function toggleAccordion(index) {
  openIndex = openIndex === index ? -1 : index;
}
</script>

<div class="accordion">
  {#each items as item, index}
    <div class="accordion-item">
      <button
        class="accordion-header"
        on:click={() => toggleAccordion(index)}
        aria-expanded={openIndex === index}
      >
        {item.title}
        <span class="accordion-icon">
          {openIndex === index ? '▼' : '▶'}
        </span>
      </button>
      {#if openIndex === index}
        <div class="accordion-content" transition:slide={{ duration: 300 }}>
          {item.content}
        </div>
      {/if}
    </div>
  {/each}
</div>