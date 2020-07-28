<script>
  import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";
  import OmoButton from "./../1-atoms/OmoButton.svelte";

  // export let home = "javascript:navigate('home')";
</script>

<OmoIconsFA />

<header>
  <nav class="flex justify-between w-full bg-gray-200 text-primary">
    <i class="fas p-2 hover:bg-secondary" />
    <div class="p-1 justify-center">
      <a href="javascript:navigate('omohome')">
        <img class="h-6" src="/logos/logo.png" alt="logo" />
      </a>
    </div>
    <a href="javascript:navigate('omonotifications')">
      <i class="fas fa-bell p-2 text-red-600 hover:text-primary" />
    </a>
  </nav>
</header>
