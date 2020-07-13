<script>
  export let data = {
    text: "button",
    design: "o-btn-primary",
    link: "/"
  };
</script>

<style>
  .o-btn-primary {
    @apply bg-primary text-white font-bold py-2 px-4;
  }

  .o-btn-secondary {
    @apply bg-secondary text-white font-bold py-2 px-4;
  }

  .o-btn-indigo {
    @apply bg-blue-600 text-white font-bold h-full py-2 px-4;
  }

  .o-btn-xl {
    @apply text-xl;
  }

  .o-btn-2xl {
    @apply text-2xl py-3;
  }
  .o-btn-sm {
    @apply py-1 px-3;
  }

  .o-btn-primary:hover {
    @apply bg-secondary;
  }

  .o-btn-secondary:hover {
    @apply bg-primary;
  }
</style>

<a class="{data.design} text-center" href={data.link}>{data.text}</a>
