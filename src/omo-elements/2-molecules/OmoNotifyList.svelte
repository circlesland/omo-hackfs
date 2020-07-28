<script>

  let notifications = [
    { tag: "TRANSFER", text: "x payed y 10 Circles", date: "14396123489" },
    {
      tag: "OWNER CHANGE",
      text: "You added a new PPK to your safe",
      date: "14396123489"
    },
    { tag: "TRUST", text: "x trusted y to 100%", date: "14396123489" }
  ];

  async function updateAsync() {

    // Get list of my activities
    const addr = web3.utils.toChecksumAddress(window.o.odentity.current.circleSafe.safeAddress.trim());
    const {activities} = await window.o.circlesCore.getLatest(window.o.odentity.current.circleSafeOwner, {
      safeAddress:addr
    });

    // Example: Display activities
    const {ActivityTypes} = core.activity;

    activities.forEach((activity) => {
      const {timestamp, type, data} = activity;

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

      notifications = [...notifications, {
        date: timestamp,
        tag: type.toString(),
        text: text
      }];
    });
  }
  updateAsync();

</script>

<section>
  {#each notifications as item}
    <div class="p-2 w-full md:w-4/5 lg:w-3/5 mx-auto">
      <div
        class="inline-flex items-center bg-gray-100 leading-none text-primary
        rounded p-1 shadow text-primary text-sm w-full">
        <span
          class="inline-flex text-white rounded-full h-6 px-3 justify-center
          items-center"
          class:bg-secondary={item.tag === 'TRANSFER'}
          class:bg-green-500={item.tag === 'TRUST'}
          class:bg-red-500={item.tag === 'OWNER CHANGE'}>
          {item.tag}
        </span>
        <span class="inline-flex px-2">{item.text}</span>
      </div>
    </div>
  {/each}
</section>
