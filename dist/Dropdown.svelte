<script>import { slide } from "svelte/transition";
import { createEventDispatcher } from "svelte";
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
let isOpen = false;
let searchTerm = "";
let filteredOptions = options;
let isLoading = false;
let nativeSelect;
let optionsContainer;
let searchInput;
$: {
  if (searchable) {
    filteredOptions = options.filter(
      (option) => option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    filteredOptions = options;
  }
}
function syncNativeSelect(value) {
  if (!nativeSelect) return;
  if (multiple) {
    Array.from(nativeSelect.options).forEach((option) => {
      option.selected = value?.includes(option.value);
    });
  } else {
    nativeSelect.value = value || "";
  }
}
function toggle() {
  isOpen = !isOpen;
  if (!isOpen) {
    searchTerm = "";
  } else if (searchable && searchInput) {
    setTimeout(() => searchInput.focus(), 0);
  }
}
function handleSelect(value) {
  if (multiple) {
    const values = Array.isArray(selected) ? [...selected] : [];
    const index = values.indexOf(value);
    if (index === -1) {
      values.push(value);
    } else {
      values.splice(index, 1);
    }
    selected = values;
  } else {
    selected = value;
    isOpen = false;
  }
  syncNativeSelect(selected);
  dispatch("change", { value: selected });
  nativeSelect.dispatchEvent(new Event("change"));
}
function handleNativeChange(event) {
  const target = event.target;
  if (multiple) {
    selected = Array.from(target.selectedOptions).map((opt) => opt.value);
  } else {
    selected = target.value;
  }
  dispatch("change", { value: selected });
}
function handleClickOutside(event) {
  if (isOpen && !event.composedPath().some((el) => el instanceof Element && el.classList.contains("dropdown"))) {
    isOpen = false;
    searchTerm = "";
  }
}
function handleKeydown(event) {
  if (!isOpen) {
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      toggle();
    }
    return;
  }
  if (event.key === "Escape") {
    isOpen = false;
    searchTerm = "";
    return;
  }
  nativeSelect.focus();
  nativeSelect.dispatchEvent(new KeyboardEvent("keydown", event));
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
$: selectedValues = Array.isArray(selected) ? selected : [selected].filter(Boolean);
$: selectedLabels = options.filter((o) => selectedValues.includes(o.value)).map((o) => o.label);
$: displayValue = selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder;
</script>

<svelte:window on:click={handleClickOutside} />

<div class="dropdown {variant || ''}" data-testid="dropdown">
  {#if label}
    <label 
      for="native-select" 
      class="dropdown-label"
      class:error={error !== null}
    >
      {label}
    </label>
  {/if}

  <!-- Custom UI -->
  <button
    type="button"
    class="dropdown-toggle"
    class:error={error !== null}
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    on:click={toggle}
    on:keydown={handleKeydown}
  >
    <span class="dropdown-text">{displayValue}</span>
    <span class="dropdown-icon material-symbols-rounded">
      expand_more
    </span>
  </button>

  {#if error}
    <span class="dropdown-error">{error}</span>
  {/if}

  {#if isOpen}
    <div 
      class="dropdown-menu" 
      role="listbox"
      bind:this={optionsContainer}
      transition:slide={{ duration: 300 }}
      on:scroll={handleScroll}
    >
      {#if searchable}
        <div class="dropdown-search">
          <input
            type="text"
            class="dropdown-search-input"
            placeholder="Search..."
            bind:value={searchTerm}
            bind:this={searchInput}
          />
        </div>
      {/if}

      <div class="dropdown-options">
        {#each filteredOptions as option}
          <option
            class="dropdown-item"
            class:selected={selectedValues.includes(option.value)}
            role="option"
            aria-selected={selectedValues.includes(option.value)}
            on:click={() => handleSelect(option.value)}
          >
            {option.label}
            {#if multiple && selectedValues.includes(option.value)}
              <span class="dropdown-checkmark material-symbols-rounded">
                check
              </span>
            {/if}
          </option>
        {/each}

        {#if filteredOptions.length === 0}
          <div class="dropdown-empty">No options found</div>
        {/if}
      </div>

      {#if isLoading}
        <div class="dropdown-loading">Loading...</div>
      {/if}
    </div>
  {/if}

  <!-- Hidden native select for form submission and keyboard navigation -->
  <select
    id="native-select"
    bind:this={nativeSelect}
    {multiple}
    {required}
    class="sr-only"
    on:change={handleNativeChange}
  >
    {#if !multiple}
      <option value="" disabled selected={!selected}>
        {placeholder}
      </option>
    {/if}
    
    {#each options as option}
      <option 
        value={option.value}
        selected={selectedValues.includes(option.value)}
      >
        {option.label}
      </option>
    {/each}
  </select>
</div>