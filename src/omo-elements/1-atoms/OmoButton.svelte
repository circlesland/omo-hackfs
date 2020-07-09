<script>
  export let data = {
    text: "button",
    design: "o-btn-primary",
    link: "/"
  };
</script>

<style>
  .o-btn-primary {
    @apply bg-primary text-white font-bold py-2 px-4 rounded;
  }

  .o-btn-secondary {
    @apply bg-secondary text-white font-bold py-2 px-4 rounded;
  }

  .o-btn-xl {
    @apply text-xl;
  }
  .o-btn-sm {
    @apply py-1 px-3;
  }

  .o-btn-primary:hover {
    @apply bg-blue-800;
  }

  .o-btn-secondary:hover {
    @apply bg-green-400;
  }
</style>

<a class={data.design} href={data.link}>{data.text}</a>
