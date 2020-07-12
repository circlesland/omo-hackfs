<script>
  import OmoImageGrid from "../2-molecules/OmoImageGrid";
  import OmoHero from "../2-molecules/OmoHero";

  let omo = { _id: "Omo" };

  o.store.odentity.currentOmo().then(o => {
    omo = o;
  });

  $: hero = {
    uptitle: "My Omo Sapiens Universe",
    title: `Welcome Omo `
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
      name: "Omo Funding",
      image: "/logos/chat.svg",
      link: "javascript:navigate('omofunding')",
      locked: true
    },
    {
      id: "4",
      name: "Dreams",
      image: "/logos/chat.svg",
      link: "?page=omosapiens",
      locked: true
    },
    {
      id: "5",
      name: "Omo Pay",
      image: "/logos/chat.svg",
      link: "javascript:navigate('omopay')",
      locked: true
    },
    {
      id: "6",
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
