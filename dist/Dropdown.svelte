<script>import { createEventDispatcher } from "svelte";
export let options = [];
export let selected = "";
export let placeholder = "Select options";
export let searchable = false;
export let label = "";
export let loadMore = null;
export let multiple = false;
export let required = false;
export let error = null;
export let variant = null;
const dispatch = createEventDispatcher();
let selectElement;
let searchTerm = "";
let isLoading = false;
function handleChange(event) {
  const target = event.target;
  if (multiple) {
    selected = Array.from(target.selectedOptions).map((opt) => opt.value);
  } else {
    selected = target.value;
  }
  dispatch("change", { value: selected });
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
$: filteredOptions = searchable ? options.filter((opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase())) : options;
</script>

<div class="dropdown {variant || ''}" data-testid="dropdown">
  {#if label}
    <label 
      for="dropdown-select" 
      class="dropdown-label"
      class:error={error !== null}
    >
      {label}
    </label>
  {/if}

  {#if searchable}
    <input
      type="text"
      class="dropdown-search-input"
      placeholder="Search options..."
      bind:value={searchTerm}
    />
  {/if}

  <div class="select-wrapper">
    <select
      id="dropdown-select"
      class="dropdown-toggle"
      class:error={error !== null}
      bind:this={selectElement}
      {multiple}
      {required}
      on:change={handleChange}
      on:scroll={handleScroll}
      size={multiple ? 4 : 1}
    >
      {#if !multiple}
        <option value="" disabled selected={!selected}>
          {placeholder}
        </option>
      {/if}
      
      {#each filteredOptions as option}
        <option 
          value={option.value}
          selected={multiple ? selected?.includes(option.value) : selected === option.value}
        >
          {option.label}
        </option>
      {/each}
    </select>

    {#if !multiple}
      <span class="dropdown-icon material-symbols-rounded">
        expand_more
      </span>
    {/if}
  </div>

  {#if error}
    <span class="dropdown-error">{error}</span>
  {/if}

  {#if isLoading}
    <div class="dropdown-loading">Loading...</div>
  {/if}
</div>