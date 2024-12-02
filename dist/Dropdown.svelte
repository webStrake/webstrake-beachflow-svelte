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
const dispatch = createEventDispatcher();
let isOpen = false;
let searchTerm = "";
let filteredOptions = options;
let isLoading = false;
let focusedIndex = -1;
let buttonElement;
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
function select(value) {
  if (multiple) {
    if (Array.isArray(selected)) {
      const index = selected.indexOf(value);
      if (index === -1) {
        selected = [...selected, value];
      } else {
        selected = selected.filter((v) => v !== value);
      }
    } else {
      selected = [selected, value];
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
function handleKeydown(event) {
  if (!isOpen) return;
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      focusedIndex = Math.min(focusedIndex + 1, filteredOptions.length - 1);
      break;
    case "ArrowUp":
      event.preventDefault();
      focusedIndex = Math.max(focusedIndex - 1, 0);
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
      validateDropdown();
      break;
  }
}
function handleMenuClick(event) {
  event.stopPropagation();
}
function validateDropdown() {
  if (required && buttonElement) {
    if (multiple ? selectedValues.length === 0 : !selected) {
      buttonElement.setCustomValidity("Please select an option");
    } else {
      buttonElement.setCustomValidity("");
    }
    buttonElement.reportValidity();
  }
}
$: selectedValues = Array.isArray(selected) ? selected : [selected].filter(Boolean);
$: selectedLabels = options.filter((o) => selectedValues.includes(o.value)).map((o) => o.label);
$: displayValue = selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder;
</script>

<svelte:window on:click={handleClickOutside} on:keydown={handleKeydown} />

<div class="dropdown">
  {#if label}
    <label
      for="dropdown-toggle"
      class="dropdown-label"
      class:error={error !== null}>{label}</label
    >
  {/if}
  <button
    type="button"
    id="dropdown-toggle"
    class="dropdown-toggle"
    class:error={error !== null}
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    on:click={toggle}
    bind:this={buttonElement}
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
      transition:slide={{ duration: 300 }}
      on:scroll={handleScroll}
      on:click={handleMenuClick}
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
