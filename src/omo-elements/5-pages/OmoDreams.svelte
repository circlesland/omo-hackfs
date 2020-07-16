<script>
  import OmoDappGrid from "./../3-organisms/OmoDappGrid.svelte";
  import OmoLayoutOverflowY from "./../4-layouts/OmoLayoutOverflowY";
  import OmoGridDreams from "./../2-molecules/OmoGridDreams";
  import OmoHero from "./../2-molecules/OmoHero";

  // export let dreams = [];

  // o.graphql
  //   .query("Dreams {_id first last profile image follower city dream}")
  //   .then(result => {
  //     dreams = result.data.Dreams;
  //     if (result.data.Dreams.length == 0) seed();
  //   });

  // function seed() {
  //   fetch("https://www.randomtext.me/api/p-20/10-15")
  //     .then(response => response.json())
  //     .then(data => {
  //       var texts = data.text_out.split("<p>");
  //       fetch("https://randomuser.me/api?results=20")
  //         .then(response => response.json())
  //         .then(data => {
  //           debugger;
  //           let seed = data.results.map((item, i) => {
  //             item.first = item.name.first;
  //             item.last = item.name.last;
  //             item.profile = item.picture.large;
  //             item.image = `https://source.unsplash.com/featured/?${item.location.city},city`;
  //             item.follower = "" + Math.floor(Math.random() * 12 + 1);
  //             item.dream = texts[i + 1].replace("</p>", "");
  //             item.city = item.location.city;
  //             return item;
  //           });
  //           var coll = o.quantum.getCollectionWithoutSchema("Dream");
  //           coll.createMany(seed);
  //         });
  //     });
  // }

  export let hero = {
    uptitle: "DREAMERS",
    title: "omos dream small and big, local and global",
    bg: "bg-gray-200"
  };
</script>

<OmoLayoutOverflowY>
  <OmoHero data={hero} />
  <!-- <OmoGridDreams {dreams} /> -->
</OmoLayoutOverflowY>
