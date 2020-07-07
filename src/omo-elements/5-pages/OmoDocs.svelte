<script>
  import OmoProfile from "./../3-organisms/OmoProfile";
  import OmoHandbook from "./../3-organisms/OmoHandbook";
  import OmoAsideMainLayout from "./../4-layouts/OmoAsideMainLayout";
</script>

<OmoAsideMainLayout>
  <div slot="left">
    <OmoProfile />
  </div>
  <div slot="right">
    <OmoHandbook />
  </div>
</OmoAsideMainLayout>
