<script>import { createEventDispatcher } from "svelte";
import { DateTime } from "luxon";
import { generateYearRange } from "./utils/beachutils.js";
export let currentDate;
export let config;
const dispatch = createEventDispatcher();
let yearRangeStart;
$: {
  const currentYear = currentDate.year;
  yearRangeStart = Math.floor(currentYear / 20) * 20;
}
$: years = generateYearRange(currentDate.year, config);
$: selectedYear = currentDate.year;
function navigateYears(direction) {
  yearRangeStart += direction === "prev" ? -20 : 20;
}
</script>

<div class="beach-datepicker__year-picker">
  <div class="beach-datepicker__header">
    <button
      type="button"
      class="beach-datepicker__nav-btn"
      on:click={() => navigateYears("prev")}
      disabled={yearRangeStart <= config.minYear}
    >
      <span class="material-symbols-rounded">chevron_left</span>
    </button>

    <span class="beach-datepicker__year-range">
      {yearRangeStart} - {yearRangeStart + 19}
    </span>

    <button
      type="button"
      class="beach-datepicker__nav-btn"
      on:click={() => navigateYears("next")}
      disabled={yearRangeStart + 20 >= config.maxYear}
    >
      <span class="material-symbols-rounded">chevron_right</span>
    </button>
  </div>

  <div class="beach-datepicker__years">
    {#each years as year}
      <button
        type="button"
        class="beach-datepicker__year-item"
        class:selected={year === selectedYear}
        on:click={() => dispatch("select", year)}
      >
        {year}
      </button>
    {/each}
  </div>
</div>
