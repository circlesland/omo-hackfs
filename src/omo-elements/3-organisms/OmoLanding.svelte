<script>
  import OmoButton from "./../1-atoms/OmoButton";
  import OmoHero from "./../2-molecules/OmoHero";
  import OmoImageGrid from "./../2-molecules/OmoImageGrid";

  export let hero = {
    uptitle: "omo earth dapp starter",
    title: "welcome to the omo dapp builder"
  };

  export let button = {
    text: "Getting Started",
    design: "btn-secondary btn-xl"
  };
</script>

<style>
  .wrap {
    @apply p-12;
  }
  .center {
    @apply flex justify-center;
  }
</style>

<OmoHero data={hero} />

<div class="center">
  <OmoButton data={button} />
</div>

<div class="wrap">
  <OmoImageGrid />
</div>
