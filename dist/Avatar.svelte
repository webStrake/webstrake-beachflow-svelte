<script>export let src = "";
export let alt = "";
export let size = "md";
export let squared = false;
export let ring = false;
export let ringColor = null;
export let online = false;
export let initials = "";
</script>

<div 
  class="avatar {size} {squared ? 'squared' : ''} {ring ? 'ring' : ''} {ringColor ? `ring-${ringColor}` : ''} {online ? 'online' : ''}"
>
  {#if src}
    <img 
      src={src}
      {alt}
      class="avatar-img"
    />
  {:else if initials}
    <div class="avatar-img flex items-center justify-center bg-gray-200 text-gray-700">
      {initials}
    </div>
  {:else}
    <div class="avatar-img flex items-center justify-center bg-gray-200">
      <span class="material-symbols-rounded">person</span>
    </div>
  {/if}
</div> 