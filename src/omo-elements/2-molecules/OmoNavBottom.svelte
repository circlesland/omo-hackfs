<script>
  import { curRoute } from "./../../router.ts";
  import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";

  export let navitems = [
    {
      icon: "fa-user-circle",
      text: "omo pay",
      link: "/?page=omopay",
      design: "text-blue-400 hover:text-secondary"
    },
    {
      icon: "fa-users",
      text: "contacts",
      link: "/?page=omosapiens",
      design: "text-blue-400 hover:text-secondary"
    },
    {
      icon: "fa-plus",
      text: "actions",
      link: "/?page=omoactions",
      design: "bg-secondary text-white"
    },
    {
      icon: "fa-comments",
      text: "messages",
      link: "/?page=omochat",
      design: "text-blue-400 hover:text-secondary"
    },
    {
      icon: "fa-home",
      text: "dapps",
      link: "/?page=omodapps",
      design: "text-blue-400 hover:text-secondary"
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
</div>
