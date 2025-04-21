<script>import { DateTime } from "luxon";
import { createEventDispatcher } from "svelte";
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
export let showRequiredIndicator = true;
if (id === "") {
  id = Math.random().toString(36).substring(7);
}
const isTextarea = type === "textarea";
const isCheckbox = type === "checkbox";
const isDateTime = type === "date" || type === "time" || type === "datetime-local";
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
  if (isDateTime) {
    formattedDate = formatDate();
  }
  if (isCheckbox) {
    dispatch("change", { value: target.checked });
    return;
  }
  dispatch("change", { value: target.value });
}
const formatDate = () => {
  if (!value) return "";
  try {
    const dt = DateTime.fromISO(value.toString());
    if (!dt.isValid) return "";
    switch (type) {
      case "date":
        return dt.toLocaleString({
          weekday: "short",
          month: "short",
          day: "2-digit",
          year: "numeric"
        });
      case "datetime-local":
        return dt.toLocaleString({
          weekday: "short",
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        });
      default:
        return "";
    }
  } catch {
    return "";
  }
};
let formattedDate = formatDate();
$: effectivePlaceholder = focused ? placeholder : " ";
$: characterCount = typeof value === "string" ? value.length : 0;
$: isExceeded = maxLength ? characterCount > maxLength : false;
$: showRequiredMark = required && showRequiredIndicator;
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
    <span class="checkbox-label">
      {label}
      {#if showRequiredMark}
        <span class="required-indicator">*</span>
      {/if}
    </span>
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
    <label for={id} class="date-time-label">
      {label}{formattedDate?` - ${formattedDate}`:''}
      {#if showRequiredMark}
        <span class="required-indicator">*</span>
      {/if}
    </label>
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
    <label for={id} class="textarea-label">
      {label}
      {#if showRequiredMark}
        <span class="required-indicator">*</span>
      {/if}
    </label>
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
    <label for={id} class="input-label">
      {label}
      {#if showRequiredMark}
        <span class="required-indicator">*</span>
      {/if}
    </label>
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


