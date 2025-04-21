<script>import { createEventDispatcher } from "svelte";
export let accept = "";
export let multiple = false;
export let placeholder = "Choose file(s)";
export let files = null;
export let label = "";
export let required = false;
export let disabled = false;
export let showClearButton = true;
export let error = null;
export let name = "";
const dispatch = createEventDispatcher();
let inputElement;
function handleChange(event) {
  const target = event.target;
  files = target.files;
  dispatch("change", { files });
}
function clearFiles() {
  if (inputElement) {
    inputElement.value = "";
    files = null;
    dispatch("clear");
    dispatch("change", { files: null });
  }
}
const id = `file-input-${Math.random().toString(36).substring(2, 9)}`;
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
}
</script>

<div class="file-input-container">
  {#if label}
    <label for={id} class="file-input-field-label" class:required class:error={!!error} class:disabled>
      {label}
    </label>
  {/if}

  <div class="file-input" class:error={!!error} class:disabled>
    <input
      {name}
      type="file"
      {accept}
      {multiple}
      {required}
      {disabled}
      on:change={handleChange}
      id={id}
      bind:this={inputElement}
    />
    
    <label for={id} class="file-input-label">
      <span class="file-input-icon">upload_file</span>
      <span class="file-input-text">
        {files && files.length > 0
          ? multiple
            ? `${files.length} file(s) selected`
            : files[0].name
          : placeholder}
      </span>
    </label>
    
    {#if files && files.length > 0 && showClearButton}
      <button 
        type="button" 
        class="file-input-clear-button"
        on:click|preventDefault={clearFiles}
        aria-label="Clear file selection"
      >
        <span class="file-input-clear-icon">close</span>
      </button>
    {/if}
  </div>
  
  {#if error}
    <span class="file-input-error">{error}</span>
  {/if}
  
  {#if files && files.length > 0}
    <div class="file-input-preview">
      {#each Array.from(files) as file, i}
        <div class="file-input-file">
          <span class="file-input-file-icon">description</span>
          <span class="file-input-file-name">{file.name}</span>
          <span class="file-input-file-size">({formatFileSize(file.size)})</span>
        </div>
      {/each}
    </div>
  {/if}
</div>

