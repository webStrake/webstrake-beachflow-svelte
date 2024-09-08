<script>import { createEventDispatcher } from "svelte";
export let total;
export let perPage;
export let totalItems = null;
export let page;
export let limitOpts = [10, 25, 50, 100];
export let showCount = false;
const dispatch = createEventDispatcher();
$: pages = Math.ceil(total / perPage);
$: start = (page - 1) * perPage + 1;
$: end = Math.min(page * perPage, totalItems ?? total);
function getPages(cur, tot) {
  if (tot <= 5) return Array.from({ length: tot }, (_, i) => i + 1);
  if (cur <= 3) return [1, 2, 3, 4, 5];
  if (cur >= tot - 2) return [tot - 4, tot - 3, tot - 2, tot - 1, tot];
  return [cur - 2, cur - 1, cur, cur + 1, cur + 2];
}
$: visiblePages = getPages(page, pages);
function goTo(p) {
  if (p !== page && p >= 1 && p <= pages) {
    dispatch("change", { page: p });
  }
}
function changeLimit(event) {
  const newLimit = parseInt(event.target.value);
  dispatch("limitChange", { perPage: newLimit });
}
</script>

<nav class="pagination" aria-label="Pagination">
  <div class="pagination-left">
    <div class="item-limit-selector">
      <label for="itemLimit">Per page:</label>
      <select id="itemLimit" on:change={changeLimit} value={perPage}>
        {#each limitOpts as opt}
          <option value={opt}>{opt}</option>
        {/each}
      </select>
    </div>
  </div>

  {#if showCount}
    <div class="pagination-center">
      <span>Showing {start}-{end} of {totalItems ?? total} items</span>
    </div>
  {/if}

  <div class="pagination-right">
    <button
      class="pagination-item"
      on:click={() => goTo(1)}
      disabled={page === 1}
      aria-label="Go to first page"
    >
      <span class="material-symbols-rounded">first_page</span>
    </button>

    <button
      class="pagination-item"
      on:click={() => goTo(page - 1)}
      disabled={page === 1}
      aria-label="Go to previous page"
    >
      <span class="material-symbols-rounded">chevron_left</span>
    </button>

    {#each visiblePages as p}
      <button
        class="pagination-item"
        class:active={p === page}
        on:click={() => goTo(p)}
      >
        {p}
      </button>
    {/each}

    <button
      class="pagination-item"
      on:click={() => goTo(page + 1)}
      disabled={page === pages}
      aria-label="Go to next page"
    >
      <span class="material-symbols-rounded">chevron_right</span>
    </button>

    <button
      class="pagination-item"
      on:click={() => goTo(pages)}
      disabled={page === pages}
      aria-label="Go to last page"
    >
      <span class="material-symbols-rounded">last_page</span>
    </button>
  </div>
</nav>
