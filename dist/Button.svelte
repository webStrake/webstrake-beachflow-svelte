<script>import { createEventDispatcher } from "svelte";
export let type = "button";
export let variant = "default";
export let color = "primary";
export let size = "medium";
export let disabled = false;
export let loading = false;
export let icon = null;
export let iconPosition = "left";
export let fullWidth = false;
export let stopPropagation = false;
export let preventDefault = false;
export let once = false;
export let capture = false;
export let self = false;
export let trusted = false;
const dispatch = createEventDispatcher();
function handleClick(event) {
  dispatch("click", event);
}
</script>

<button
  {type}
  class="btn {color} {variant === 'outlined' ? 'outlined' : variant === 'flat' ? 'flat' : ''} {size} {loading ? 'loading' : ''}"
  class:disabled
  style={fullWidth ? 'width: 100%' : ''}
  on:click|stopPropagation={stopPropagation}
  on:click|preventDefault={preventDefault}
  on:click|once={once}
  on:click|capture={capture}
  on:click|self={self}
  on:click|trusted={trusted}
  on:click={handleClick}
  {disabled}
>
  {#if icon && iconPosition === 'left'}
    <span class="material-symbols-rounded mr-2">{icon}</span>
  {/if}
  
  <slot></slot>
  
  {#if icon && iconPosition === 'right'}
    <span class="material-symbols-rounded ml-2">{icon}</span>
  {/if}
</button> 