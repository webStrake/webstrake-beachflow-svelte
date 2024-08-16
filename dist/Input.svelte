<script>export let type = "text";
export let placeholder = " ";
export let value = "";
export let label = "";
export let id = "";
export let icon = void 0;
export let required = false;
if (id === "") {
  id = Math.random().toString(36).substring(7);
}
</script>

<div class="input-container">
  {#if icon}
    <span class="input-icon">{icon}</span>
  {/if}
  <input {id} {type} class="input-field" {placeholder} {value} {required} />
  <label for="{id}" class="input-label">{label}</label>
</div>