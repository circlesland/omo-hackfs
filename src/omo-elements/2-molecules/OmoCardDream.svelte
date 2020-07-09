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

<div class="bg-white relative shadow rounded-lg text-gray-800 hover:shadow-lg">
  <div
    class="right-0 mt-4 rounded-l-full absolute text-center font-bold text-xs
    text-white px-2 py-1 bg-secondary">
    {data.follower} / 10 dreamers
  </div>
  <img
    src={data.image}
    class="h-40 rounded-lg w-full object-cover object-center"
    alt="image" />
  <div class="flex justify-center">
    <img
      src={data.profile}
      class="rounded-full -mt-12 border-8 object-center object-cover
      border-white mr-2 h-24 w-24"
      alt="image" />
  </div>
  <div class="py-2 px-2">
    <div class="font-bold font-title text-xl text-center">
      {data.first} {data.last}
    </div>
    <div class="text-sm font-light text-center my-2">{data.dream}</div>
  </div>
</div>
