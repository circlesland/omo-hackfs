<script>
  import ApolloClient, { gql } from "apollo-boost";
  import { query } from "svelte-apollo";

  const client = new ApolloClient({
    uri:
      "https://graph.circles.garden/subgraphs/name/CirclesUBI/circles-subgraph"
  });

  let result;
  let balances = gql`
    query {
      balances {
        amount
        token {
          id
        }
        id
      }
    }
  `;
  result = query(client, {
    query: balances
  });
</script>

<main>
  hallo safe
  {#await $result}
    <p>loading</p>
  {:then x}
    <p>RESULT: {JSON.stringify(x)}</p>
  {/await}
</main>

<!-- <script>
  import OmoHero from "./../2-molecules/OmoHero";
  import OmoLayoutOverflowY from "./../4-layouts/OmoLayoutOverflowY";

  var user = window.restore("user");

  function saveUser(data) {
    user = data;
    window.store("user", user);
  }

  const data = {
    name: "sam"
  };
</script> -->

<!-- <OmoHero data={hero} /> -->

<!-- <OmoLayoutOverflowY> -->
<!-- 
  <div class="py-6 px-8 text-md">
    {#each transactions as item}
      <div class="flex h-12 mb-4 w-full bg-gray-100">
        <img alt="" src={item.picture.medium} class="h-full w-auto" />
        <p class="py-3 px-4 rounded w-full">{item.name.first}</p>
        {#if item.amount >= 0}
          <div class="h-12 py-1 px-3 text-2xl text-green-400">
            {item.amount}
          </div>
        {/if}
        {#if item.amount < 0}
          <div class="h-12 py-1 px-3 text-2xl text-red-400">{item.amount}</div>
        {/if}

      </div>
    {/each}
  </div> -->
<!-- </OmoLayoutOverflowY> -->
