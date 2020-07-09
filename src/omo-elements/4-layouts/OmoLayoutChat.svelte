<style>
  .omo-layout {
    display: grid;
    grid-template-columns: 24rem 1fr;
    grid-template-rows: 1fr 3rem;
    overflow: hidden;
  }
  .scroll {
    overflow-y: scroll;
  }
</style>

<div class="omo-layout">
  <div class="aside-top scroll">
    <slot name="aside-top" />
  </div>
  <div class="aside-top scroll">
    <slot name="content-top" />
  </div>
  <div class="aside-bottom">
    <slot name="aside-bottom" />
  </div>
  <div class="content-bottom">
    <slot name="content-bottom" />
  </div>
</div>
