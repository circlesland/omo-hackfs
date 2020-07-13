<script>
  import OmoButton from "./../1-atoms/OmoButton";
  export let logout = "javascript: ;//o.store.odentity.logout()";
  export let home = "javascript:navigate('omodapps')";
  export let patron = "javascript:navigate('omosapiens')";
</script>

<aside class="bg-primary text-gray-700 shadow h-12 w-full">
  <ul
    class="w-full h-12 flex justify-between items-center text-center
    font-semibold">

    <li class="bg-primary hover:bg-secondary">
      <a
        href={home}
        class="text-white h-12 w-12 px-6 flex flex justify-center items-center ">
        <i class="text-lg fas fa-user-circle" />
      </a>
    </li>
    <div class="w-full md:w-1/2 h-12">
      <div
        href={patron}
        class="bg-tertiary hover:bg-secondary py-3 px-4 uppercase font-bold
        text-white text-lg cursor-pointer">
        become dream patron
      </div>
    </div>
    <li class="bg-primary hover:bg-secondary">
      <a
        href={logout}
        class="text-white h-12 w-12 px-6 flex flex justify-center items-center">
        <i class="text-lg fas fa-plus" />
      </a>
    </li>
  </ul>

</aside>

<!-- <script>
  import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";

  export let navitems = [
    {
      icon: "fa-user-circle",
      text: "omo pay",
      link: "javascript:navigate('omopay')",
      design: "text-blue-600 hover:text-secondary"
    },
    {
      icon: "fa-users",
      text: "dreams",
      link: "javascript:navigate('omosapiens')",
      design: "text-blue-600 hover:text-secondary"
    },
    {
      icon: "fa-plus",
      text: "actions",
      link: "javascript:o.store.odentity.logout()",
      design: "bg-secondary text-white"
    },
    {
      icon: "fa-comments",
      text: "messages",
      link: "javascript:navigate('omochat')",
      design: "text-blue-600 hover:text-secondary"
    },
    {
      icon: "fa-home",
      text: "dapps",
      link: "javascript:navigate('omodapps')",
      design: "text-blue-600 hover:text-secondary"
    }
  ];
</script><style>
  li {
    @apply p-2;
  }
</style><OmoIconsFA />
<div class="bottomNav fixed bottom-0 w-full">
  <nav class="bottom-0 w-full bg-primary">
    <ul
      class="flex justify-around md:justify-center items-center text-center
      font-semibold">
      {#each navitems as item}
        <li class={item.design}>
          <a href={item.link} class={item.design}>
            <div>
              <i class="text-lg fas {item.icon}" />
              <br />
              <span class="text-xs uppercase">{item.text}</span>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</div> -->
