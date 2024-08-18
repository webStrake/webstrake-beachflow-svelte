<script>export let legend;
export let selected = null;
</script>
  
  <fieldset class="radio-group">
    <legend class="radio-group-legend">{legend}</legend>
    <div class="radio-group-options">
      <slot {selected}></slot>
    </div>
  </fieldset>