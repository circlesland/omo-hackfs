<script>
  import OmoImageGrid from "./../2-molecules/OmoImageGrid";
  import OmoHero from "./../2-molecules/OmoHero";

  export let hero = {
    uptitle: "My Omo Sapiens Universe",
    title: "Hello Omo",
    subline:
      "Please create first your omo sapiens odentity, by signing up on the odentity dapp to unlock your chat dapp"
  };
  export let logos = [
    {
      id: "1",
      name: "Odentity",
      image: "/logos/identity.svg",
      link: "?page=odentity",
      locked: false
    },
    {
      id: "2",
      name: "Omo Chat",
      image: "/logos/chat.svg",
      link: "?page=omochat",
      locked: true
    }
  ];
</script>

<style>
  .wrap {
    @apply p-6;
  }
</style>

<OmoHero data={hero} />

<div class="wrap">
  <OmoImageGrid {logos} />
</div>
