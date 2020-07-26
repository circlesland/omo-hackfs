<script>
  import OmoOrganisms from "./../4-templates/OmoOrganisms";

  let OmoChat = {
    name: "OmoChat",
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
        quant: "OmoChat",
        data: {}
      }
    ]
  };
</script>

<OmoOrganisms organisms={OmoChat} />
