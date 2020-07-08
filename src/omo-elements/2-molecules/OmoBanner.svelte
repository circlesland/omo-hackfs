<script>
  import OmoFonts from "./../1-atoms/OmoFonts";

  export let quant = {
    title: "one quantum leap a time",
    subline: "subline",
    image: "https://source.unsplash.com/random"
  };
</script>

<style>
  .omo-font-title {
    font-family: OstrichSansHeavy;
  }
  .omo-text-xl {
    font-size: 5rem;
  }
</style>

<div
  class="bg-cover bg-center rounded h-auto text-white py-48 px-16 object-fill"
  style="background-image: url({quant.image})">
  <div
    class="md:w-2/3 m-auto text-center px-16 py-8 rounded"
    style="background-color: rgba(11, 42, 77, 0.5);">
    <!-- <p class="text-gray-300 text-s uppercase text-green-400 font-bold">
      {quant.uptitle}
    </p> -->
    <p class="omo-font-title omo-text-xl font-bold text-green-500 uppercase">
      {quant.title}
    </p>
    <p class="-mt-8 font-light font-sans tracking-wide text-3xl text-gray-400">
      {quant.subline}
    </p>
  </div>
</div>
