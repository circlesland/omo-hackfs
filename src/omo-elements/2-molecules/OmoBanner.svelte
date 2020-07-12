<script>
  import OmoFonts from "../1-atoms/OmoFonts";
  import OmoTitle from "../1-atoms/OmoTitle";

  export let quant = {
    title: "one quantum leap a time",
    subline: "subline",
    image: "https://source.unsplash.com/random"
  };
</script>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap");
  .omo-font-title {
    font-family: "Montserrat", sans-serif;
    font-weight: 900;
    @apply uppercase text-secondary;
  }
</style>

<div
  class="bg-cover bg-center h-auto text-white py-48 px-16 object-fill"
  style="background-image: url({quant.image})">
  <div
    class="md:w-2/3 m-auto text-center px-16 py-8"
    style="background-color: rgba(11, 42, 77, 0.5);">
    <!-- <p class="text-gray-300 text-s uppercase text-green-400 font-bold">
      {quant.uptitle}
    </p> -->
    <h1 class="omo-font-title text-4xl md:text-5xl lg:text-6xl">
      {quant.title}
    </h1>
    <p
      class="font-light font-sans tracking-wide text-xl md:text-2xl lg:text-3xl
      text-white">
      {quant.subline}
    </p>
  </div>
</div>
