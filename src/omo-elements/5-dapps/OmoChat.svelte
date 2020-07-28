<script>
  import OmoOrganisms from "./../4-layouts/OmoOrganisms";

  let OmoChat = {
    name: "OmoChat",
    type: "organisms",
    layout: {
      areas: "'main' 'foot'",
      columns: "1fr",
      rows: "1fr 4rem"
    },
    blocks: [
      {
        type: "molecule",
        slot: "main",
        quant: "OmoChat",
        data: {}
      },
      {
        type: "molecule",
        slot: "foot",
        quant: "OmoNavBottom",
        data: {}
      }
    ]
  };
</script>

<OmoOrganisms organisms={OmoChat} />
