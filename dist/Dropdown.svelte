<script>import { slide } from "svelte/transition";
import { createEventDispatcher } from "svelte";
export let options = [];
export let selected = "";
export let placeholder = "Select options";
export let searchable = false;
export let label = "";
export let loadMore = null;
export let multiple = false;
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
$: selectedValues = Array.isArray(selected) ? selected : [selected].filter(Boolean);
$: selectedLabels = options.filter((o) => selectedValues.includes(o.value)).map((o) => o.label);
$: displayValue = selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder;
</script>

<svelte:window on:click={handleClickOutside} />

<div class="dropdown">
  {#if label}
    <label for="dropdown-toggle" class="dropdown-label">{label}</label>
  {/if}
  <button
    type="button"
    class="dropdown-toggle"
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    on:click={toggle}
  >
    {displayValue}
    <span class="dropdown-icon" aria-hidden="true">expand_more</span>
  </button>

  {#if isOpen}
    <div
      class="dropdown-menu"
      role="listbox"
      transition:slide={{ duration: 300 }}
      on:scroll={handleScroll}
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
        {#each filteredOptions as option}
          <li>
            <button
              type="button"
              class="dropdown-item"
              class:selected={selectedValues.includes(option.value)}
              role="option"
              aria-selected={selectedValues.includes(option.value)}
              on:click={() => select(option.value)}
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
  /* Add this to your existing styles */
  .dropdown-checkmark {
    margin-left: auto;
  }
</style>