<script>
  import OmoHero from "./../2-molecules/OmoHero";

  export let hero = {
    uptitle: "Odentity",
    title: "Signup / Login"
  };

  export let mail;
</script>

<OmoHero data={hero} />

<div class="flex justify-center flex-wrap">
  <div class="mt-12">
    <form class="flex">
      <input
        class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
        border-gray-200 bg-white"
        placeholder="enter your mail"
        bind:value={mail} />
      <button
        on:click={ChatRoom.initNew(mail)}
        class="px-6 bg-green-400 text-gray-800 font-bold p-3 uppercase">
        Save
      </button>
    </form>
  </div>
</div>
