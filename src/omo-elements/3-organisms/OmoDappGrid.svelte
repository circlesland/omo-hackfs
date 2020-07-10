<script>
  import OmoImageGrid from "./../2-molecules/OmoImageGrid";
  import OmoHero from "./../2-molecules/OmoHero";

  let omo = { _id: "adgadf" };

  store.odentity.currentOmo().then(o => {
    omo = o;
  });

  $: hero = {
    uptitle: "My Omo Sapiens Universe",
    title: `Welcome Omo ${omo.firstname ? omo.firstname : omo._id}`
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
    },
    {
      id: "3",
      name: "Contacts",
      image: "/logos/chat.svg",
      link: "?page=omosapiens",
      locked: true
    },
    {
      id: "4",
      name: "Omo Pay",
      image: "/logos/chat.svg",
      link: "?page=omopay",
      locked: true
    },
    {
      id: "5",
      name: "Handbook",
      image: "/logos/chat.svg",
      link: "?page=docs",
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
