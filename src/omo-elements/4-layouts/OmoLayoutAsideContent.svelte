<style>
  .omo-layout {
    min-height: 100%;
    display: grid;
    grid-template-columns: 20rem 1fr;
    grid-template-rows: 1fr;
  }
  aside {
    min-height: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    @apply bg-gray-200;
    overflow: hidden;
  }
  .content {
    min-height: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    overflow: hidden;
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
