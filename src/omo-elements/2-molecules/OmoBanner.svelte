<script>
  import OmoFonts from "./../1-atoms/OmoFonts";
  import OmoTitle from "./../1-atoms/OmoTitle";

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
    @apply uppercase text-6xl text-white;
  }
</style>

<div
  class="bg-cover bg-center rounded h-auto text-white py-48 px-16 object-fill"
  style="background-image: url({quant.image})">
  <div class="md:w-2/3 m-auto text-center px-16 py-8 rounded">
    <!-- <p class="text-gray-300 text-s uppercase text-green-400 font-bold">
      {quant.uptitle}
    </p> -->
    <h1 class="omo-font-title">{quant.title}</h1>
    <p
      class="font-light font-sans tracking-wide font-bold text-3xl text-gray-400">
      {quant.subline}
    </p>
  </div>
</div>
