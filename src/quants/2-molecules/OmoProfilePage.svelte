<script>
  import {onMount} from "svelte";
  import OmoAvatarsGrouped from "./../2-molecules/OmoAvatarsGrouped";

  export const data = {};
  let dreamers;

  onMount(async () => {
    dreamers = await fetch("https://randomuser.me/api?results=4")
            .then(response => response.json())
            .then(
                    data =>
                            (dreamers = data.results.map((item, i) => {
                              item.profile = item.picture.large;
                              return item;
                            }))
            );
  });
</script>

<section class="bg-white py-4 font-sans">
  <section class="relative py-16">
    <div class="container mx-auto px-20">
      <div
              class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6
        shadow-xl rounded-lg -mt-40">
        <div class="w-full px-6 bg-primary text-white">
          <div class="flex py-4 flex-wrap justify-center lg:pt-4 pt-8">
            <div class="mr-4 p-3 text-center">
              <span
                      class="text-3xl font-bold block uppercase tracking-wide
                text-white">
                {#if data}{data.follower}{:else}6{/if}
              </span>
              <span class="text-xs uppercase text-blue-400 font-bold">
                of 13 dreamers
              </span>
            </div>
            <div class="mr-4 p-3 text-center">
              <span
                      class="text-3xl font-bold block uppercase tracking-wide
                text-white">
                {data.follower * 7.69} %
              </span>
              <span class="text-xs uppercase text-blue-400 font-bold">
                of 100% reached
              </span>
            </div>
            <div class="lg:mr-4 p-3 text-center">
              <span
                      class="text-3xl font-bold block uppercase tracking-wide
                text-white">
                Ø {data.follower * 7}
              </span>
              <span class="text-xs uppercase text-blue-400 font-bold">
                of Ø 91 / week goal
              </span>
            </div>
          </div>
        </div>
        <OmoAvatarsGrouped data={dreamers}/>
        <div class="text-center mt-4">
          <h3 class="text-4xl font-semibold leading-normal mb-2 text-gray-800">
            {data.first} {data.last}
          </h3>
          <div
                  class="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold
            uppercase">
            <i class="fas fa-map-marker-alt mr-2 text-lg text-gray-500"/>
            {data.city}
          </div>
        </div>
        <div class="mt-10 py-10 border-t border-gray-300 text-center">
          <div class="flex flex-wrap justify-center">
            <div class="w-full lg:w-9/12 px-4">
              <p class="text-lg leading-relaxed text-gray-800">{data.dream}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</section>
