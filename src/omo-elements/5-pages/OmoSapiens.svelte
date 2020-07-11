<script>
  import OmoLayoutOverflowY from "./../4-layouts/OmoLayoutOverflowY";
  import OmoGridDreams from "./../2-molecules/OmoGridDreams";
  import OmoHero from "./../2-molecules/OmoHero";

  export let dreams = [];

  fetch("https://www.randomtext.me/api/p-20/10-20")
    .then(response => response.json())
    .then(data => {
      var texts = data.text_out.split("<p>");
      fetch("https://randomuser.me/api?results=20")
        .then(response => response.json())
        .then(
          data =>
            (dreams = data.results.map((item, i) => {
              item.first = item.name.first;
              item.last = item.name.last;
              item.profile = item.picture.large;
              item.image = `https://source.unsplash.com/random?sig=${Math.floor(
                Math.random() * 100
              )}`;
              item.follower = Math.floor(Math.random() * 12 + 1);
              item.dream = texts[i + 1].replace("</p>", "");
              return item;
            }))
        );
    });

  export let hero = {
    uptitle: "DREAMERS",
    title: "omos dream small and big, local and global",
    bg: "bg-gray-200"
  };
</script>

<OmoLayoutOverflowY>
  <OmoHero data={hero} />
  <OmoGridDreams {dreams} />
</OmoLayoutOverflowY>
