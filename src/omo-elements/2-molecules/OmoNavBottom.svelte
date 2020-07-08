<script>
  import { curRoute } from "./../../router.ts";
  import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";

  export let navitems = [
    {
      icon: "fa-user-circle",
      text: "omo pay",
      link: ""
    },
    {
      icon: "fa-users",
      text: "contacts",
      link: ""
    },
    {
      icon: "fa-comments",
      text: "messages",
      link: "/?page=omochat"
    },
    {
      icon: "fa-home",
      text: "dapps",
      link: "/?page=omodapps"
    }
  ];
</script>

<style>
  li {
    @apply p-2;
  }
</style>

<OmoIconsFA />
<div class="bottomNav fixed bottom-0 w-full">
  <nav class="bottom-0 w-full bg-primary">
    <ul
      class="flex justify-around md:justify-end items-center text-center
      opacity-75 font-semibold">
      {#each navitems as item}
        <li>
          <a href={item.link} class="text-blue-600 hover:text-secondary">
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
</div>
