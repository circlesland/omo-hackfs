<script>
  import OmoButton from "./../1-atoms/OmoButton";
  import OmoHero from "./../2-molecules/OmoHero";
  import OmoImageGrid from "./../2-molecules/OmoImageGrid";
  import OmoBanner from "./../2-molecules/OmoBanner";

  const vision = {
    title: "share your dreams",
    subline: "and jump every year one quantum leap ahead of your time",
    image: "/images/joyfulwomen.jpg",
    button: true
  };

  export let hero = {
    uptitle: "omo earth",
    title: "we empower your dreams"
  };

  export let button = {
    text: "Getting Started",
    design: "o-btn-primary btn-xl",
    link: "/?page=docs"
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

  export let login = {
    text: "Login",
    design: "o-btn-secondary o-btn-sm",
    link: "/?page=odentity"
  };
</script>

<style>
  .wrap {
    @apply p-8;
  }
  .center {
    @apply flex justify-center py-2;
  }
</style>

<OmoBanner quant={vision} />

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
