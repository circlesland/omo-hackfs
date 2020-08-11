<script>
  import OmoOrganisms from "./../4-layouts/OmoOrganisms";

  let OmoCRUDTable = {
    name: "OmoCRUDTable",
    type: "organisms",
    layout: {
      areas: "'main'",
      columns: "1fr",
      rows: "1fr",
    },
    blocks: [
      {
        type: "molecule",
        slot: "main",
        quant: "OmoCRUDTable",
      },
    ],
  };
</script>

<OmoOrganisms organisms={OmoCRUDTable} />
