<script>
  import OmoButton from "./../1-atoms/OmoButton";
  import OmoBanner from "./../2-molecules/OmoBanner";

  const vision = {
    title: "seed your dreams",
    subline:
      "and grow your passions like nature while empowering the emerging universal basic income economy of tomorrow",
    image: "/images/joyfulwomen.jpg"
  };
</script>

<style>
  .wrap {
    @apply flex justify-center py-2 bg-secondary;
  }
</style>

<OmoBanner quant={vision} />
