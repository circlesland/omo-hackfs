<script>
  let notifications = [];

  async function updateAsync() {
    const PAGE_SIZE = 100;

    // Get list of my activities
    const addr = window.o.web3.utils.toChecksumAddress(
      window.o.odentity.current.circleSafe.safeAddress.trim()
    );
    const { activities } = await window.o.circlesCore.activity.getLatest(
      window.o.odentity.current.circleSafeOwner,
      {
        safeAddress: addr
      },
      PAGE_SIZE,
      0,
      0
    );

    // Example: Display activities
    const { ActivityTypes } = window.o.circlesCore.activity;

    activities.forEach(activity => {
      const { timestamp, type, data } = activity;

      let text = "";
      if (type === ActivityTypes.HUB_TRANSFER) {
        text = `transferred ${data.value.toString()} Circles to ${data.to}`;
      } else if (type === ActivityTypes.ADD_CONNECTION) {
        text = `${data.limitPercentage} ${data.canSendTo} allowed ${data.send} to transfer Circles`;
      } else if (type === ActivityTypes.REMOVE_CONNECTION) {
        text = `${data.canSendTo} untrusted ${data.user}`;
      } else if (type === ActivityTypes.ADD_OWNER) {
        text = `added ${data.ownerAddress} to ${data.safeAddress}`;
      } else if (type === ActivityTypes.REMOVE_OWNER) {
        text = `removed ${data.ownerAddress} from ${data.safeAddress}`;
      }

      notifications = [
        ...notifications,
        {
          date: timestamp,
          tag: type.toString(),
          text: text
        }
      ];
    });
  }
  updateAsync();
</script>

<style>
  .top-100 {
    top: 100%;
  }
  .bottom-100 {
    bottom: 100%;
  }
  .max-h-select {
    max-height: 300px;
  }
</style>

<div class="flex justify-center w-full flex-wrap bg-gray-100">
  <div class="text-gray-700 w-full lg:w-2/3 overflow-y-scroll">
    {#each notifications as item}
      {#if item.tag == 'Symbol(ADD_CONNECTION)'}
        <div class="flex w-full mb-4 bg-yellow-300">
          <div class="w-16 bg-yellow-400">
            <div class="p-4">
              <svg
                class="h-8 w-8 text-white fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <path
                  d="M503.191 381.957c-.055-.096-.111-.19-.168-.286L312.267
                  63.218l-.059-.098c-9.104-15.01-23.51-25.577-40.561-29.752-17.053-4.178-34.709-1.461-49.72
                  7.644a66 66 0 0 0-22.108 22.109l-.058.097L9.004
                  381.669c-.057.096-.113.191-.168.287-8.779 15.203-11.112
                  32.915-6.569 49.872 4.543 16.958 15.416 31.131 30.62
                  39.91a65.88 65.88 0 0 0 32.143
                  8.804l.228.001h381.513l.227.001c36.237-.399 65.395-30.205
                  64.997-66.444a65.86 65.86 0 0 0-8.804-32.143zm-56.552
                  57.224H65.389a24.397 24.397 0 0
                  1-11.82-3.263c-5.635-3.253-9.665-8.507-11.349-14.792a24.196
                  24.196 0 0 1 2.365-18.364L235.211 84.53a24.453 24.453 0 0 1
                  8.169-8.154c5.564-3.374 12.11-4.381 18.429-2.833 6.305 1.544
                  11.633 5.444 15.009 10.986L467.44 402.76a24.402 24.402 0 0 1
                  3.194 11.793c.149 13.401-10.608 24.428-23.995 24.628z" />
                <path
                  d="M256.013 168.924c-11.422 0-20.681 9.26-20.681
                  20.681v90.085c0 11.423 9.26 20.681 20.681 20.681 11.423 0
                  20.681-9.259
                  20.681-20.681v-90.085c.001-11.421-9.258-20.681-20.681-20.681zM270.635
                  355.151c-3.843-3.851-9.173-6.057-14.624-6.057a20.831 20.831 0
                  0 0-14.624 6.057c-3.842 3.851-6.057 9.182-6.057 14.624 0 5.452
                  2.215 10.774 6.057 14.624a20.822 20.822 0 0 0 14.624
                  6.057c5.45 0 10.772-2.206 14.624-6.057a20.806 20.806 0 0 0
                  6.057-14.624 20.83 20.83 0 0 0-6.057-14.624z" />
              </svg>
            </div>
          </div>
          <div class="w-full text-grey-darker items-center p-4">
            <span class="text-lg font-bold pb-4">{item.tag}</span>
            <p class="leading-tight">{item.text}</p>
          </div>
        </div>
      {/if}
    {/each}
  </div>
</div>
