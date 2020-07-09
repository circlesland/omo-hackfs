<script>
  export let data = {
    first: "firstname",
    last: "lastname",
    image: "image",
    profile: "image",
    dream: "dream description",
    link: "link",
    follower: "10"
  };
</script>

<div
  class="bg-white relative border border-gray-200 shadow text-gray-800
  hover:shadow-lg">
  <div class="relative">
    <div class="overflow-hidden h-2 text-xs flex bg-green-100">
      <div
        style="width: {data.follower * 10}%"
        class="shadow-none flex flex-col text-center whitespace-nowrap
        text-white justify-center bg-secondary" />
    </div>
  </div>
  <img
    src={data.image}
    class="h-40 w-full object-cover object-center"
    alt="image" />
  <div class="flex justify-center">
    <img
      src={data.profile}
      class="rounded-full -mt-20 border-8 object-center object-cover
      border-white mr-2 h-36 w-36"
      alt="image" />
  </div>
  <div class="">
    <div class="flex -mt-16 items-center justify-between">
      <div>
        <span
          class="text-xs font-semibold inline-block py-1 px-2 uppercase
          text-white bg-green-300">
          {data.follower} / 10
        </span>
      </div>
      <div class="text-right">
        <span
          class="text-xs font-semibold inline-block py-1 px-2 uppercase
          text-white bg-green-300">
          DREAMERS
        </span>
      </div>
    </div>
  </div>
  <div class="mt-4 p-4 h-40">
    <div class="font-bold font-title text-xl text-center">
      {data.first} {data.last}'s
    </div>
    <p class="text-center text-gray-600 uppercase">dream</p>
    <div class="text-sm font-light text-center py-1 px-4">{data.dream}</div>
  </div>
  <a href="" class="w-full">
    <button class="bg-secondary w-full text-white font-bold py-2 px-4">
      Join dream
    </button>
  </a>
</div>
