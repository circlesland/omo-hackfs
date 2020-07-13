<script>
  export let navitems = [
    {
      icon: "fa-bullseye",
      text: "dapps",
      link: "javascript:navigate('omofunding')",
      design: "bg-primary text-white"
    },
    {
      icon: "fa-users",
      text: "messages",
      link: "javascript:navigate('omochat')",
      design: "text-white bg-blue-600"
    },
    {
      icon: "fa-comments",
      text: "messages",
      link: "javascript:navigate('omochat')",
      design: "text-white bg-blue-600"
    },
    {
      icon: "fa-bell",
      text: "messages",
      link: "javascript:navigate('docs')",
      design: "text-white bg-blue-600"
    }
  ];
</script>

<aside
  class="flex flex-col items-center bg-gray-200 text-gray-700 shadow h-full">

  <ul>
    {#each navitems as item}
      <li class="">
        <a
          href={item.link}
          class="{item.design} h-12 px-6 flex flex justify-center items-center
          w-full hover:bg-primary hover:text-white">
          <i class="text-lg fas {item.icon}" />
        </a>
      </li>
    {/each}
  </ul>

  <!-- <div class="mt-auto h-16 flex items-center w-full">
   
    <button
      class="h-16 w-10 mx-auto flex flex justify-center items-center w-full
      focus:text-orange-500 hover:bg-red-200 focus:outline-none">
      <svg
        class="h-5 w-5 text-red-700"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>

    </button>
  </div> -->

</aside>
