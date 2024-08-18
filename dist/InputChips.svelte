<script>import { flip } from "svelte/animate";
import { createEventDispatcher } from "svelte";
export let value = [];
export let placeholder = "Enter value...";
export let whitelist = [];
export let validation = null;
export let max = -1;
export let minlength = -1;
export let maxlength = -1;
export let allowUpperCase = false;
export let allowDuplicates = false;
export let allowComma = false;
let inputValue = "";
let isInvalid = false;
let errorMessage = "";
const dispatch = createEventDispatcher();
function addChip() {
  let chipsToAdd = allowComma ? [inputValue.trim()] : inputValue.split(",").map((v) => v.trim()).filter((v) => v !== "");
  chipsToAdd.forEach((chip) => {
    if (isValidChip(chip)) {
      const newChip = allowUpperCase ? chip : chip.toLowerCase();
      value = [...value, newChip];
    }
  });
  inputValue = "";
  isInvalid = false;
  errorMessage = "";
}
function isValidChip(chip) {
  if (chip === "") return false;
  if (max !== -1 && value.length >= max) {
    showError(`Maximum of ${max} chips reached`);
    return false;
  }
  if (minlength !== -1 && chip.length < minlength) {
    showError(`Input must be at least ${minlength} characters`);
    return false;
  }
  if (maxlength !== -1 && chip.length > maxlength) {
    showError(`Input must be no more than ${maxlength} characters`);
    return false;
  }
  const newChip = allowUpperCase ? chip : chip.toLowerCase();
  if (!allowDuplicates && value.includes(newChip)) {
    showError("Duplicate value not allowed");
    return false;
  }
  if (whitelist.length > 0 && !whitelist.includes(newChip)) {
    showError("Value not in whitelist");
    return false;
  }
  if (validation && !validation(newChip)) {
    showError("Invalid input");
    return false;
  }
  return true;
}
function removeChip(index) {
  value = value.filter((_, i) => i !== index);
}
function handleKeydown(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addChip();
  } else if (event.key === "Backspace" && inputValue === "" && value.length > 0) {
    removeChip(value.length - 1);
  }
}
function showError(message) {
  isInvalid = true;
  errorMessage = message;
  dispatch("invalid", { input: inputValue, message });
}
let draggedIndex = null;
function handleDragStart(index) {
  draggedIndex = index;
}
function handleDragOver(index) {
  if (draggedIndex !== null && draggedIndex !== index) {
    const newValue = [...value];
    const [removed] = newValue.splice(draggedIndex, 1);
    newValue.splice(index, 0, removed);
    value = newValue;
    draggedIndex = index;
  }
}
function handleDragEnd() {
  draggedIndex = null;
}
</script>

<div class="ic-container">
  <div class="ic-input-area" class:ic-invalid={isInvalid}>
    {#each value as chip, index (chip)}
      <div 
        class="ic-chip"
        draggable="true"
        on:dragstart={() => handleDragStart(index)}
        on:dragover|preventDefault={() => handleDragOver(index)}
        on:dragend={handleDragEnd}
        animate:flip={{ duration: 200 }}
      >
        <span>{chip}</span>
        <button class="ic-chip-remove" on:click={() => removeChip(index)}>
          ×
        </button>
      </div>
    {/each}
    <input
      type="text"
      {placeholder}
      bind:value={inputValue}
      on:keydown={handleKeydown}
      on:blur={addChip}
      class="ic-input"
    />
  </div>
  {#if isInvalid}
    <div class="ic-error-message">{errorMessage}</div>
  {/if}
</div>