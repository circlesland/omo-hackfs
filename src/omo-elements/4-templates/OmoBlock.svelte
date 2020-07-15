<script>
  export var transfer;
  var block = JSON.parse(transfer);
  import OmoBlocks from "./OmoBlocks";
  var dapp = { layout: block.layout, blocks: block.blocks };
</script>

<section
  class="blocks"
  style="--areas: {block.layout.areas}; --columns: {block.layout.columns};
  --rows: {block.layout.rows}; ">
  <OmoBlocks {dapp} />
</section>
