<script>export let max = 3;
</script>

<div class="avatar-group">
  <slot></slot>
  {#if $$slots.overflow}
    <div class="avatar md flex items-center justify-center bg-gray-200 text-gray-700">
      <slot name="overflow"></slot>
    </div>
  {/if}
</div>  