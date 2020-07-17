<script>
  import OmoOrganisms from "./../4-templates/OmoOrganisms";

  let MamaOmo = {
    name: "MamaOmo",
    type: "organisms",
    layout: { areas: "'full'", columns: "1fr", rows: "1fr" },
    blocks: [
      {
        type: "molecule",
        slot: "full",
        quant: "OmoIntro",
        data: {}
      }
    ]
  };
</script>

<OmoOrganisms organisms={MamaOmo} />
