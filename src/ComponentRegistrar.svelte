<script>
  import OmoDapps from "./omo-elements/2-molecules/OmoDapps";
  import OmoNavBar from "./omo-elements/2-molecules/OmoNavBar";
  import OmoTitleBar from "./omo-elements/2-molecules/OmoTitleBar";
  import OmoBanner from "./omo-elements/2-molecules/OmoBanner";
  import OmoLogin from "./omo-elements/2-molecules/OmoLogin";
  import OmoIntro from "./omo-elements/2-molecules/OmoIntro";
  import OmoChat from "./omo-elements/2-molecules/OmoChat";
  import OmoNext from "./omo-elements/2-molecules/OmoNext";

  window.registrar = new Map();
  window.registrar.set("OmoNavBar", OmoNavBar);
  window.registrar.set("OmoTitleBar", OmoTitleBar);
  window.registrar.set("OmoDapps", OmoDapps);
  window.registrar.set("OmoBanner", OmoBanner);
  window.registrar.set("OmoLogin", OmoLogin);
  window.registrar.set("OmoIntro", OmoIntro);
  window.registrar.set("OmoChat", OmoChat);

  window.registrar.set("OmoNext", OmoNext);
</script>
