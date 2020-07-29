<script context="module">

  export async function createNewSafe() {
    var safeOwner = await createNewPPK();
    var safe = await prepareNewSafe(safeOwner);
  }

  export async function trustByOmo(safe) {
    // Trust the Save 3 times with Omo1, Omo2 and Omo3
    /*let trust1 = */ await addTrustLineAsync(omo1.safeOwner, omo1.safe, safe, 1);
    /*let trust2 = */ await addTrustLineAsync(omo2.safeOwner, omo2.safe, safe, 1);
    /*let trust3 = */ await addTrustLineAsync(omo3.safeOwner, omo3.safe, safe, 1);
  }

  export async function deploySafe(safeOwner, safe) {
    //  Check if we have enough giveTrust connections
    const trustReturn = await window.o.circlesCore.trust.isTrusted(safeOwner, safe);
    alert(JSON.stringify(trustReturn));

    if (trustReturn.isTrusted) {
      const safeDeployed = await window.o.circlesCore.safe.deploy(safeOwner, safe);
      alert("safe deploy success: " + safeDeployed);
      // Deploy Token to Safe
    } else {
      alert("the safe deploy went wrong");
    }
  }

  export async function deployToken(safeOwner, safe) {
    const tokenDeployed = await window.o.circlesCore.token.deploy(safeOwner, safe);
    alert("token deploy done: " + tokenDeployed);
  }

  export async function sendCircles(fromSafeOwner, fromSafe, toSafe, amount) {
    let toSafeAddress = window.o.web3.utils.toChecksumAddress(toSafe.safeAddress);
    let fromSafeAddress = window.o.web3.utils.toChecksumAddress(fromSafe.safeAddress);

    const payment = await window.o.circlesCore.token.transfer(fromSafeOwner, {
      from: fromSafeAddress,
      to: toSafeAddress,
      value: new window.o.web3.utils.BN(window.o.web3.utils.toWei(amount, "ether"))
    });
    alert(payment);
  }

  export function getSafeOwnerFromLocalStorage() {
    var localStorageSafeOwner = localStorage.getItem("safeOwner");
    return JSON.parse(localStorageSafeOwner);
  }

  export function getSafeFromLocalStorage() {
    var localStorageSafe = localStorage.getItem("safe");
    return JSON.parse(localStorageSafe);
  }

  async function createNewPPK() {
    // Create account and save to wallet
    let ppk = window.o.web3.eth.accounts.create();
    localStorage.setItem("safeOwner", JSON.stringify(ppk));
    return ppk;
  }

  async function prepareNewSafe(ppk) {
    // Generate a nonce to predict Safe address
    var nonce = new Date().getTime();
    // Prepare Safe deployment and receive a predicted safeAddress
    let safeAddress = await window.o.circlesCore.safe.prepareDeploy(ppk, { nonce });
    let safe = { safeAddress: safeAddress };
    localStorage.setItem("safe", JSON.stringify(safe));
    return safe;
  }

  async function requestUBI() {
    // Request my UBI
    const payout = await window.o.circlesCore.token.requestUBIPayout(safeOwner, safe);
    alert(payout);
  }

  const omo1 = {
    safeOwner: {
      privateKey: process.env.OMO1_ACCOUNT_PRIVATEKEY,
      address: process.env.OMO1_ACCOUNT_ADDRESS
    },
    safe: { safeAddress: process.env.OMO1_SAFE_SAFEADDRESS }
  };
  const omo2 = {
    safeOwner: {
      privateKey: process.env.OMO2_ACCOUNT_PRIVATEKEY,
      address: process.env.OMO2_ACCOUNT_ADDRESS
    },
    safe: { safeAddress: process.env.OMO2_SAFE_SAFEADDRESS }
  };
  const omo3 = {
    safeOwner: {
      privateKey: process.env.OMO3_ACCOUNT_PRIVATEKEY,
      address: process.env.OMO3_ACCOUNT_ADDRESS
    },
    safe: { safeAddress: process.env.OMO3_SAFE_SAFEADDRESS }
  };
</script>
