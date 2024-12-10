<script>import { createEventDispatcher } from "svelte";
import { DateTime } from "luxon";
import { generateMonthArray } from "./utils/beachutils.js";
export let currentDate;
export let config;
export let parsedMinDate;
export let parsedMaxDate;
const dispatch = createEventDispatcher();
$: months = generateMonthArray(currentDate, config, parsedMinDate, parsedMaxDate);
$: selectedMonth = currentDate.month;
</script>
  
  <div class="beach-datepicker__months">
    {#each months as month}
      <button
        type="button"
        class="beach-datepicker__month-item"
        class:selected={month.value === selectedMonth}
        disabled={month.disabled}
        on:click={() => dispatch('select', month.value)}
      >
        {month.label}
      </button>
    {/each}
  </div>