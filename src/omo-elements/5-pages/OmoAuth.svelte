<script>
  import OmoHero from "../2-molecules/OmoHero";
  export let hero = {
    uptitle: "Login / Signup",
    title: "Omo Auth"
  };
  export let mail;
  function login() {
    loading = true;
    o.store.odentity.login(mail, "email", async it => {
      var omo = await o.store.odentity.currentOmo();
      if (omo != null) navigate("odentity");
      else alert("something went wrong");
      loading = false;
    });
  }
  export let loading = false;
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
    {#if !loading}
      <div class="flex">
        <input
          bind:value={mail}
          class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
          border-gray-200 bg-white"
          placeholder="enter your mail" />
        <button
          on:click={login}
          class="px-6 bg-green-400 text-gray-800 font-bold p-3 uppercase">
          login
        </button>
      </div>
      <p class="text-gray-400 hover:text-secondary text-center mt-2">
        change auth provider
      </p>
    {:else}
      <p>loading...</p>
    {/if}
  </div>
</div>
