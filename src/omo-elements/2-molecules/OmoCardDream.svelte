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

<div class="bg-white relative shadow text-gray-800 hover:shadow-lg">
  <div class="relative">
    <div class="overflow-hidden h-3 text-xs flex bg-gray-200">
      <div
        style="width: {data.follower * 7.69}%"
        class="shadow-none flex flex-col text-center whitespace-nowrap
        text-white justify-center bg-secondary" />
    </div>
  </div>
  <div class="z-0 relative group h-48 w-full flex justify-center items-center">
    <div
      class="h-full w-full absolute bg-cover z-10 bg-center "
      style="background-image: url('{data.image}')" />
    <p
      class="w-full h-full bg-primary opacity-50 text-center pt-8 font-bold
      text-3xl text-white absolute z-20 pointer-events-none uppercase">
      {data.city}
    </p>
  </div>
  <div class="flex justify-center z-30">
    <img
      src={data.profile}
      class="z-30 rounded-full -mt-20 border-8 object-center object-cover
      border-white mr-2 h-36 w-36"
      alt="image" />
  </div>
  <div class="">
    <div class="flex -mt-16 items-center justify-between">
      <div>
        <span
          class="text-xs font-semibold inline-block py-1 px-2 uppercase
          text-white bg-primary">
          {data.follower} / 13
        </span>
      </div>
      <div class="text-right">
        <span
          class="text-xs font-semibold inline-block py-1 px-2 uppercase
          text-white bg-primary ">
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

  <div class="h-10 flex items-center justify-between bg-gray-100">
    <div class="text-gray-500 font-bold text-lg px-4 py-1">Ø 7 / week</div>
    <a
      href="javascript:navigate('omofunding','{data._id}')"
      class="text-white bg-secondary font-bold text-lg px-4 py-2 uppercase">
      join dream
    </a>
  </div>

</div>
