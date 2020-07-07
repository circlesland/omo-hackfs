<script>
  export let data = {
    name: "name",
    image: "image",
    link: "link"
  };
</script>

<style>
  .wrap {
    @apply flex flex-col max-w-sm mx-auto rounded shadow;
  }
  .link {
    @apply bg-gray-100 rounded;
  }
  .link:hover {
    @apply bg-blue-100;
  }
  .image {
    @apply h-auto w-full object-cover;
  }
  .inside-wrap {
    @apply px-4 py-2;
  }
  .name {
    @apply text-center text-blue-900 text-sm font-bold uppercase;
  }
</style>

<div class="wrap">
  <a href={data.link} class="link">
    <img class="image" src={data.image} alt="image" />
    <div class="inside-wrap">
      <h1 class="name">{data.name}</h1>
    </div>
  </a>
</div>
