<style>
  .omo-block {
    display: grid;
    grid-template-columns: 25% 75%;
    height: 100%;
  }
</style>

<div class="omo-block">
  <slot name="left" />
  <slot name="right" />
</div>
