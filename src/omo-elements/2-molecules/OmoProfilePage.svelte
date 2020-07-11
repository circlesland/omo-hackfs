<script>
  import OmoAvatarsGrouped from "./../2-molecules/OmoAvatarsGrouped";
  export let city = {};

  fetch("https://randomuser.me/api")
    .then(response => response.json())
    .then(data => (city = data.results[0].location.city));
</script>

<section class="bg-white py-4 font-sans">
  <section class="relative py-16">
    <div class="container mx-auto px-12">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6
        shadow-xl rounded-lg -mt-32">
        <div
          class="px-6 flex flex-wrap justify-between bg-primary text-secondary">
          <div class="w-full lg:order-1 ">
            <div class="flex py-4 lg:pt-4 pt-8">
              <div class="mr-4 p-3 text-center">
                <span
                  class="text-2xl font-bold block uppercase tracking-wide
                  text-white">
                  10 / 13
                </span>
                <span class="text-sm uppercase text-blue-600">
                  Omo Dreamers
                </span>
              </div>
              <div class="mr-4 p-3 text-center">
                <span
                  class="text-2xl font-bold block uppercase tracking-wide
                  text-white">
                  4 / 28
                </span>
                <span class="text-sm uppercase text-blue-600">
                  Campaign Days
                </span>
              </div>
              <div class="lg:mr-4 p-3 text-center">
                <span
                  class="text-2xl font-bold block uppercase tracking-wide
                  text-white">
                  Ø 28 / Ø 91
                </span>
                <span class="text-sm uppercase text-blue-600">
                  Weekly Funding
                </span>
              </div>
            </div>
          </div>
        </div>
        <OmoAvatarsGrouped />
        <div class="text-center mt-4">
          <h3 class="text-4xl font-semibold leading-normal mb-2 text-gray-800">
            Quantum Leap Earth Summit
          </h3>
          <div
            class="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold
            uppercase">
            <i class="fas fa-map-marker-alt mr-2 text-lg text-gray-500" />
            {city}
          </div>
        </div>
        <div class="mt-10 py-10 border-t border-gray-300 text-center">
          <div class="flex flex-wrap justify-center">
            <div class="w-full lg:w-9/12 px-4">
              <p class="text-lg leading-relaxed text-gray-800">
                Lorem ipsum morbi congue quisque imperdiet nam vel nunc donec
                mi, aliquet tempus per quisque eget sagittis faucibus velit
                pellentesque.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</section>
