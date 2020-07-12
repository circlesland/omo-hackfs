<script>
  import OmoImageGrid from "./../2-molecules/OmoImageGrid";
  import OmoHero from "./../2-molecules/OmoHero";

  let omo = { _id: "adgadf" };

  o.store.odentity.currentOmo().then(o => {
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
      link: "javascript:navigate('odentity')",
      locked: false
    },
    {
      id: "2",
      name: "Omo Chat",
      image: "/logos/chat.svg",
      link: "javascript:navigate('omochat')",
      locked: true
    },
    {
      id: "3",
      name: "Contacts",
      image: "/logos/chat.svg",
      link: "javascript:navigate('omosapiens')",
      locked: true
    },
    {
      id: "4",
      name: "Omo Pay",
      image: "/logos/chat.svg",
      link: "javascript:navigate('omopay')",
      locked: true
    },
    {
      id: "5",
      name: "Handbook",
      image: "/logos/chat.svg",
      link: "javascript:navigate('docs')",
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
