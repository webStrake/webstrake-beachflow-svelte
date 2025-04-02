<script>export let items = [];
export let separator = "/";
export let color = "default";
export let onClick = (item) => {
};
</script>

<nav aria-label="Breadcrumb">
  <ol class="breadcrumb {color !== 'default' ? color : ''}">
    {#each items as item, i}
      <li>
        {#if i > 0}
          <span class="breadcrumb-separator mx-1">{separator}</span>
        {/if}
        
        {#if item.href && !item.active}
          <a 
            href={item.href} 
            class="breadcrumb-item" 
            class:active={item.active}
            on:click|preventDefault={() => onClick(item)}
          >
            {item.label}
          </a>
        {:else}
          <span class="breadcrumb-item" class:active={item.active}>
            {item.label}
          </span>
        {/if}
      </li>
    {/each}
  </ol>
</nav> 