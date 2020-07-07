<script>
  import OmoLanding from "./../3-organisms/OmoLanding";
  import OmoFullPage from "./../4-layouts/OmoFullPage";
  import OmoSplitPage from "./../4-layouts/OmoSplitPage";
</script>

<OmoFullPage>
  <OmoLanding />
</OmoFullPage>

<OmoSplitPage>
  <div slot="left">
    <OmoLanding />
  </div>
  <div slot="right">
    <OmoLanding />
  </div>
</OmoSplitPage>
