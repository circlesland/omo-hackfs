<script>
  import {
    createNewSafe,
    getSafeFromLocalStorage,
    getSafeOwnerFromLocalStorage,
    trustByOmo,
    deploySafe,
    deployToken
  } from "./../omo-actions/Circles";

  $: safe = getSafeFromLocalStorage();
  $: safeOwner = getSafeOwnerFromLocalStorage();

  async function handleCreateSafe() {
    await createNewSafe();
    safe = getSafeFromLocalStorage();
  }

  async function handleTrustSafe() {
    await trustByOmo(safe);
  }
  async function handleDeploySafe() {
    await deploySafe(getSafeOwnerFromLocalStorage(), getSafeFromLocalStorage());
  }
  async function handleDeployToken() {
    await deployToken(
      getSafeOwnerFromLocalStorage(),
      getSafeFromLocalStorage()
    );
  }
</script>

<div class="w-1/2 p-32 mx-auto">
  <h1 class="p-12">Placeholder for my profile / odentity page</h1>
  <div
    class="px-2 py-1 bg-tertiary text-white text-center mb-2 w-full rounded
    text-lg"
    on:click={handleCreateSafe}>
    Create new Safe
  </div>
  <div
    class="px-2 py-1 bg-tertiary text-white text-center mb-2 w-full rounded
    text-lg"
    on:click={handleTrustSafe}>
    Trust Safe
  </div>
  <div
    class="px-2 py-1 bg-tertiary text-white text-center mb-2 w-full rounded
    text-lg"
    on:click={handleDeploySafe}>
    Deploy Safe
  </div>
  <div
    class="px-2 py-1 bg-tertiary text-white text-center mb-2 w-full rounded
    text-lg"
    on:click={handleDeployToken}>
    Deploy Token
  </div>
  {#if safe != null}
    LoggedInSafe: {safe.safeAddress}
    <br />
    LoggedInSafeLowerCase: {safe.safeAddress.toLowerCase()} private key: {safeOwner.privateKey}
    <br />
    public address key: {safeOwner.address}
  {/if}
</div>
