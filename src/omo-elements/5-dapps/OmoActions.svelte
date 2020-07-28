<script>
  import OmoOrganisms from "./../4-layouts/OmoOrganisms.svelte";

  let OmoDapps = {
    name: "OmoDream",
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
        quant: "ActionsList",
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

<OmoOrganisms organisms={OmoDapps} />
