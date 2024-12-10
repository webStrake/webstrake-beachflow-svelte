<script>import { createEventDispatcher } from "svelte";
import { DateTime } from "luxon";
export let value = null;
export let config;
const dispatch = createEventDispatcher();
let hours = value?.hour || 0;
let minutes = value?.minute || 0;
function increment(type) {
  if (type === "hours") {
    hours = (hours + 1) % (config.use24Hours ? 24 : 12);
    if (!config.use24Hours && hours === 0) hours = 1;
  } else {
    minutes = (minutes + config.timeInterval) % 60;
  }
  emitChange();
}
function decrement(type) {
  if (type === "hours") {
    hours = hours - 1;
    if (hours < 0) hours = config.use24Hours ? 23 : 11;
    if (!config.use24Hours && hours === 0) hours = 12;
  } else {
    minutes = minutes - config.timeInterval;
    if (minutes < 0) minutes = 60 - config.timeInterval;
  }
  emitChange();
}
function handleInput(event, type) {
  const input = event.target;
  const value2 = parseInt(input.value);
  if (isNaN(value2)) return;
  if (type === "hours") {
    const maxHours = config.use24Hours ? 23 : 12;
    hours = Math.min(Math.max(0, value2), maxHours);
  } else {
    minutes = Math.min(Math.max(0, value2), 59);
  }
  emitChange();
}
function emitChange() {
  dispatch("change", { hours, minutes });
}
$: formattedHours = hours.toString().padStart(2, "0");
$: formattedMinutes = minutes.toString().padStart(2, "0");
</script>
  
  <div class="beach-datepicker__time">
    <div class="beach-datepicker__time-inputs">
      <div class="beach-datepicker__time-field-group">
        <button 
          type="button"
          class="beach-datepicker__time-btn"
          on:click={() => increment('hours')}
          aria-label="Increment hours"
        >
          <span class="material-symbols-rounded">keyboard_arrow_up</span>
        </button>
        
        <input
          type="text"
          class="beach-datepicker__time-field"
          value={formattedHours}
          on:input={(e) => handleInput(e, 'hours')}
          maxlength="2"
          aria-label="Hours"
        />
        
        <button 
          type="button"
          class="beach-datepicker__time-btn"
          on:click={() => decrement('hours')}
          aria-label="Decrement hours"
        >
          <span class="material-symbols-rounded">keyboard_arrow_down</span>
        </button>
      </div>
  
      <span class="beach-datepicker__time-separator">:</span>
  
      <div class="beach-datepicker__time-field-group">
        <button 
          type="button"
          class="beach-datepicker__time-btn"
          on:click={() => increment('minutes')}
          aria-label="Increment minutes"
        >
          <span class="material-symbols-rounded">keyboard_arrow_up</span>
        </button>
        
        <input
          type="text"
          class="beach-datepicker__time-field"
          value={formattedMinutes}
          on:input={(e) => handleInput(e, 'minutes')}
          maxlength="2"
          aria-label="Minutes"
        />
        
        <button 
          type="button"
          class="beach-datepicker__time-btn"
          on:click={() => decrement('minutes')}
          aria-label="Decrement minutes"
        >
          <span class="material-symbols-rounded">keyboard_arrow_down</span>
        </button>
      </div>
  
      {#if !config.use24Hours}
        <select 
          class="beach-datepicker__time-period"
          value={hours >= 12 ? 'PM' : 'AM'}
          on:change={(e) => {
            const target = e.target;
            if (!(target instanceof HTMLSelectElement)) return;
            const isPM = target.value === 'PM';
            hours = (hours % 12) + (isPM ? 12 : 0);
            emitChange();
          }}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      {/if}
    </div>
  </div>