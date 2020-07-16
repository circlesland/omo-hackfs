<script>
  import OmoOrganisms from "./../4-templates/OmoOrganisms";

  let MamaOmo = {
    name: "MamaOmo",
    type: "organisms",
    layout: { areas: "'left main'", columns: "20rem 1fr", rows: "1fr" },
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

<OmoOrganisms organisms={MamaOmo} />
