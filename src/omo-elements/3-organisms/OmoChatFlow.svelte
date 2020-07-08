<script>
  import OmoInput from "./../1-atoms/OmoInput";
  import OmoButton from "./../1-atoms/OmoButton";

  export let messages = [
    {
      id: "1",
      mail: "omo1@omo.earth",
      text: "welcome omo 2",
      bg: "bg-green-200"
    },
    {
      id: "2",
      mail: "omo2@omo.earth",
      text: "hello omo 1, how is textile hanging?",
      bg: "bg-blue-200"
    },
    {
      id: "3",
      mail: "omo1@omo.earth",
      text: "textile offline first is amazing",
      bg: "bg-green-200"
    },
    {
      id: "4",
      mail: "omo1@omo.earth",
      text: "what are you building on?",
      bg: "bg-green-200"
    },
    {
      id: "5",
      mail: "omo2@omo.earth",
      text:
        "I love textile too!! I am playing with svelte, tailwind and markdown to make POC interfaces for ipfs / textile and filecoin",
      bg: "bg-blue-200"
    }
  ];
</script>

<div class="h-full">
  <form class="flex">
    <input
      class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
      border-gray-200 bg-white"
      placeholder="enter your chat message here" />
    <button class="px-6 bg-green-400 text-gray-800 font-bold p-3 uppercase">
      Send
    </button>
  </form>
  <div class="py-6 px-8 text-md">
    {#each messages as message, i (message.id)}
      <p class="mb-4 py-2 px-3 rounded {message.bg}">{message.text}</p>
    {/each}
  </div>
</div>
