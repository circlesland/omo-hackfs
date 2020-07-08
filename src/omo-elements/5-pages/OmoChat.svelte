<script>
  import OmoAsideMainLayout from "./../4-layouts/OmoAsideMainLayout";
  import OmoChatFlow from "./../3-organisms/OmoChatFlow";
  import OmoChatMembers from "./../3-organisms/OmoChatMembers";
</script>

<style>
  .left {
    @apply bg-gray-200 h-full;
  }
  .item {
    @apply text-xl;
  }
</style>

<OmoAsideMainLayout>
  <div slot="left" class="left">
    <OmoChatMembers />
  </div>

  <div slot="right" class="right">
    <OmoChatFlow />
  </div>

</OmoAsideMainLayout>
