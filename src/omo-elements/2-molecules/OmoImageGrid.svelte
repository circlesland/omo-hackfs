<script>
  import OmoCard from "../2-molecules/OmoCard.svelte";
  const logos = [
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
    @apply py-4 grid gap-3;
  }
</style>

<div class="wrap grid-cols-3 md:grid-cols-6">
  {#each logos as data, i (data.id)}
    <OmoCard {data} />
  {/each}
</div>
