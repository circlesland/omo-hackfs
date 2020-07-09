<style>
  .omo-block {
    min-height: 100%;
    display: grid;
    grid-template-areas: "full";
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
  .full {
    grid-area: full;
  }
</style>

<div class="omo-block">
  <div class="full flex flex-col justify-center">
    <slot name="full" />
  </div>
</div>
