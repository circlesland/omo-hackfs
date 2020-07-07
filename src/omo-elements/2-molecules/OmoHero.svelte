<script>
  export let data = {
    uptitle: "uptitle",
    title: "title",
    subline: "subline",
    text: ""
  };
</script>

<style>
  .wrap {
    @apply flex flex-col text-center mx-auto py-16;
  }
  .inside {
    @apply mx-auto text-center;
  }
  .uptitle {
    @apply text-gray-500 uppercase py-4 text-green-400 font-bold;
  }
  .title {
    @apply uppercase text-4xl text-blue-900 mb-1;
  }
  .subline {
    @apply text-xl text-gray-600 italic font-light tracking-wide mb-6 py-4;
  }
  .text {
    @apply text-gray-700 font-light mb-6 py-4;
  }
</style>

<div class="wrap">
  <div class="inside">
    <p class="uptitle">{data.uptitle}</p>
    <h1 class="title">{data.title}</h1>
    {#if data.subline}
      <div class="subline">{data.subline}</div>
    {/if}
    {#if data.text}
      <div class="text">{data.text}</div>
    {/if}
  </div>
</div>
