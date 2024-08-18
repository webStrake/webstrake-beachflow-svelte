<script>export let type = "linear";
export let variant = "determinate";
export let value = 0;
export let color = "primary";
export let size = "md";
const getCircleParams = (size2) => {
  switch (size2) {
    case "sm":
      return { size: 32, stroke: 3 };
    case "lg":
      return { size: 64, stroke: 5 };
    default:
      return { size: 48, stroke: 4 };
  }
};
const circleParams = getCircleParams(size);
const radius = (circleParams.size - circleParams.stroke) / 2;
const circumference = 2 * Math.PI * radius;
const offset = variant === "determinate" ? circumference - value / 100 * circumference : circumference * 0.25;
</script>

{#if type === 'linear'}
  <div role="progressbar" aria-valuenow={variant === 'determinate' ? value : null} aria-valuemin="0" aria-valuemax="100" class="progress-linear {size} {color}">
    <div class="progress-linear-fill {variant}" style="width: {variant === 'determinate' ? `${value}%` : '100%'};"></div>
  </div>
{:else}
  <div role="progressbar" aria-valuenow={variant === 'determinate' ? value : null} aria-valuemin="0" aria-valuemax="100" class="progress-circular {size} {color}">
    <svg class="progress-circular-svg" viewBox="0 0 {circleParams.size} {circleParams.size}">
      <circle 
        class="progress-circular-background" 
        stroke-width={circleParams.stroke} 
        r={radius} 
        cx={circleParams.size/2} 
        cy={circleParams.size/2}
      ></circle>
      <circle 
        class="progress-circular-fill {variant}"
        stroke-width={circleParams.stroke}
        stroke-dasharray={circumference}
        stroke-dashoffset={offset}
        r={radius}
        cx={circleParams.size/2}
        cy={circleParams.size/2}
      ></circle>
    </svg>
    {#if variant === 'determinate'}
      <span class="progress-circular-label">{value}%</span>
    {/if}
  </div>
{/if}