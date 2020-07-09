<script>
  import OmoHero from "./../2-molecules/OmoHero";
  export let hero = {
    uptitle: "Login / Signup",
    title: "Omo Auth"
  };
  export let mail;
</script>

<style>
  .omo-auth {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    overflow: hidden;
  }
</style>

<div class="omo-auth flex flex-col justify-center items-center w-1/2 mx-auto">
  <div class="-mt-32">
    <OmoHero data={hero} />
    <div class="flex">
      <input
        class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
        border-gray-200 bg-white"
        placeholder="enter your mail" />
      <a href="?page=odentity">
        <button class="px-6 bg-green-400 text-gray-800 font-bold p-3 uppercase">
          login
        </button>
      </a>
    </div>
    <p class="text-gray-400 hover:text-secondary text-center mt-2">
      change auth provider
    </p>

  </div>
</div>
