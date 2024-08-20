<script>export let value;
export let min = 0;
export let max = 100;
export let step = 1;
export let color = "primary";
export let size = "md";
export let showValue = false;
$: percentage = (value - min) / (max - min) * 100;
$: thumbPosition = `calc(${percentage}% + (${8 - percentage * 0.16}px))`;
</script>

<div class="range-container {size}">
  <input
      type="range"
      bind:value
      {min}
      {max}
      {step}
      class="range {color}"
  />
  <div class="range-track">
      <div class="range-fill {color}" style="width: {percentage}%"></div>
  </div>
  <div class="range-thumb {color}" style="left: {thumbPosition}">
      {#if showValue}
          <div class="range-value">{value}</div>
      {/if}
  </div>
</div>