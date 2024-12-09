<script>import { onMount, onDestroy, tick } from "svelte";
export let columnWidth = 300;
export let gap = 16;
export let items = [];
export let animate = true;
let container;
let columns = 1;
let columnHeights = [];
let positions = [];
let resizeObserver;
let itemRefs = [];
let isCalculating = false;
let layoutTimeout;
const calculateLayout = async () => {
  if (isCalculating) return;
  isCalculating = true;
  await tick();
  if (!container || !itemRefs.length) {
    isCalculating = false;
    return;
  }
  const containerWidth = container.offsetWidth;
  const newColumns = Math.max(1, Math.floor(containerWidth / columnWidth));
  if (columns !== newColumns) {
    columns = newColumns;
    columnHeights = new Array(columns).fill(0);
  }
  columnHeights = new Array(columns).fill(0);
  positions = new Array(itemRefs.length);
  const itemHeights = itemRefs.map((item) => item?.offsetHeight || 0);
  itemRefs.forEach((item, index) => {
    if (!item) return;
    const itemHeight = itemHeights[index];
    const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
    positions[index] = {
      top: columnHeights[shortestColumn],
      left: shortestColumn * (columnWidth + gap),
      height: itemHeight
    };
    columnHeights[shortestColumn] += itemHeight + gap;
  });
  requestAnimationFrame(() => {
    container.style.height = `${Math.max(...columnHeights)}px`;
    isCalculating = false;
  });
};
const debouncedResize = () => {
  clearTimeout(layoutTimeout);
  layoutTimeout = setTimeout(calculateLayout, 100);
};
onMount(() => {
  resizeObserver = new ResizeObserver(debouncedResize);
  if (container) {
    resizeObserver.observe(container);
  }
  calculateLayout();
});
onDestroy(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  clearTimeout(layoutTimeout);
});
$: if (items) {
  clearTimeout(layoutTimeout);
  layoutTimeout = setTimeout(() => tick().then(calculateLayout), 50);
}
</script>

<div
  bind:this={container}
  class="masonry-container"
  style="--column-width: {columnWidth}px; --gap: {gap}px;"
>
  {#each items as item, i (item.id)}
    <div
      bind:this={itemRefs[i]}
      class="masonry-item"
      style="
		  transform: translate({positions[i]?.left || 0}px, {positions[i]?.top || 0}px);
		  width: {columnWidth}px;
		  {animate ? 'transition: transform 0.3s ease-out' : ''}
		"
    >
      <slot {item} index={i}>
        <!-- Default slot content -->
        {item}
      </slot>
    </div>
  {/each}
</div>

<style>
  .masonry-container {
    position: relative;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    contain: content;
  }

  .masonry-item {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    will-change: transform;
    contain: content;
  }

  /* For Safari support */
  @supports (-webkit-overflow-scrolling: touch) {
    .masonry-item {
      transform: translate3d(0, 0, 0);
    }
  }
</style>
