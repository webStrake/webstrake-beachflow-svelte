<script>export let title = "";
export let type = "primary";
</script>
  
  <div class="info-block {type}">
    {#if title}
      <h4 class="info-block-title">{title}</h4>
    {/if}
    <div class="info-block-content">
      <slot></slot>
    </div>
  </div>