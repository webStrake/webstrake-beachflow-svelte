<script>import { createEventDispatcher } from "svelte";
export let type = "text";
export let placeholder = "";
export let value = "";
export let label = "";
export let id = "";
export let icon = void 0;
export let required = false;
export let rows = 3;
export let disabled = false;
export let step = void 0;
export let min = void 0;
export let max = void 0;
export let lang = "en-IN";
if (id === "") {
  id = Math.random().toString(36).substring(7);
}
const isTextarea = type === "textarea";
const isCheckbox = type === "checkbox";
const isDateTime = type === "date" || type === "time";
let focused = false;
const dispatch = createEventDispatcher();
function handleFocus() {
  focused = true;
}
function handleBlur() {
  focused = false;
}
function typeAction(node) {
  if (!isTextarea && !isCheckbox) {
    node.type = type;
  }
}
function onInput(event) {
  const target = event.target;
  dispatch("change", target.value);
}
$: effectivePlaceholder = focused ? placeholder : " ";
</script>

{#if isCheckbox}
  <label class="checkbox-container" for={id}>
    <input
      type="checkbox"
      {id}
      class="checkbox-input"
      bind:checked={value}
      {disabled}
      {required}
      {step}
      {min}
      {max}
      {lang}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:change={onInput}
    />
    <span class="checkbox-custom"></span>
    <span class="checkbox-label">{label}</span>
  </label>
{:else if isDateTime}
  <div class="date-time-container">
    <input
      use:typeAction
      {id}
      class="date-time-input"
      placeholder={effectivePlaceholder}
      bind:value
      {required}
      {disabled}
      {step}
      {min}
      {max}
      {lang}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:change={onInput}
    />
    {#if icon}
      <span class="date-time-icon">{icon}</span>
    {/if}
    <label for={id} class="date-time-label">{label}</label>
  </div>
{:else if isTextarea}
  <div class="input-container">
    <textarea
      {id}
      class="textarea-field"
      placeholder={effectivePlaceholder}
      bind:value
      {required}
      {rows}
      {disabled}
      {lang}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:change={onInput}
    ></textarea>
    <label for={id} class="textarea-label">{label}</label>
  </div>
{:else}
  <div class="input-container">
    {#if icon}
      <span class="input-icon">{icon}</span>
    {/if}
    <input
      use:typeAction
      {id}
      class="input-field"
      placeholder={effectivePlaceholder}
      bind:value
      {required}
      {disabled}
      {step}
      {min}
      {max}
      {lang}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:change={onInput}
    />
    <label for={id} class="input-label">{label}</label>
  </div>
{/if}