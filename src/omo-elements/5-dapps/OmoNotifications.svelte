<script>
  import OmoOrganisms from "./../4-layouts/OmoOrganisms.svelte";

  let OmoNotifications = {
    name: "OmoNotifications",
    type: "organisms",
    layout: {
      areas: "'main'",
      columns: "1fr",
      rows: "1fr"
    },
    blocks: [
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
