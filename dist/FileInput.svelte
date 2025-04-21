<script>import { createEventDispatcher } from "svelte";
export let accept = "";
export let multiple = false;
export let placeholder = "Choose file(s)";
export let files = null;
const dispatch = createEventDispatcher();
function handleChange(event) {
  const target = event.target;
  files = target.files;
  dispatch("change", { files });
}
</script>
  
  <div class="file-input">
    <input
      type="file"
      {accept}
      {multiple}
      on:change={handleChange}
      id="file-input"
    />
    <label for="file-input" class="file-input-label">
      <span class="file-input-icon"></span>
      <span class="file-input-text">
        {files && files.length > 0
          ? multiple
            ? `${files.length} file(s) selected`
            : files[0].name
          : placeholder}
      </span>
    </label>
  </div>