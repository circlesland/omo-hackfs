<script>
  import OmoButton from "./../1-atoms/OmoButton";
  import OmoBanner from "./../2-molecules/OmoBanner";

  const vision = {
    title: "we invest in your dreams",
    subline:
      "seed your dreams and grow your passions like nature around the emerging universal basic income economy of tomorrow",
    image: "/images/joyfulwomen.jpg"
  };
</script>

<style>
  .wrap {
    @apply flex justify-center py-2 bg-secondary;
  }
</style>

<OmoBanner quant={vision} />
