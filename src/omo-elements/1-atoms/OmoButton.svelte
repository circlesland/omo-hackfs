<script>
  export let data = {
    text: "button",
    design: "btn-primary"
  };
</script>

<style>
  .btn-primary {
    @apply bg-blue-800 text-white font-bold py-2 px-4 rounded;
  }

  .btn-secondary {
    @apply bg-green-500 text-white font-bold py-2 px-4 rounded;
  }

  .btn-xl {
    @apply text-xl;
  }

  .btn-primary:hover {
    @apply bg-blue-400;
  }

  .btn-secondary:hover {
    @apply bg-green-400;
  }
</style>

<a class={data.design} href="/">{data.text}</a>
