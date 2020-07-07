<style>
  .omo-block {
    display: grid;
    grid-template-columns: 50% 50%;
  }
</style>

<div class="omo-block">
  <slot name="left" />
  <slot name="right" />
</div>
