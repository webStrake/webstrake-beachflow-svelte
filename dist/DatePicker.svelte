<!-- DatePicker.svelte -->
<script>import { createEventDispatcher, onMount, tick } from "svelte";
import { DateTime } from "luxon";
import { DEFAULT_CONFIG } from "./constants/datepicker.contants.js";
import {
  parseDate,
  formatDate,
  isDateDisabled,
  getWeekDays,
  handleKeyboardNavigation,
  calculatePopupPosition
} from "./utils/beachutils.js";
import TimePicker from "./TimePicker.svelte";
import MonthPicker from "./MonthPicker.svelte";
import YearPicker from "./YearPicker.svelte";
export let value = null;
export let mode = "date";
export let placement = "auto";
export let config = {};
export let placeholder = "";
export let disabled = false;
export let required = false;
export let error = null;
export let minDate = null;
export let maxDate = null;
export let allowRange = false;
let isOpen = false;
let currentView = "calendar";
let currentDate;
let selectedDate = null;
let rangeStartDate = null;
let rangeEndDate = null;
let inputElement;
let popupElement;
let focusedDate = null;
let weekDays = [];
const dispatch = createEventDispatcher();
$: mergedConfig = { ...DEFAULT_CONFIG, ...config };
$: parsedMinDate = parseDate(minDate);
$: parsedMaxDate = parseDate(maxDate);
onMount(() => {
  initializeDates();
  initializeWeekDays();
  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
});
function initializeDates() {
  if (value) {
    selectedDate = parseDate(value);
    currentDate = selectedDate?.startOf("month") || DateTime.now().startOf("month");
  } else {
    currentDate = DateTime.now().startOf("month");
  }
}
function initializeWeekDays() {
  weekDays = getWeekDays(mergedConfig.locale, mergedConfig.firstDayOfWeek);
}
async function openPicker() {
  if (disabled) return;
  isOpen = true;
  currentView = "calendar";
  await tick();
  if (popupElement) {
    const { top, left } = calculatePopupPosition(
      inputElement,
      popupElement,
      placement
    );
    popupElement.style.top = `${top}px`;
    popupElement.style.left = `${left}px`;
  }
  dispatch("open");
}
function closePicker() {
  isOpen = false;
  dispatch("close");
}
function handleClickOutside(event) {
  if (isOpen && !inputElement.contains(event.target) && !popupElement?.contains(event.target)) {
    closePicker();
  }
}
function selectDate(date) {
  if (isDateDisabled(date, mergedConfig, parsedMinDate, parsedMaxDate))
    return;
  if (allowRange) {
    if (!rangeStartDate || rangeStartDate && rangeEndDate) {
      rangeStartDate = date;
      rangeEndDate = null;
    } else if (date < rangeStartDate) {
      rangeEndDate = rangeStartDate;
      rangeStartDate = date;
    } else {
      rangeEndDate = date;
    }
    dispatch("change", {
      start: rangeStartDate,
      end: rangeEndDate || null
    });
  } else {
    selectedDate = date;
    if (mode === "date") {
      closePicker();
    }
    dispatch("change", { value: date });
  }
}
function handleKeyDown(event) {
  if (!isOpen) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPicker();
    }
    return;
  }
  if (event.key === "Escape") {
    closePicker();
    return;
  }
  const newDate = handleKeyboardNavigation(event, focusedDate || currentDate);
  if (newDate && !isDateDisabled(newDate, mergedConfig, parsedMinDate, parsedMaxDate)) {
    focusedDate = newDate;
    if (event.key === "Enter") {
      selectDate(newDate);
    }
  }
}
function handleTimeChange(event) {
  if (!selectedDate) return;
  const newDate = selectedDate.set({
    hour: event.detail.hours,
    minute: event.detail.minutes
  });
  selectedDate = newDate;
  dispatch("change", { value: newDate });
}
function handleMonthChange(month) {
  currentDate = currentDate.set({ month });
  currentView = "calendar";
}
function handleYearChange(year) {
  currentDate = currentDate.set({ year });
  currentView = "calendar";
}
function clear() {
  selectedDate = null;
  rangeStartDate = null;
  rangeEndDate = null;
  dispatch("change", { value: void 0 });
}
$: displayValue = selectedDate ? formatDate(selectedDate, mergedConfig.format, mergedConfig.locale) : allowRange && rangeStartDate ? `${formatDate(rangeStartDate, mergedConfig.format, mergedConfig.locale)} - ${rangeEndDate ? formatDate(rangeEndDate, mergedConfig.format, mergedConfig.locale) : "..."}` : "";
</script>

<div class="beach-datepicker" role="presentation" on:keydown={handleKeyDown}>
  <div class="beach-datepicker__input">
    <input
      type="text"
      bind:this={inputElement}
      {placeholder}
      {disabled}
      {required}
      readonly
      value={displayValue}
      class:error={!!error}
      on:click={openPicker}
    />
    <span class="beach-datepicker__input-icon material-symbols-rounded">
      {mode === "time" ? "schedule" : "calendar_today"}
    </span>
  </div>

  {#if isOpen}
    <div
      bind:this={popupElement}
      class="beach-datepicker__popup"
      class:open={isOpen}
      class:top={placement === "top"}
      role="dialog"
      aria-modal="true"
      aria-label="Date picker"
    >
      {#if currentView === "calendar"}
        <div class="beach-datepicker__header">
          <div class="beach-datepicker__nav-group">
            <button
              type="button"
              class="beach-datepicker__nav-btn"
              on:click={() => (currentDate = currentDate.minus({ months: 1 }))}
              disabled={parsedMinDate &&
                currentDate.minus({ months: 1 }) <
                  parsedMinDate.startOf("month")}
              aria-label="Previous month"
            >
              <span class="material-symbols-rounded">chevron_left</span>
            </button>
          </div>

          <div class="beach-datepicker__current">
            <button
              type="button"
              class="beach-datepicker__month"
              on:click={() => (currentView = "month")}
            >
              {currentDate.toFormat("MMMM")}
            </button>
            <button
              type="button"
              class="beach-datepicker__year"
              on:click={() => (currentView = "year")}
            >
              {currentDate.year}
            </button>
          </div>

          <div class="beach-datepicker__nav-group">
            <button
              type="button"
              class="beach-datepicker__nav-btn"
              on:click={() => (currentDate = currentDate.plus({ months: 1 }))}
              disabled={parsedMaxDate &&
                currentDate.plus({ months: 1 }) >
                  parsedMaxDate.startOf("month")}
              aria-label="Next month"
            >
              <span class="material-symbols-rounded">chevron_right</span>
            </button>
          </div>
        </div>

        <div class="beach-datepicker__grid">
          <div class="beach-datepicker__weekdays">
            {#each weekDays as day}
              <div class="beach-datepicker__weekday">{day}</div>
            {/each}
          </div>

          <div class="beach-datepicker__days">
            {#each Array(currentDate.startOf("month").weekday % 7).fill(null) as _}
              <div class="beach-datepicker__day empty"></div>
            {/each}

            {#each Array(currentDate.daysInMonth)
              .fill(0)
              .map((_, i) => i + 1) as day}
              {@const date = currentDate.set({ day })}
              {@const isDisabled = isDateDisabled(
                date,
                mergedConfig,
                parsedMinDate,
                parsedMaxDate
              )}
              {@const isSelected = selectedDate?.hasSame(date, "day")}
              {@const isToday = date.hasSame(DateTime.now(), "day")}
              {@const isInRange =
                allowRange &&
                rangeStartDate &&
                rangeEndDate &&
                date > rangeStartDate &&
                date < rangeEndDate}

              <button
                type="button"
                class="beach-datepicker__day"
                class:selected={isSelected}
                class:today={isToday}
                class:in-range={isInRange}
                class:range-start={allowRange &&
                  rangeStartDate?.hasSame(date, "day")}
                class:range-end={allowRange &&
                  rangeEndDate?.hasSame(date, "day")}
                disabled={isDisabled}
                on:click={() => selectDate(date)}
                aria-label={date.toFormat("DDDD")}
                aria-selected={isSelected}
              >
                {day}
              </button>
            {/each}
          </div>
        </div>

        {#if mode !== "date"}
          <TimePicker
            value={selectedDate}
            config={mergedConfig}
            on:change={handleTimeChange}
          />
        {/if}
      {:else if currentView === "month"}
        <MonthPicker
          {currentDate}
          config={mergedConfig}
          {parsedMinDate}
          {parsedMaxDate}
          on:select={(e) => handleMonthChange(e.detail)}
        />
      {:else}
        <YearPicker
          {currentDate}
          config={mergedConfig}
          on:select={(e) => handleYearChange(e.detail)}
        />
      {/if}
    </div>
  {/if}
</div>
