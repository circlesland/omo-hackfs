<script>
  export let data = { title: "title" };
</script>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap");
  .omo-font-title {
    font-family: "Montserrat", sans-serif;
    font-weight: 900;
    @apply uppercase text-primary;
  }
</style>

<h1 class="omo-font-title">{data.title}</h1>
