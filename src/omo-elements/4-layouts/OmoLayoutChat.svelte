<style>
  .omo-layout {
    display: grid;
    grid-template-areas:
      "content-top aside-top"
      "content-bottom aside-bottom ";
    grid-template-columns: 1fr 24rem;
    grid-template-rows: 1fr 3rem;
    overflow: hidden;
  }
  .aside-top {
    grid-area: aside-top;
    overflow-y: scroll;
  }
  .aside-bottom {
    grid-area: aside-bottom;
  }
  .content-top {
    grid-area: content-top;
    overflow-y: scroll;
  }
  .content-bottom {
    grid-area: content-bottom;
  }
</style>

<div class="omo-layout">
  <div class="aside-top">
    <slot name="aside-top" />
  </div>
  <div class="aside-bottom">
    <slot name="aside-bottom" />
  </div>
  <div class="content-top">
    <slot name="content-top" />
  </div>
  <div class="content-bottom">
    <slot name="content-bottom" />
  </div>
</div>
