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
export let disabled = false;
export let maxSelections = null;
export let showRequiredIndicator = true;
const dispatch = createEventDispatcher();
let isOpen = false;
let searchTerm = "";
let filteredOptions = options;
let isLoading = false;
let focusedIndex = -1;
let buttonElement;
let selectElement;
let dropdownMenu;
const id = Math.random().toString(36).substring(7);
const id2 = Math.random().toString(36).substring(7);
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
  if (disabled) return;
  isOpen = !isOpen;
  if (!isOpen) {
    searchTerm = "";
  }
}
function select(value) {
  if (multiple) {
    const currentSelected = Array.isArray(selected) ? selected : selected ? [selected] : [];
    const index = currentSelected.indexOf(value);
    if (index === -1) {
      if (maxSelections && currentSelected.length >= maxSelections) {
        dispatch("maxSelectionsReached");
        return;
      }
      selected = [...currentSelected, value];
    } else {
      selected = currentSelected.filter((v) => v !== value);
    }
  } else {
    selected = value;
    isOpen = false;
  }
  dispatch("change", { value: selected });
}
function handleClickOutside(event) {
  if (isOpen && !event.composedPath().some(
    (el) => el instanceof Element && el.classList.contains("dropdown")
  )) {
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
function scrollIntoViewIfNeeded(index) {
  if (!dropdownMenu) return;
  const items = dropdownMenu.querySelectorAll(".dropdown-item");
  if (items[index]) {
    const item = items[index];
    const container = dropdownMenu;
    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;
    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.clientHeight;
    if (itemTop < containerTop) {
      container.scrollTop = itemTop;
    } else if (itemBottom > containerBottom) {
      container.scrollTop = itemBottom - container.clientHeight;
    }
  }
}
function handleKeydown(event) {
  if (!isOpen) return;
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      focusedIndex = Math.min(focusedIndex + 1, filteredOptions.length - 1);
      scrollIntoViewIfNeeded(focusedIndex);
      break;
    case "ArrowUp":
      event.preventDefault();
      focusedIndex = Math.max(focusedIndex - 1, 0);
      scrollIntoViewIfNeeded(focusedIndex);
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
      break;
  }
}
function handleMenuClick(event) {
  event.stopPropagation();
}
$: selectedValues = Array.isArray(selected) ? selected : [selected].filter(Boolean);
$: selectedLabels = selectedValues.map((value) => options.find((o) => o.value === value)?.label).filter(Boolean);
$: displayValue = selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder;
$: showRequiredMark = required && showRequiredIndicator;
</script>

<svelte:window on:click={handleClickOutside} on:keydown={handleKeydown} />

<div class="dropdown">  {#if label}
    <label for={id} class="dropdown-label" class:error={error !== null}
    class:disabled={disabled}>
      {label}
      {#if showRequiredMark}
        <span class="required-indicator">*</span>
      {/if}
    </label>
  {/if}

  <!-- Add hidden native select for form compatibility -->
  <select
    id={id2}
    bind:this={selectElement}
    style="position: absolute; opacity: 0; pointer-events: none;"
    {required}
    {multiple}
    {disabled}
  >
    <option value="" disabled selected={selectedValues.length === 0}
      >{placeholder}</option
    >
    {#each options as option}
      <option
        value={option.value}
        selected={selectedValues.includes(option.value)}>{option.label}</option
      >
    {/each}
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
    {displayValue}
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
      bind:this={dropdownMenu}
      transition:slide={{ duration: 300 }}
      on:scroll={handleScroll}
      on:click|stopPropagation={handleMenuClick}
    >
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
        {#each filteredOptions as option, index}
          <li>
            <button
              type="button"
              class="dropdown-item"
              class:selected={selectedValues.includes(option.value)}
              class:focused={index === focusedIndex}
              role="option"
              aria-selected={selectedValues.includes(option.value)}
              on:click|stopPropagation={() => select(option.value)}
            >
              {option.label}
              {#if multiple && selectedValues.includes(option.value)}
                <span class="dropdown-checkmark">✓</span>
              {/if}
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

<style>
  .required-mark {
    color: red;
    margin-left: 4px;
  }
</style>
