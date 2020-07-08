<script>
  import OmoButton from "./../1-atoms/OmoButton";
  import OmoHero from "./../2-molecules/OmoHero";
  import OmoImageGrid from "./../2-molecules/OmoImageGrid";

  export let hero = {
    uptitle: "omo earth starter template",
    title: "welcome to the omo dapp builder"
  };

  export let button = {
    text: "Getting Started",
    design: "btn-secondary btn-xl",
    link: "/?page=docs"
  };

  export let login = {
    text: "Login",
    design: "btn-primary btn-lg",
    link: "/?page=omosapiens"
  };

  export let logos = [
    {
      id: "1",
      name: "tailwind",
      image: "/logos/tailwind.png",
      link: "https://tailwindcss.com"
    },
    {
      id: "2",
      name: "svelte",
      image: "/logos/svelte.png",
      link: "https://svelte.dev"
    },
    {
      id: "3",
      name: "graphql",
      image: "/logos/graphql.png",
      link: "https://graphql.org"
    },
    {
      id: "4",
      name: "textile",
      image: "/logos/textile.png",
      link: "https://textile.io"
    },
    {
      id: "5",
      name: "ipfs",
      image: "/logos/ipfs.png",
      link: "https://ipfs.io"
    },
    {
      id: "6",
      name: "circles ubi",
      image: "/logos/circles.png",
      link: "https://www.joincircles.net"
    }
  ];
</script>

<style>
  .wrap {
    @apply p-8;
  }
  .center {
    @apply flex justify-center py-2;
  }
</style>

<OmoHero data={hero} />

<div class="center">
  <OmoButton data={button} />
</div>

<div class="center">
  <OmoButton data={login} />
</div>

<div class="wrap">
  <OmoImageGrid {logos} />
</div>
