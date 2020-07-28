<script>
  let data = [
    { tag: "TRANSFER", text: "x payed y 10 Circles", date: "14396123489" },
    {
      tag: "OWNER CHANGE",
      text: "You added a new PPK to your safe",
      date: "14396123489"
    },
    { tag: "TRUST", text: "x trusted y to 100%", date: "14396123489" }
  ];
</script>

<section>
  {#each data as item}
    <div class="p-2 w-full md:w-4/5 lg:w-3/5 mx-auto">
      <div
        class="inline-flex items-center bg-white leading-none text-primary
        rounded-full p-1 shadow text-primary text-sm w-full">
        <span
          class="inline-flex text-white rounded-full h-6 px-3 justify-center
          items-center"
          class:bg-blue-600={item.tag === 'TRANSFER'}
          class:bg-green-500={item.tag === 'TRUST'}
          class:bg-red-500={item.tag === 'OWNER CHANGE'}>
          {item.tag}
        </span>
        <span class="inline-flex px-2">{item.text}</span>
      </div>
    </div>
  {/each}
</section>
