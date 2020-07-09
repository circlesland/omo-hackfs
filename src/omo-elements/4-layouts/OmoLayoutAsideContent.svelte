<style>
  .omo-layout {
    display: grid;
    grid-template-columns: 24rem 1fr;
    grid-template-rows: 1fr;
  }
  aside {
    min-height: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
  }
  .content {
    min-height: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
  }
</style>

<div class="omo-layout">
  <aside>
    <slot name="aside" />
  </aside>
  <div class="content">
    <slot name="content" />
  </div>
</div>
