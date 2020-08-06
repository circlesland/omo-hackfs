<script>
  import OmoProfilePage from "./OmoProfilePage.svelte";
  import OmoVideo from "./OmoVideo.svelte";
  export let dream;
</script>

<OmoVideo />
<OmoProfilePage data={dream} />
<button
  on:click={() => window.o.publishShellEventAsync(new StartFlow('flows:omo.dreams.inviteToDream', dream))}>
  INVITE
</button>
