<script>
  import OmoButton from "./../1-atoms/OmoButton";
  import OmoBanner from "./../2-molecules/OmoBanner";

  const vision = {
    title: "we invest in your dreams",
    subline: "COMING SOON (alpha test now)",
    image: "/images/joyfulwomen.jpg"
  };

  export let login = {
    text: "Test Login",
    design: "o-btn-primary o-btn-xl uppercase w-1/2 text-center",
    link: "/?page=omoauth"
  };
</script>

<style>
  .wrap {
    @apply flex justify-center py-2 bg-secondary;
  }
</style>

<OmoBanner quant={vision} />
