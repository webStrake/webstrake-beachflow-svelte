<script>export let items = [];
let openIndex = -1;
function toggleAccordion(index) {
  if (openIndex === index) {
    openIndex = -1;
  } else {
    openIndex = index;
  }
}
</script>
  
  <div class="accordion">
    {#each items as item, index}
      <details
        open={openIndex === index}
        on:toggle={(event) => {
          if (event.target instanceof HTMLDetailsElement) {
            toggleAccordion(index);
          }
        }}
      >
        <summary>
          {item.title}
        </summary>
        <div class="accordion-content">
          {item.content}
        </div>
      </details>
    {/each}
  </div>