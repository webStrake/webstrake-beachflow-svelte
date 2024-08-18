<script>import { slide } from "svelte/transition";
import { createEventDispatcher } from "svelte";
export let options = [];
export let selected = "";
export let placeholder = "Select an option";
export let searchable = false;
export let loadMore = null;
const dispatch = createEventDispatcher();
let isOpen = false;
let searchTerm = "";
let filteredOptions = options;
let isLoading = false;
$: {
  if (searchable) {
    filteredOptions = options.filter(
      (option) => option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    filteredOptions = options;
  }
}
function toggle() {
  isOpen = !isOpen;
  if (!isOpen) {
    searchTerm = "";
  }
}
function select(value) {
  selected = value;
  isOpen = false;
  dispatch("change", { value });
}
function handleClickOutside(event) {
  if (isOpen && !event.composedPath().some((el) => el instanceof Element && el.classList.contains("dropdown"))) {
    isOpen = false;
    searchTerm = "";
  }
}
async function handleScroll(e) {
  if (!loadMore) return;
  const target = e.target;
  if (target.scrollTop + target.clientHeight >= target.scrollHeight - 20) {
    if (!isLoading) {
      isLoading = true;
      await loadMore();
      isLoading = false;
    }
  }
}
$: selectedLabel = options.find((o) => o.value === selected)?.label || placeholder;
</script>
  
  <svelte:window on:click={handleClickOutside} />
  
  <div class="dropdown">
	<button 
	  type="button" 
	  class="dropdown-toggle" 
	  aria-haspopup="listbox" 
	  aria-expanded={isOpen} 
	  on:click={toggle}
	>
	  {selectedLabel}
	  <span class="dropdown-icon" aria-hidden="true">expand_more</span>
	</button>
	
	{#if isOpen}
	  <div class="dropdown-menu" role="listbox" transition:slide={{ duration: 300 }} on:scroll={handleScroll}>
		{#if searchable}
		  <div class="dropdown-search">
			<input 
			  type="text" 
			  placeholder="Search..." 
			  bind:value={searchTerm}
			  class="dropdown-search-input"
			/>
		  </div>
		{/if}
		<ul>
		  {#each filteredOptions as option}
			<li>
			  <button 
				type="button"
				class="dropdown-item" 
				class:selected={selected === option.value}
				role="option"
				aria-selected={selected === option.value}
				on:click={() => select(option.value)}
			  >
				{option.label}
			  </button>
			</li>
		  {/each}
		</ul>
		{#if isLoading}
		  <div class="dropdown-loading">Loading...</div>
		{/if}
	  </div>
	{/if}
  </div>