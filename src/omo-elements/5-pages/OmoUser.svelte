<script>
  import OmoProfile from "./../3-organisms/OmoProfile";
  import OmoLanding from "./../3-organisms/OmoLanding";
  import OmoSplitPage from "./../4-layouts/OmoSplitPage";
</script>

<OmoSplitPage>
  <div slot="left">
    <OmoProfile />
  </div>
  <div slot="right">
    <OmoLanding />
  </div>
</OmoSplitPage>
