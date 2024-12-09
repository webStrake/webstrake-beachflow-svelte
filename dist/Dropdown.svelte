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
export let variant = "primary";
const dispatch = createEventDispatcher();
let isOpen = false;
let searchTerm = "";
let filteredOptions = options;
let isLoading = false;
let selectElement;
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
  validateDropdown();
}
function handleChange(event) {
  const select = event.target;
  if (multiple) {
    const selectedOptions = Array.from(select.selectedOptions).map((opt) => opt.value);
    selected = selectedOptions;
  } else {
    selected = select.value;
    isOpen = false;
  }
  dispatch("change", { value: selected });
  validateDropdown();
}
function handleClickOutside(event) {
  if (isOpen && !event.composedPath().some(
    (el) => el instanceof Element && el.classList.contains("dropdown")
  )) {
    isOpen = false;
    searchTerm = "";
    validateDropdown();
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
function handleMenuClick(event) {
  event.stopPropagation();
}
function validateDropdown() {
  if (required && selectElement) {
    if (multiple ? selectedValues.length === 0 : !selected) {
      selectElement.setCustomValidity("Please select an option");
    } else {
      selectElement.setCustomValidity("");
    }
    selectElement.reportValidity();
  }
}
$: selectedValues = Array.isArray(selected) ? selected : [selected].filter(Boolean);
$: selectedLabels = options.filter((o) => selectedValues.includes(o.value)).map((o) => o.label);
$: displayValue = selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder;
</script>

<svelte:window on:click={handleClickOutside} />

<div class="dropdown {variant}" data-testid="dropdown">
  {#if label}
    <label 
      for="dropdown-select" 
      class="dropdown-label"
      class:error={error !== null}
    >
      {label}
    </label>
  {/if}

  <button
    type="button"
    class="dropdown-toggle"
    class:error={error !== null}
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    on:click={toggle}
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
    <!-- svelte-ignore a11y-interactive-supports-focus -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div 
      class="dropdown-menu" 
      role="listbox"
      transition:slide={{ duration: 300 }}
      on:scroll={handleScroll}
      on:click={handleMenuClick}
    >
      {#if searchable}
        <div class="dropdown-search">
          <input
            type="text"
            class="dropdown-search-input"
            placeholder="Search..."
            bind:value={searchTerm}
          />
        </div>
      {/if}

      <div class="dropdown-options">
        {#each filteredOptions as option}
          <button
            type="button"
            class="dropdown-item"
            class:selected={selectedValues.includes(option.value)}
            role="option"
            aria-selected={selectedValues.includes(option.value)}
            on:click={() => handleChange({ target: { value: option.value } })}
          >
            {option.label}
            {#if multiple && selectedValues.includes(option.value)}
              <span class="dropdown-checkmark material-symbols-rounded">
                check
              </span>
            {/if}
          </button>
        {/each}
      </div>

      {#if isLoading}
        <div class="dropdown-loading">Loading...</div>
      {/if}
    </div>
  {/if}

  <select
    id="dropdown-select"
    bind:this={selectElement}
    {multiple}
    {required}
    class="hidden"
    aria-hidden="true"
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