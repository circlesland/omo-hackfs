<script>
  import {
    createNewSafe,
    getSafeFromLocalStorage,
    getSafeOwnerFromLocalStorage,
    trustByOmo,
    deploySafe,
    deployToken
  } from "./../../omo-actions/Circles";

  $: safe = getSafeFromLocalStorage();

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
  {#if safe != null}LoggedInSafe: {safe.safeAddress.toLowerCase()}{/if}
</div>
