<script>export let text;
export let position = "top";
</script>

<div class="tooltip {position}">
  <slot></slot>
  <span class="tooltip-text">{text}</span>
</div>