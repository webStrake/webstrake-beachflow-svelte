<script>import { createEventDispatcher } from "svelte";
export let accept = "";
export let multiple = false;
export let placeholder = "Choose file(s)";
export let files = null;
export let label = "";
export let required = false;
export let error = null;
export let showClearButton = true;
export let disabled = false;
export let id = "file-input-" + Math.random().toString(36).substring(7);
const dispatch = createEventDispatcher();
function handleChange(event) {
  const target = event.target;
  files = target.files;
  dispatch("change", { files });
}
function clearFiles() {
  if (disabled) return;
  files = null;
  const input = document.getElementById(id);
  if (input) {
    input.value = "";
  }
  dispatch("clear");
}
</script>
  
  <div class="file-input">
    {#if label}
      <label for={id} class="file-input-main-label" class:error={error !== null} class:disabled>
        {label}
        {#if required}
          <span class="required-indicator">*</span>
        {/if}
      </label>
    {/if}

    <div class="file-input-wrapper" class:error={error !== null} class:disabled>
      <div class="file-input-inner">
        <input
          {id}
          type="file"
          {accept}
          {multiple}
          {required}
          {disabled}
          on:change={handleChange}
        />
        <label for={id} class="file-input-label">
          <span class="file-input-icon"></span>
          <div class="file-input-content">
            <span class="file-input-placeholder">{placeholder}</span>
            {#if files && files.length > 0}
              <span class="file-input-text">
                {multiple ? `${files.length} file(s) selected` : files[0].name}
              </span>
            {/if}
          </div>
        </label>
        {#if showClearButton && files && files.length > 0}
          <div class="file-input-clear-wrapper">
            <button 
              type="button"
              class="file-input-clear"
              on:click|stopPropagation={clearFiles}
              title="Clear selection"
            >
              <span class="material-symbols-rounded">close</span>
            </button>
          </div>
        {/if}
      </div>
    </div>

    {#if error}
      <span class="file-input-error">{error}</span>
    {/if}
  </div>