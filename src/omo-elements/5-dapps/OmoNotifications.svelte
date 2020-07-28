<script>
  import OmoOrganisms from "./../4-layouts/OmoOrganisms.svelte";

  let OmoNotifications = {
    name: "OmoNotifications",
    type: "organisms",
    layout: {
      areas: "'top' 'main'",
      columns: "1fr",
      rows: "2rem 1fr"
    },
    blocks: [
      {
        type: "molecule",
        slot: "top",
        quant: "OmoNavTop",
        data: {}
      },
      {
        type: "molecule",
        slot: "main",
        quant: "OmoNotifyList",
        data: {}
      }
    ]
  };
</script>

<OmoOrganisms organisms={OmoNotifications} />
