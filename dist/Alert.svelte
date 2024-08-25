<!-- Alert.svelte -->
<script>export let type = "info";
export let title = "";
export let description = "";
export let closable = false;
export let visible = true;
function closeAlert() {
  visible = false;
}
</script>
  
  {#if visible}
    <div class="alert {type}">
      <span class="alert-icon" />
      <div>
        {#if title}
          <h4 class="alert-title">{title}</h4>
        {/if}
        {#if description}
          <p class="alert-description">{description}</p>
        {/if}
        <slot />
      </div>
      {#if closable}
        <button class="alert-close" on:click={closeAlert}>
          <span class="material-symbols-rounded">close</span>
        </button>
      {/if}
    </div>
  {/if}