<script>
  export let data = {
    welcome: "Welcome. Omo Sapiens.",
    image: "https://source.unsplash.com/random",
    magiclink: "magic login link has been send to your mail account",
    button: "send login link"
  };

  export let mail;

  function login() {
    loading = true;
    o.odentity.login(mail, "email", async it => {
      if (o.odentity.current == null) {
        loading = false;
        alert("something went wrong.");
      }
      console.log(it);
      var urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("redirect")) {
        window.navigate(urlParams.get("redirect"), urlParams.get("data"));
        return;
      }
      navigate("mamaomo");
    });
  }
  export let loading = false;
</script>

<div class="w-full flex flex-wrap">

  <div class="w-full md:w-1/2 flex flex-col">

    <div
      class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0
      px-8 md:px-24 lg:px-32">

      {#if !loading}
        <h1 class="text-center text-4xl text-primary">
          Welcome.
          <br />
          Omo Sapiens.
        </h1>
        <form
          class="flex flex-col pt-3 md:pt-8"
          onsubmit="event.preventDefault();">
          <div class="flex flex-col pt-6">
            <input
              type="email"
              id="email"
              bind:value={mail}
              placeholder="your@mail.earth"
              class="appearance-none border rounded w-full py-4 px-6
              text-gray-700 text-xl mt-1 leading-tight focus:outline-none
              focus:shadow-outline" />
          </div>

          <button
            on:click={login}
            type="submit"
            value="Log In"
            class="bg-primary rounded text-white font-bold text-lg
            hover:bg-secondary p-2 mt-8">
            {data.button}
          </button>
        </form>
      {:else}
        <h1 class="text-center text-2xl text-primary">{data.magiclink}</h1>
      {/if}

    </div>

  </div>

  <!-- Image Section -->
  <div class="w-1/2 ">
    <img
      class="object-cover w-full h-screen hidden md:block"
      src={data.image}
      alt={data.welcome} />
  </div>
</div>
