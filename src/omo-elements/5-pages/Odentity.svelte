<script>
  import OmoHero from "./../2-molecules/OmoHero";

  export let hero = {
    uptitle: "Odentity",
    title: "Login"
  };

  export let mail;
</script>

<OmoHero data={hero} />

<div class="flex justify-center flex-wrap">
  <div class="mt-12 flex">
    <input
      class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
      border-gray-200 bg-white"
      placeholder="enter your mail" />
    <a href="?page=omodapps">
      <button class="px-6 bg-green-400 text-gray-800 font-bold p-3 uppercase">
        login
      </button>
    </a>
  </div>
</div>
