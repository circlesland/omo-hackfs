<script>
  import OmoLayoutOverflowY from "./../4-layouts/OmoLayoutOverflowY";
  import OmoDappGrid from "./../3-organisms/OmoDappGrid";
  import OmoHero from "./../2-molecules/OmoHero";

  export let hero = {
    uptitle: "Not Authenticated",
    title: "Please login in"
  };

  export let omo;

  o.store.odentity.currentOmo().then(o => {
    omo = o;
  });
</script>

{#if omo != null}
  <OmoLayoutOverflowY>
    <OmoDappGrid />
  </OmoLayoutOverflowY>
{:else}
  <div class="flex flex-col h-full justify-center">
    <div class="text-grey-darker text-center bg-grey-light px-4 py-2 m-2">
      <OmoHero data={hero} />
    </div>
  </div>
{/if}
