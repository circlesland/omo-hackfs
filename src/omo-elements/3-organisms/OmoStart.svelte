<script>
  import OmoButton from "./../1-atoms/OmoButton";
  import OmoBanner from "./../2-molecules/OmoBanner";

  const vision = {
    title: "we invest in your dreams",
    subline: "grow with us your passions like nature",
    image: "/images/joyfulwomen.jpg"
  };
</script>

<style>
  .wrap {
    @apply flex justify-center py-2 bg-secondary;
  }
</style>

<OmoBanner quant={vision} />
