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
export let error = null;
export let showCharacterCount = true;
export let maxLength = void 0;
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
  dispatch("input", { value: target.value });
}
function onChange(event) {
  const target = event.target;
  dispatch("change", { value: target.value });
}
$: effectivePlaceholder = focused ? placeholder : " ";
$: characterCount = typeof value === "string" ? value.length : 0;
$: isExceeded = maxLength ? characterCount > maxLength : false;
</script>

{#if isCheckbox}
  <label class="checkbox-container" for={id}>
    <input
      type="checkbox"
      {id}
      class="checkbox-input"
      class:error={error !== null}
      bind:checked={value}
      {disabled}
      {required}
      {step}
      {min}
      {max}
      {lang}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:input={onInput}
      on:change={onChange}
    />
    <span class="checkbox-custom"></span>
    <span class="checkbox-label">{label}</span>
    {#if error}
      <span class="error-message">{error}</span>
    {/if}
  </label>
{:else if isDateTime}
  <div class="date-time-container">
    <input
      use:typeAction
      {id}
      class="date-time-input"
      class:error={error !== null}
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
      on:input={onInput}
      on:change={onChange}
    />
    {#if icon}
      <span class="date-time-icon">{icon}</span>
    {/if}
    <label for={id} class="date-time-label">{label}</label>
    {#if error}
      <span class="error-message">{error}</span>
    {/if}
  </div>
{:else if isTextarea}
  <div class="input-container">
    <textarea
      {id}
      class="textarea-field"
      class:error={error !== null}
      placeholder={effectivePlaceholder}
      bind:value
      {required}
      {rows}
      {disabled}
      {lang}
      maxlength={maxLength}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:input={onInput}
      on:change={onChange}
    ></textarea>
    <label for={id} class="textarea-label">{label}</label>
    {#if error}
      <span class="error-message">{error}</span>
    {/if}
    {#if showCharacterCount && maxLength}
      <span class="character-count" class:exceeded={isExceeded}>
        {characterCount}{#if maxLength}/{maxLength}{/if}
      </span>
    {/if}
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
      class:error={error !== null}
      placeholder={effectivePlaceholder}
      bind:value
      {required}
      {disabled}
      {step}
      {min}
      {max}
      {lang}
      maxlength={maxLength}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:input={onInput}
      on:change={onChange}
    />
    <label for={id} class="input-label">{label}</label>
    {#if error}
      <span class="error-message">{error}</span>
    {/if}
    {#if showCharacterCount && maxLength}
      <span class="character-count" class:exceeded={isExceeded}>
        {characterCount}{#if maxLength}/{maxLength}{/if}
      </span>
    {/if}
  </div>
{/if}

<style>
  .character-count {
    position: absolute;
    bottom: -1.5rem;
    right: 0;
    font-size: 0.75rem;
    color: var(--surface-600);
  }

  .character-count.exceeded {
    color: var(--error-500);
  }
</style>