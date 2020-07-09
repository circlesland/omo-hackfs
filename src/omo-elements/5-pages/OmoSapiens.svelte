<script>
  import OmoProfileGrid from "./../2-molecules/OmoProfileGrid";
  import OmoLayoutOverflowY from "./../4-layouts/OmoLayoutOverflowY";

  // export let omos = [
  //   {
  //     id: "1",
  //     name: "Samuel",
  //     image: "/profiles/samuel.jpg",
  //     link: "",
  //     locked: false
  //   }
  // ];
  export let omos = [];

  fetch("https://randomuser.me/api?results=24")
    .then(response => response.json())
    .then(
      data =>
        (omos = data.results.map(item => {
          item.name = item.name.first;
          item.image = item.picture.large;
          return item;
        }))
    );
</script>

<style>
  .wrap {
    @apply p-6;
  }
</style>

<OmoLayoutOverflowY>
  <OmoProfileGrid logos={omos} />
</OmoLayoutOverflowY>
