<script context="module">
  import CirclesCore from "@circles/core";
  import Web3 from "web3";

  export async function createNewSafe() {
    var safeOwner = await createNewPPK();
    var safe = await prepareNewSafe(safeOwner);
  }

  export async function trustByOmo(safe) {
    // Trust the Save 3 times with Omo1, Omo2 and Omo3
    let trust1 = await addTrustLine(omo1.safeOwner, omo1.safe, safe, 1);
    let trust2 = await addTrustLine(omo2.safeOwner, omo2.safe, safe, 1);
    let trust3 = await addTrustLine(omo3.safeOwner, omo3.safe, safe, 1);
  }

  export async function deploySafe(safeOwner, safe) {
    //  Check if we have enough trust connections
    const trustReturn = await core.trust.isTrusted(safeOwner, safe);
    alert(JSON.stringify(trustReturn));

    if (trustReturn.isTrusted) {
      const safeDeployed = await core.safe.deploy(safeOwner, safe);
      alert("safe deploy success: " + safeDeployed);
      // Deploy Token to Safe
    } else {
      alert("the safe deploy went wrong");
    }
  }

  export async function deployToken(safeOwner, safe) {
    const tokenDeployed = await core.token.deploy(safeOwner, safe);
    alert("token deploy done: " + tokenDeployed);
  }

  export async function sendCircles(fromSafeOwner, fromSafe, toSafe, amount) {
    let toSafeAddress = web3.utils.toChecksumAddress(toSafe.safeAddress);
    let fromSafeAddress = web3.utils.toChecksumAddress(fromSafe.safeAddress);

    const payment = await core.token.transfer(fromSafeOwner, {
      from: fromSafeAddress,
      to: toSafeAddress,
      value: new web3.utils.BN(web3.utils.toWei(amount, "ether"))
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

  const provider = new Web3.providers.WebsocketProvider(
    process.env.ETHEREUM_NODE_WS,
    {
      timeout: 30000,
      reconnect: {
        auto: true,
        delay: 5000,
        maxAttempts: 5,
        onTimeout: false
      },
      clientConfig: {
        keepalive: true,
        keepaliveInterval: 60000
      }
    }
  );

  const web3 = new Web3();
  web3.setProvider(provider);

  // Initialize core
  const core = new CirclesCore(web3, {
    apiServiceEndpoint: process.env.API_SERVICE_EXTERNAL,
    graphNodeEndpoint: process.env.GRAPH_NODE_EXTERNAL,
    hubAddress: process.env.HUB_ADDRESS,
    proxyFactoryAddress: process.env.PROXY_FACTORY_ADDRESS,
    relayServiceEndpoint: process.env.RELAY_SERVICE_EXTERNAL,
    safeMasterAddress: process.env.SAFE_ADDRESS,
    subgraphName: process.env.SUBGRAPH_NAME
  });

  async function createNewPPK() {
    // Create account and save to wallet
    let ppk = web3.eth.accounts.create();
    localStorage.setItem("safeOwner", JSON.stringify(ppk));
    return ppk;
  }

  async function prepareNewSafe(ppk) {
    // Generate a nonce to predict Safe address
    var nonce = new Date().getTime();
    // Prepare Safe deployment and receive a predicted safeAddress
    let safeAddress = await core.safe.prepareDeploy(ppk, { nonce });
    let safe = { safeAddress: safeAddress };
    localStorage.setItem("safe", JSON.stringify(safe));
    return safe;
  }

  async function addTrustLine(
    trustGivingSafeOwner,
    trustGivingSafe,
    trustReceivingSafe,
    trustPercentage
  ) {
    // .. give user the permission to send their Token to you
    const trusted = await core.trust.addConnection(trustGivingSafeOwner, {
      user: trustReceivingSafe.safeAddress,
      canSendTo: trustGivingSafe.safeAddress,
      limitPercentage: trustPercentage
    });
    alert(JSON.stringify(trusted));
  }

  async function requestUBI() {
    // Request my UBI
    const payout = await core.token.requestUBIPayout(safeOwner, safe);
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
