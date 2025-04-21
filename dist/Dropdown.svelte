<script>import { slide } from "svelte/transition";
import { createEventDispatcher, onMount, onDestroy } from "svelte";
export let options = [];
export let selected = "";
export let placeholder = "Select options";
export let searchable = false;
export let label = "";
export let loadMore = null;
export let multiple = false;
export let required = false;
export let error = null;
export let disabled = false;
export let maxSelections = null;
export let name = "";
const dispatch = createEventDispatcher();
const id = Math.random().toString(36).substring(7);
const dropdownId = Math.random().toString(36).substring(7);
name = name || id;
let isOpen = false;
let searchTerm = "";
let filteredOptions = options;
let isLoading = false;
let focusedIndex = -1;
let buttonElement;
let selectElement;
let dropdownMenuElement;
let dropdownItemElements = [];
const allDropdowns = [];
$: {
  if (searchable) {
    filteredOptions = options.filter(
      (option) => option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    filteredOptions = options;
  }
}
onMount(() => {
  allDropdowns.push({ id: dropdownId });
  const dropdownElement = document.getElementById(`dropdown-${dropdownId}`);
  if (dropdownElement) {
    dropdownElement.addEventListener("closeDropdown", handleCloseEvent);
  }
  return () => {
    const index = allDropdowns.findIndex((d) => d.id === dropdownId);
    if (index !== -1) {
      allDropdowns.splice(index, 1);
    }
    if (dropdownElement) {
      dropdownElement.removeEventListener("closeDropdown", handleCloseEvent);
    }
  };
});
function toggle() {
  if (disabled) return;
  if (!isOpen) {
    document.querySelectorAll("[id^='dropdown-']").forEach((el) => {
      if (el.id !== `dropdown-${dropdownId}`) {
        const event = new CustomEvent("closeDropdown");
        el.dispatchEvent(event);
      }
    });
  }
  isOpen = !isOpen;
  if (!isOpen) {
    searchTerm = "";
  } else {
    focusedIndex = -1;
  }
  validateDropdown();
}
function handleCloseEvent() {
  if (isOpen) {
    isOpen = false;
    searchTerm = "";
    validateDropdown();
  }
}
function select(value) {
  if (multiple) {
    if (Array.isArray(selected)) {
      const index = selected.indexOf(value);
      if (index === -1) {
        if (maxSelections !== null && selected.length >= maxSelections) {
          return;
        }
        selected = [...selected, value];
      } else {
        selected = selected.filter((v) => v !== value);
      }
    } else {
      const initialArray = selected ? [selected] : [];
      if (maxSelections !== null && initialArray.length >= maxSelections) {
        return;
      }
      selected = value ? [...initialArray, value] : [];
    }
  } else {
    selected = value;
    isOpen = false;
  }
  dispatch("change", { value: selected });
  validateDropdown();
}
function handleClickOutside(event) {
  if (isOpen && !event.composedPath().some(
    (el) => el instanceof Element && el.id === `dropdown-${dropdownId}`
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
function scrollOptionIntoView(index) {
  if (!dropdownMenuElement || !dropdownItemElements[index]) return;
  const menuRect = dropdownMenuElement.getBoundingClientRect();
  const itemRect = dropdownItemElements[index].getBoundingClientRect();
  if (itemRect.bottom > menuRect.bottom) {
    dropdownMenuElement.scrollTop += itemRect.bottom - menuRect.bottom;
  } else if (itemRect.top < menuRect.top) {
    dropdownMenuElement.scrollTop -= menuRect.top - itemRect.top;
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
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      focusedIndex = Math.min(focusedIndex + 1, filteredOptions.length - 1);
      scrollOptionIntoView(focusedIndex);
      break;
    case "ArrowUp":
      event.preventDefault();
      focusedIndex = Math.max(focusedIndex - 1, 0);
      scrollOptionIntoView(focusedIndex);
      break;
    case "Enter":
      event.preventDefault();
      if (focusedIndex >= 0) {
        select(filteredOptions[focusedIndex].value);
      }
      break;
    case "Escape":
      event.preventDefault();
      isOpen = false;
      searchTerm = "";
      validateDropdown();
      break;
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
  }
}
function isOptionDisabled(value) {
  return multiple && maxSelections !== null && selectedValues.length >= maxSelections && !selectedValues.includes(value);
}
$: selectedValues = Array.isArray(selected) ? selected : selected !== void 0 && selected !== "" ? [selected] : [];
$: selectedLabels = options.filter((o) => selectedValues.includes(o.value)).map((o) => o.label);
$: displayValue = selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder;
$: {
  options;
  if (isOpen) focusedIndex = -1;
}
</script>

<svelte:window on:click={handleClickOutside} on:keydown={handleKeydown} />

<div class="dropdown" id={`dropdown-${dropdownId}`}>
  {#if label}
    <label for={id} class="dropdown-label" class:error={error !== null}
    class:disabled={disabled}>{label}</label
    >
  {/if}

  <!-- Hidden native select for form compatibility -->
  <select
    {name}
    id={id}
    bind:this={selectElement}
    style="position: absolute; opacity: 0; pointer-events: none;"
    {required}
    {multiple}
    {disabled}
  >
    {#if !multiple}
      <option value="" disabled={required} selected={!selected}>
        {placeholder}
      </option>
      {#each options as option}
        <option 
          value={option.value} 
          selected={option.value === selected}
        >
          {option.label}
        </option>
      {/each}
    {:else}
      {#each options as option}
        <option 
          value={option.value} 
          selected={selectedValues.includes(option.value)}
        >
          {option.label}
        </option>
      {/each}
    {/if}
  </select>

  <button
    type="button"
    class="dropdown-toggle"
    class:disabled={disabled}
    class:error={error !== null}
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    on:click={toggle}
    bind:this={buttonElement}
    {disabled}
  >
    <span class="dropdown-value">{displayValue}</span>
    <span class="dropdown-icon" aria-hidden="true">expand_more</span>
  </button>

  {#if error}
    <span class="dropdown-error">{error}</span>
  {/if}

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  {#if isOpen}
    <!-- svelte-ignore a11y-interactive-supports-focus -->
    <div
      class="dropdown-menu"
      role="listbox"
      bind:this={dropdownMenuElement}
      transition:slide={{ duration: 300 }}
      on:scroll={handleScroll}
      on:click|stopPropagation={handleMenuClick}
      aria-multiselectable={multiple}
    >
      {#if searchable}
        <div class="dropdown-search">
          <input
            type="text"
            placeholder="Search..."
            bind:value={searchTerm}
            class="dropdown-search-input"
            on:click|stopPropagation={() => {}}
          />
        </div>
      {/if}
      
      {#if multiple && maxSelections !== null}
        <div class="dropdown-selection-info">
          Selected: {selectedValues.length} / {maxSelections}
        </div>
      {/if}
      
      <ul class="dropdown-list">
        {#each filteredOptions as option, index}
          <li>
            <button
              type="button"
              class="dropdown-item"
              class:selected={selectedValues.includes(option.value)}
              class:focused={index === focusedIndex}
              class:disabled={isOptionDisabled(option.value)}
              role="option"
              aria-selected={selectedValues.includes(option.value)}
              on:click|stopPropagation={() => select(option.value)}
              bind:this={dropdownItemElements[index]}
            >
              {option.label}
              {#if multiple && selectedValues.includes(option.value)}
                <span class="dropdown-checkmark">✓</span>
              {/if}
            </button>
          </li>
        {/each}
        
        {#if filteredOptions.length === 0}
          <li class="dropdown-no-results">No options found</li>
        {/if}
      </ul>
      
      {#if isLoading}
        <div class="dropdown-loading">Loading...</div>
      {/if}
    </div>
  {/if}
</div>