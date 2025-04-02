<script>export let text = "";
export let color = "primary";
export let size = "md";
export let variant = "default";
export let square = false;
export let icon = null;
</script>

<div class="badge {size} {color} {variant !== 'default' ? variant : ''} {square ? 'square' : ''}">
  {#if icon}
    <span class="material-symbols-rounded mr-1 text-sm">{icon}</span>
  {/if}
  <slot>{text}</slot>
</div> 