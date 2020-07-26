<script>
  import OmoOrganisms from "./../4-templates/OmoOrganisms.svelte";
  // import OmoGridDreams from "./../2-molecules/OmoGridDreams";
  // import OmoHero from "./../2-molecules/OmoHero";

  let OmoDreams = {
    name: "OmoDream",
    type: "organisms",
    layout: {
      areas: "main'",
      columns: "1fr",
      rows: "1fr"
    },
    blocks: [
      {
        type: "molecule",
        slot: "main",
        quant: "OmoGridDreams",
        data: {}
      }
    ]
  };
</script>

<OmoOrganisms organisms={OmoDreams} />
