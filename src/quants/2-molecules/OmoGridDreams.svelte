<script>
  import OmoCardDream from "../2-molecules/OmoCardDream.svelte";
  // import OmoCardVote from "../2-molecules/OmoCardVote.svelte";
  // import OmoCardPreOrder from "../2-molecules/OmoCardPreOrder.svelte";
  // import OmoCardPatron from "../2-molecules/OmoCardPatron.svelte";
  // import OmoCardPreneur from "../2-molecules/OmoCardPreneur.svelte";

  import {onMount} from "svelte";
  // import OmoTabs from "./../2-molecules/OmoTabs.svelte";
  import mocker from "mocker-data-generator";

  // List of tab items with labels and values.
  // let tabItems = [
  //   { label: "I want to dream", value: 1 },
  //   { label: "I want to vote", value: 2 },
  //   { label: "I want to consume", value: 3 },
  //   { label: "I want to buy vouchers", value: 4 },
  //   { label: "I want to build a franchise", value: 5 }
  // ];

  // Current active tab
  // let currentTab;

  let omodreams = [];
  let omovotes = [];
  let omopreorders = [];
  let omopatrons = [];
  let omopreneurs = [];

  const vote = {
    name: {
      faker: "commerce.product",
      unique: true
    },
    createdAt: {
      faker: "date.past"
    },
    price: {
      faker: 'random.number({"min": 1, "max": 25})'
    },
    follower: {
      faker: 'random.number({"min": 13, "max": 143})'
    },
    discount: {
      values: [100, 90, 80, 70, 60]
    },
    description: {
      faker: "random.words(12)"
    },
    city: {
      faker: "address.city"
    },
    group: {
      faker: "company.companyName"
    },
    image: {
      function: function () {
        return "https://source.unsplash.com/featured/?" + this.object.name;
      }
    }
  };

  const preorder = {
    name: {
      faker: "commerce.product",
      unique: true
    },
    createdAt: {
      faker: "date.past"
    },
    price: {
      faker: 'random.number({"min": 1, "max": 25})'
    },
    follower: {
      faker: 'random.number({"min": 144, "max": 1596})'
    },
    discount: {
      values: [50, 33, 20, 12.5, 7.69]
    },
    description: {
      faker: "random.words(12)"
    },
    city: {
      faker: "address.city"
    },
    group: {
      faker: "company.companyName"
    },
    image: {
      function: function () {
        return "https://source.unsplash.com/featured/?" + this.object.name;
      }
    }
  };

  const patron = {
    name: {
      faker: "commerce.product",
      unique: true
    },
    createdAt: {
      faker: "date.past"
    },
    coupon: {
      values: [
        {value: 5, discount: 33.33},
        {value: 55, discount: 20},
        {value: 610, discount: 12.5},
        {value: 6765, discount: 7.69},
        {value: 75025, discount: 4.76},
        null
      ]
    },
    follower: {
      faker: 'random.number({"min": 0, "max": 50})'
    },
    description: {
      faker: "random.words(12)"
    },
    city: {
      faker: "address.city"
    },
    group: {
      faker: "company.companyName"
    },
    image: {
      function: function () {
        return "https://source.unsplash.com/featured/?" + this.object.name;
      }
    }
  };

  const preneur = {
    name: {
      faker: "commerce.product",
      unique: true
    },
    createdAt: {
      faker: "date.past"
    },
    price: {
      faker: 'random.number({"min": 1, "max": 25})'
    },
    follower: {
      faker: 'random.number({"min": 17710, "max": 19647})'
    },
    discount: {
      values: [50, 33, 20, 12.5, 7.69]
    },
    description: {
      faker: "random.words(12)"
    },
    city: {
      faker: "address.city"
    },
    group: {
      faker: "company.companyName"
    },
    image: {
      function: function () {
        return "https://source.unsplash.com/featured/?" + this.object.name;
      }
    }
  };

  onMount(async () => {
    const dreamers = await fetch("https://www.randomtext.me/api/p-20/10-16")
            .then(response => response.json())
            .then(data => {
              var texts = data.text_out.split("<p>");
              fetch("https://randomuser.me/api?results=20")
                      .then(response => response.json())
                      .then(
                              data =>
                                      (omodreams = data.results.map((item, i) => {
                                        item.first = item.name.first;
                                        item.last = item.name.last;
                                        item.city = item.location.city;
                                        item.profile = item.picture.large;
                                        item.image = `https://source.unsplash.com/featured/?${item.location.city},city`;
                                        item.follower = Math.floor(Math.random() * 11 + 1);
                                        item.dream = texts[i + 1].replace("</p>", "");
                                        return item;
                                      }))
                      );
            });
    mocker()
            .schema("vote", vote, 20)
            .schema("preorder", preorder, 20)
            .schema("patron", patron, 20)
            .schema("preneur", preneur, 20)
            .build()
            .then(
                    data => {
                      omovotes = data.vote;
                      omopreorders = data.preorder;
                      omopatrons = data.patron;
                      omopreneurs = data.preneur;
                    },
                    err => console.error(err)
            );
  });
</script>

<style>
  section {
    @apply grid gap-10 mx-auto;
  }
</style>

<!-- <OmoTabs bind:activeTabValue={currentTab} items={tabItems} class="pb-4" /> -->

<div class="px-4 py-4 md:p-16 lg:py-20 lg:px-32 overflow-y-scroll">

  <section class=" grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {#each omodreams as data, i (data.id)}
      <OmoCardDream {data}/>
    {/each}
  </section>

  <!-- {#if 2 === currentTab}
    <section class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {#each omovotes as data, i (data.id)}
        <OmoCardVote {data} />
      {/each}
    </section>
  {/if}

  {#if 3 === currentTab}
    <section class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {#each omopreorders as data, i (data.id)}
        <OmoCardPreOrder {data} />
      {/each}
    </section>
  {/if}

  {#if 4 === currentTab}
    <section class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {#each omopatrons as data, i (data.id)}
        <OmoCardPatron {data} />
      {/each}
    </section>
  {/if}

  {#if 5 === currentTab}
    <section class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {#each omopreneurs as data, i (data.id)}
        <OmoCardPreneur {data} />
      {/each}
    </section>
  {/if} -->
</div>
