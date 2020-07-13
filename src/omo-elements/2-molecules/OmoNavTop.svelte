<script>
  import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";
  import OmoButton from "./../1-atoms/OmoButton.svelte";

  export let home = "javascript:navigate('home')";
</script>

<style>
  a {
    @apply text-primary;
  }
</style>

<OmoIconsFA />
<header class="bg-secondary">
  <nav class="flex justify-between w-full bg-gray-200 text-primary">
    <i class="fas fa-arrow-left p-2 hover:bg-secondary" />
    <div class="pt-1 justify-center">
      <a href={home}>
        <img class="h-6" src="/logos/omo.svg" alt="logo" />
      </a>
    </div>
    <i class="fas fa-arrow-right p-2 hover:bg-secondary" />
  </nav>
</header>
