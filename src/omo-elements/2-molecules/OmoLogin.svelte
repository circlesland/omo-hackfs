<script>
  import Odentity from "./../5-pages/Odentity.svelte";
  import { mnemonicToEntropy } from "bip39";
  import Web3 from "web3";
  import ApolloClient, { gql } from "apollo-boost";
  import { query } from "svelte-apollo";
  import { getSafeAddressAsync } from "./../../omo-data/queries/circles";

  const web3 = new Web3();

  const client = new ApolloClient({
    uri:
      "https://graph.circles.garden/subgraphs/name/CirclesUBI/circles-subgraph"
  });

  export let data = {
    welcome: "Welcome. Omo Sapiens.",
    image: "https://source.unsplash.com/random",
    magiclink: "magic login link has been send to your mail account",
    button: "Login with Email Link"
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
      if (o.odentity._current.circleSafe) {
        navigate("omosafe");
      } else {
        navigate("mamaomo");
      }
    });
  }
  export let loading = false;

  $: seedPhrase = "";

  async function restoreFromSeed() {
    const restoredKey = mnemonicToEntropy(seedPhrase);
    const privateKey = `0x${restoredKey}`;
    const safeOwner = web3.eth.accounts.privateKeyToAccount(privateKey);
    localStorage.setItem("safeOwner", JSON.stringify(safeOwner));
    const safeAddress = await getSafeAddressAsync(safeOwner);
    localStorage.setItem("safe", JSON.stringify({ safeAddress: safeAddress }));
    navigate("omosafe");
  }
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
            hover:bg-secondary p-2">
            {data.button}
          </button>
        </form>

        <!-- <form
          class="flex flex-col pt-3 md:pt-8"
          onsubmit="event.preventDefault();">
          <div class="flex flex-col pt-6">
            <input
              type="text"
              id="text"
              bind:value={seedPhrase}
              placeholder="mnenomic seed phrase"
              class="appearance-none border rounded w-full py-4 px-6
              text-gray-700 text-xl mt-1 leading-tight focus:outline-none
              focus:shadow-outline" />
          </div>

          <button
            on:click={restoreFromSeed}
            type="submit"
            value="Log In"
            class="bg-pink-700 rounded text-white font-bold text-lg
            hover:bg-secondary p-2">
            Login with Circles Seedphrase
          </button>
        </form> -->
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
