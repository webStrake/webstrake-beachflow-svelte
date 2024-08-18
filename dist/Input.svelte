<script>export let type = "text";
export let placeholder = " ";
export let value = "";
export let label = "";
export let id = "";
export let icon = void 0;
export let required = false;
export let rows = 3;
if (id === "") {
  id = Math.random().toString(36).substring(7);
}
const isTextarea = type === "textarea";
function typeAction(node) {
  if (!isTextarea) {
    node.type = type;
  }
}
</script>

<div class="input-container">
  {#if icon && !isTextarea}
    <span class="input-icon">{icon}</span>
  {/if}
  {#if isTextarea}
    <textarea
      use:typeAction
      {id}
      class="textarea-field"
      {placeholder}
      bind:value
      {required}
      {rows}
    ></textarea>
    <label for="{id}" class="textarea-label">{label}</label>
  {:else}
    <input
      use:typeAction
      {id}
      class="input-field"
      {placeholder}
      bind:value
      {required}
    />
    <label for="{id}" class="input-label">{label}</label>
  {/if}
</div>