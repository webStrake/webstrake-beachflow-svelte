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
let focusedIndex = -1;
let selectElement;
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
function toggle() {
  isOpen = !isOpen;
  if (!isOpen) {
    searchTerm = "";
    focusedIndex = -1;
  } else if (searchable && searchInput) {
    setTimeout(() => searchInput.focus(), 0);
  }
  validateDropdown();
}
function handleChange(index) {
  const selectedOption = filteredOptions[index];
  if (!selectedOption) return;
  if (multiple) {
    const newSelected = Array.isArray(selected) ? [...selected] : [];
    const valueIndex = newSelected.indexOf(selectedOption.value);
    if (valueIndex === -1) {
      newSelected.push(selectedOption.value);
    } else {
      newSelected.splice(valueIndex, 1);
    }
    selected = newSelected;
  } else {
    selected = selectedOption.value;
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
    focusedIndex = -1;
    validateDropdown();
  }
}
function handleKeydown(event) {
  if (!isOpen) {
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      toggle();
      return;
    }
  } else {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusedIndex = Math.min(focusedIndex + 1, filteredOptions.length - 1);
        scrollToFocused();
        break;
      case "ArrowUp":
        event.preventDefault();
        focusedIndex = Math.max(focusedIndex - 1, -1);
        scrollToFocused();
        break;
      case "Enter":
        event.preventDefault();
        if (focusedIndex >= 0) {
          handleChange(focusedIndex);
        }
        break;
      case "Escape":
        event.preventDefault();
        isOpen = false;
        searchTerm = "";
        focusedIndex = -1;
        break;
      case "Tab":
        isOpen = false;
        searchTerm = "";
        focusedIndex = -1;
        break;
    }
  }
}
function scrollToFocused() {
  if (focusedIndex >= 0) {
    const menuElement = document.querySelector(".dropdown-menu");
    const focusedElement = document.querySelector(`.dropdown-item:nth-child(${focusedIndex + 1})`);
    if (menuElement && focusedElement) {
      const menuRect = menuElement.getBoundingClientRect();
      const focusedRect = focusedElement.getBoundingClientRect();
      if (focusedRect.bottom > menuRect.bottom) {
        menuElement.scrollTop += focusedRect.bottom - menuRect.bottom;
      } else if (focusedRect.top < menuRect.top) {
        menuElement.scrollTop += focusedRect.top - menuRect.top;
      }
    }
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
            bind:this={searchInput}
            on:keydown={handleKeydown}
          />
        </div>
      {/if}

      <div class="dropdown-options">
        {#each filteredOptions as option, index}
          <button
            type="button"
            class="dropdown-item"
            class:selected={selectedValues.includes(option.value)}
            class:focused={index === focusedIndex}
            role="option"
            aria-selected={selectedValues.includes(option.value)}
            on:click={() => handleChange(index)}
            on:keydown={handleKeydown}
          >
            {option.label}
            {#if multiple && selectedValues.includes(option.value)}
              <span class="dropdown-checkmark material-symbols-rounded">
                check
              </span>
            {/if}
          </button>
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