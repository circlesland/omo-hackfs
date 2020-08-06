<script>
  export let dream;
  export let subscriptions;
</script>

<div class="aside-top text-md">
  <div class="bg-gray-300">
    <div class="flex flex-col justify-center h-16 text-center">
      <p
        class="py-2 px-4 text-xl font-bold text-primary h-full flex
        justify-center flex-col bg-gray-300 uppercase">
        80% lifetime subscriptionDiscount
      </p>
    </div>
    <div class="bg-gray-100">
      <p class="text-md p-6 text-gray-600">
        By joining the dream now, you will reservate your pre-order slot, which
        will give you x percent subscriptionDiscount for lifetime on using the
        future [product service title placeholder].
      </p>
    </div>
    {#if dream.leap == '1'}
      <p
        class="text-md w-full py-2 bg-tertiary hover:bg-secondary text-center
        text-white uppercase font-bold cursor-pointer"
        on:click={() => window.o.publishShellEventAsync(new StartFlow('flows:omo.dreams.addReservation', dream._id))}>
        Commit time
      </p>
    {/if}
    {#if dream.leap == '2'}
      <p
        class="text-md w-full py-2 bg-tertiary hover:bg-secondary text-center
        text-white uppercase font-bold cursor-pointer"
        on:click={() => window.o.publishShellEventAsync(new StartFlow('flows:omo.dreams.addSubscription', dream._id))}>
        Reserve subscription discount
      </p>
    {/if}
    {#if dream.leap == '3'}
      <p
        class="text-md w-full py-2 bg-tertiary hover:bg-secondary text-center
        text-white uppercase font-bold cursor-pointer"
        on:click={() => window.o.publishShellEventAsync(new StartFlow('flows:omo.dreams.addSubscription', dream._id))}>
        Subscribe
      </p>
    {/if}
    {#if dream.leap == '4'}
      <p
        class="text-md w-full py-2 bg-tertiary hover:bg-secondary text-center
        text-white uppercase font-bold cursor-pointer"
        on:click={() => window.o.publishShellEventAsync(new StartFlow('flows:omo.dreams.addSubscription', dream._id))}>
        Buy tokens with discount
      </p>
    {/if}
  </div>
</div>
<div class="aside-bottom">
  {#each subscriptions as reservation, i}
    {#if reservation.leapHeader}Leap {reservation.leapHeader}{/if}
    {#if reservation.levelHeader}Level {reservation.levelHeader}{/if}
    <div class="flex h-12 mb-4 w-full bg-gray-100">
      <img
        alt=""
        src="https://i.pravatar.cc/150?u={reservation.subscription._id}"
        class="h-full w-auto" />
      <p class="py-3 px-4 rounded w-full">
        {reservation.subscriptionDiscount} {reservation.subscription._id}
      </p>
    </div>
  {/each}
  Level X
  <div class="flex h-12 mb-4 w-full bg-gray-300">
    <div
      class="h-full w-16 text-center flex justify-center flex-col bg-gray-500
      text-xl text-gray-300 uppercase font-bold">
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
      {/each} -->
