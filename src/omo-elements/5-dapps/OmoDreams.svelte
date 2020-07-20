<script>
  import OmoOrganisms from "./../4-templates/OmoOrganisms.svelte";
  // import OmoGridDreams from "./../2-molecules/OmoGridDreams";
  // import OmoHero from "./../2-molecules/OmoHero";

  let OmoDreams = {
    name: "OmoDream",
    type: "organisms",
    layout: {
      areas: "'top' 'main'",
      columns: "1fr",
      rows: "12rem 1fr"
    },
    blocks: [
      {
        type: "molecule",
        slot: "top",
        quant: "OmoHero",
        data: {
          content: {
            uptitle: "OMO DREAMERS",
            title: "omos dream small and big, local and global",
            bg: "bg-gray-200"
          },
          design: {
            bg: "bg-gray-300"
          }
        }
      },
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
