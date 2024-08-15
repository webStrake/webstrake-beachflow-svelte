<script lang="ts">
    export let type = "text";
    export let placeholder = " ";
    export let value = "";
    export let label = "";
    export let id = "";
  
    if (id === "") {
      id = Math.random().toString(36).substring(7);
    }
  </script>
  
  <div class="input-container">
    <input {id} {type} class="input-field" {placeholder} {value} />
    <label for="{id}" class="input-label">{label}</label>
  </div>