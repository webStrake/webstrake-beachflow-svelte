<script>import { createEventDispatcher } from "svelte";
export let accept = "";
export let multiple = false;
let dragover = false;
let files = null;
const dispatch = createEventDispatcher();
function handleDragOver(event) {
  event.preventDefault();
  dragover = true;
}
function handleDragLeave() {
  dragover = false;
}
function handleDrop(event) {
  event.preventDefault();
  dragover = false;
  files = event.dataTransfer?.files || null;
  dispatch("change", { files });
}
function handleChange(event) {
  const target = event.target;
  files = target.files;
  dispatch("change", { files });
}
</script>
  
  <div
    class="drag-drop-area"
    class:dragover
    on:dragover={handleDragOver}
    on:dragleave={handleDragLeave}
    on:drop={handleDrop}
  >
    <input
      type="file"
      {accept}
      {multiple}
      on:change={handleChange}
      id="drag-drop-input"
    />
    <label for="drag-drop-input">
      <div class="drag-drop-content">
        <span class="drag-drop-icon"></span>
        <span class="drag-drop-text">
          {files && files.length > 0
            ? `${files.length} file(s) selected`
            : 'Drag & Drop files here or click to select'}
        </span>
      </div>
    </label>
  </div>