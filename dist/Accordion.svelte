<script>export let items = [];
let openIndex = null;
function toggleItem(index) {
  openIndex = openIndex === index ? null : index;
}
</script>

<div class="accordion">
  {#each items as item, index}
    <div class="accordion-item">
      <details
        open={openIndex === index}
        on:toggle={(event) => {
          if (event.target instanceof HTMLDetailsElement && event.target.open) {
            toggleItem(index);
          }
        }}
      >
        <summary on:click|preventDefault={() => toggleItem(index)}>
          {item.title}
        </summary>
        <div class="accordion-content">
          {item.content}
        </div>
      </details>
    </div>
  {/each}
</div>