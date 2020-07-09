<script>
  import OmoTitle from "./../1-atoms/OmoTitle";
  export let data = {
    uptitle: "uptitle",
    title: "title",
    subline: "subline",
    text: "",
    bg: ""
  };
</script>

<style>
  .wrap {
    @apply flex flex-col text-center mx-auto py-12;
  }
  .inside {
    @apply mx-auto text-center;
  }
  .uptitle {
    @apply text-secondary uppercase pt-4 font-bold;
  }
  .subline {
    @apply text-lg text-gray-600 italic font-light tracking-wide mb-6 py-4;
  }
  .text {
    @apply text-gray-700 font-light mb-6 py-4;
  }
</style>

<div class="wrap w-full {data.bg} rounded;">
  <div class="inside">
    <p class="uptitle">{data.uptitle}</p>
    <OmoTitle {data} />
    {#if data.subline}
      <div class="subline">{data.subline}</div>
    {/if}
    {#if data.text}
      <div class="text">{data.text}</div>
    {/if}
  </div>
</div>
