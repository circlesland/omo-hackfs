<script>
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("accept")) {
    var accept = urlParams.get("accept");
    store.identity.acceptLoginRequest(accept);
  }
</script>

MAGIC LOGIN
