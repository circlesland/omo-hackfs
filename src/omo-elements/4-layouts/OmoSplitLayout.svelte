<style>
  .omo-block {
    min-height: 100%;
    display: grid;
    grid-template-areas: "left right";
    grid-template-columns: 50% 50%;
  }
  .left {
    grid-area: left;
  }
  .right {
    grid-area: right;
  }
</style>

<div class="omo-block">
  <div class="left">
    <slot name="left" />
  </div>
  <div class="right">
    <slot name="right" />
  </div>
</div>
