<script>
  export let title = "title";
</script>

<style>
  @font-face {
    font-family: "OstrichSansHeavy";
    font-weight: 500;
    src: url("/fonts/ostrich/OstrichSansHeavy.woff") format("woff");
  }
  .omo-font-title {
    font-family: OstrichSansHeavy;
    @apply uppercase text-6xl text-blue-900 mb-1;
  }
</style>

<h1 class="omo-font-title">{title}</h1>
