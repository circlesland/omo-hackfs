<script>
  import OmoIconsFA from "./../1-atoms/OmoIconsFA.svelte";
  import OmoVideo from "./OmoVideo";
  import OmoProfilePage from "./OmoProfilePage";
  import { Dreams as DreamsQueries } from "../../queries/omo/dreams/dreams";
  import { Dreams as DreamsMutations } from "../../mutations/omo/dreams/dreams";
  import { Omosapiens } from "../../queries/omo/odentity/omosapiens";

  let dreamId;

  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("data")) {
    dreamId = urlParams.get("data");
  }

  let data = DreamsQueries.byId(dreamId);
  let totalInteractions = 0;
  let levelAndLeap = { level: 0, leap: 0 };

  async function calcInteractions() {
    const d = await data;
    totalInteractions =
      d.data.DreamById.Votes.length + d.data.DreamById.subscriptions.length;
    levelAndLeap = DreamsQueries.calcLevel(totalInteractions);
  }

  async function vote() {
    const omosapien = await Omosapiens.byOdentityId(
      window.o.odentity.current._id
    );
    await DreamsMutations.newVote(dreamId, omosapien._id);
  }
  async function reservate() {
    const omosapien = await Omosapiens.byOdentityId(
      window.o.odentity.current._id
    );
    await DreamsMutations.newReservation(dreamId, omosapien._id);
  }
  async function createProduct(price) {
    const omosapien = await Omosapiens.byOdentityId(
      window.o.odentity.current._id
    );
    const product = await DreamsMutations.createProductFromDream(
      dreamId,
      omosapien._id,
      price
    );
  }
  /*
  async function subscribe() {
    const omosapien = await Omosapiens.byOdentityId(window.o.odentity.current._id);
    await DreamsMutations.newSubscription(dreamId, omosapien._id);
  }
   */

  calcInteractions();
</script>

<style>
  .omo-layout {
    display: grid;
    grid-template-areas: "top top" "content-left content-right";
    grid-template-columns: 1fr 24rem;
    grid-template-rows: 1rem 1fr;
    overflow: hidden;
  }

  .top {
    grid-area: top;
  }

  .content-left {
    grid-area: content-left;
    height: 100%;
    overflow-y: scroll;
  }

  .content-right {
    grid-area: content-right;
    overflow: hidden;
    display: grid;
    height: 100%;
    grid-template-areas: "aside-top" "aside-bottom";
    grid-template-columns: 1fr;
    grid-template-rows: 18rem 1fr;
  }

  .aside-top {
    grid-area: aside-top;
    height: 100%;
  }
  .aside-bottom {
    grid-area: aside-bottom;
    height: 100%;
    overflow-y: scroll;
  }
</style>

{#await data}
  Loading...
{:then data}
  <OmoIconsFA />
  <div class="omo-layout">
    <div class="top bg-gray-200 w-full">
      <div class="relative">
        <div class="overflow-hidden h-4 text-xs flex bg-primary">
          <div
            style="width: 33%"
            class="shadow-none flex flex-col text-center whitespace-nowrap
            text-white justify-center bg-tertiary" />
        </div>
      </div>
    </div>

    <div class="content-left bg-gray-100">
      <OmoVideo />
      <OmoProfilePage data={data.data.DreamById} />
    </div>

    <div class="content-right bg-gray-200 py-6 px-8">
      <div class="aside-top text-md">
        <div class="bg-gray-300">
          <div class="flex flex-col justify-center h-16 text-center">
            <p
              class="py-2 px-4 text-xl font-bold text-primary h-full flex
              justify-center flex-col bg-gray-300 uppercase">
              80% lifetime discount
            </p>
          </div>
          <div class="bg-gray-100">
            <p class="text-md p-6 text-gray-600">
              By joining the dream now, you will reservate your pre-order slot,
              which will give you x percent discount for lifetime on using the
              future [product service title placeholder].
            </p>
          </div>
          <p
            class="text-md w-full py-2 bg-tertiary hover:bg-secondary
            text-center text-white uppercase font-bold cursor-pointer">
            reservate product now
          </p>
        </div>
        <!-- <input type="button" on:click={vote} value="Vote" />
        <input type="button" on:click={reservate} value="Reservate" />

        {#if !data.data.DreamById.Product}
          <input
            type="button"
            on:click={() => createProduct(100)}
            value="Create product from dream" />
        {/if} -->
      </div>
      <!--<input type="button" on:click={subscribe} value="Subscribe" />-->
      <div class="aside-bottom">
        <!-- <br />
        Total interactions: {totalInteractions}
        <br />
        Current leap: {levelAndLeap.leap}
        <br />
        Current level: {levelAndLeap.level}
        <br /> -->
        <!-- Votes:
        <br />
        {#each data.data.DreamById.Votes as vote}
          {vote._id}
          <br />
        {/each}
      Reservations:<br/>
        {#each data.data.DreamById.subscriptions as subscriptions}
          {subscriptions._id}<br/>
        Reservations: -->
        Level 6
        {#each data.data.DreamById.reservations as reservation}
          <div class="flex h-12 mb-4 w-full bg-gray-100">
            <img
              alt=""
              src="https://i.pravatar.cc/150?u={reservation._id}"
              class="h-full w-auto" />
            <p class="py-3 px-4 rounded w-full">{reservation._id}</p>
          </div>
        {/each}
        Level 7
        <div class="flex h-12 mb-4 w-full bg-gray-100">
          <img
            alt=""
            src="https://i.pravatar.cc/150?u=sfghsfgh"
            class="h-full w-auto" />
          <p class="py-3 px-4 rounded w-full">324576456u56ezdtf</p>
        </div>
        <div class="flex h-12 mb-4 w-full bg-gray-300">
          <div
            class="h-full w-16 text-center flex justify-center flex-col
            bg-gray-500 text-xl text-gray-300 uppercase font-bold">
            <i class="fas fa-lock text-gray-300" />
          </div>
          <div class="py-3 h-12 w-full bg-gray-300">reservate for -80%</div>
        </div>
        <div class="flex h-12 mb-4 w-full bg-gray-300">
          <div
            class="h-full w-16 text-center flex justify-center flex-col
            bg-gray-500 text-xl text-gray-300 uppercase font-bold">
            <i class="fas fa-lock text-gray-300" />
          </div>
          <div class="py-3 h-12 w-full bg-gray-300">reservate for -80%</div>
        </div>
        Level 8
        <div class="flex h-12 mb-4 w-full bg-gray-300">
          <div
            class="h-full w-16 text-center flex justify-center flex-col
            bg-gray-500 text-xl text-gray-300 uppercase font-bold">
            <i class="fas fa-lock text-gray-300" />
          </div>
          <div class="py-3 h-12 w-full bg-gray-300">reservate for -70%</div>
        </div>
        <div class="flex h-12 mb-4 w-full bg-gray-300">
          <div
            class="h-full w-16 text-center flex justify-center flex-col
            bg-gray-500 text-xl text-gray-300 uppercase font-bold">
            <i class="fas fa-lock text-gray-300" />
          </div>
          <div class="py-3 h-12 w-full bg-gray-300">reservate for -70%</div>
        </div>
        <div class="flex h-12 mb-4 w-full bg-gray-300">
          <div
            class="h-full w-16 text-center flex justify-center flex-col
            bg-gray-500 text-xl text-gray-300 uppercase font-bold">
            <i class="fas fa-lock text-gray-300" />
          </div>
          <div class="py-3 h-12 w-full bg-gray-300">reservate for -70%</div>
        </div>
      </div>
      <!--
      {#each levels.sort((first, second) => {
      if (first.order < second.order) return -1;
      if (first.order > second.order) return 1;
      return 0;
      }) as level, i}
        <p class="py-2 text-md font-bold text-gray-500 uppercase">
          Level {level.order}: {level.total} {level.title}
        </p>
        {#each level.steps.sort((first, second) => {
        if (first.order < second.order) return -1;
        if (first.order > second.order) return 1;
        return 0;
        }) as step, i}
          {#if step.state === 'active'}
            <div class="bg-gray-300">
              <div class="flex flex-col justify-center h-16 text-center">
                <p
                        class="py-2 px-4 text-xl font-bold text-primary h-full flex
                  justify-center flex-col bg-gray-300 uppercase">
                  {step.benefit}
                </p>
              </div>
              <div class="bg-gray-100">
                <p class="text-md p-6 text-gray-600">
                  {#if step.content}
                    {step.content}
                  {:else}
                    By comitting regularly your time, knowledge and feedback to
                    the dreamers, you will unlock {step.benefit} usage of the
                    future products or services that you are co-creating.
                  {/if}
                </p>
              </div>
              <p
                      class="text-md w-full py-2 bg-tertiary hover:bg-secondary
                text-center text-white uppercase font-bold cursor-pointer">
                {step.title}
              </p>
            </div>
          {:else if step.state === 'done'}
            {#each dreamers.slice(0, level.goal) as dreamer}
              <div class="flex h-12 mb-4 w-full bg-gray-100">
                <img
                        alt=""
                        src={dreamer.picture.medium}
                        class="h-full w-auto"/>
                <p class="py-3 px-4 rounded w-full">{dreamer.name}</p>
              </div>
            {/each}
          {:else}
            <div class="flex h-12 mb-4 w-full bg-gray-300">
              <div
                      class="h-full w-16 text-center flex justify-center flex-col
                bg-gray-500 text-xl text-gray-300 uppercase font-bold">
                {step.order}
              </div>
              <div class="py-3 h-12 w-full text-center bg-gray-300">
                <i class="fas fa-lock text-gray-500"/>
              </div>
            </div>
          {/if}
        {/each}
      {/each}
  -->
    </div>
  </div>

{/await}
