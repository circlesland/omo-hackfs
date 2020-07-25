<script>
  import CirclesCore from "@circles/core";
  import Web3 from "web3";
  

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

  const omo1 = {
    account: {
      privateKey: process.env.OMO1_ACCOUNT_PRIVATEKEY,
      address: process.env.OMO1_ACCOUNT_ADDRESS
    },
    safe: { safeAddress: process.env.OMO1_SAFE_SAFEADDRESS }
  };
  const omo2 = {
    account: {
      privateKey: process.env.OMO2_ACCOUNT_PRIVATEKEY,
      address: process.env.OMO2_ACCOUNT_ADDRESS
    },
    safe: { safeAddress: process.env.OMO2_SAFE_SAFEADDRESS }
  };
  const omo3 = {
    account: {
      privateKey: process.env.OMO3_ACCOUNT_PRIVATEKEY,
      address: process.env.OMO3_ACCOUNT_ADDRESS
    },
    safe: { safeAddress: process.env.OMO3_SAFE_SAFEADDRESS }
  };

  let current = {};
  let account = {};
  let safeAddress;
  let nonce;

  let myActivities = [];

  current = omo1;

  $: from = "";
  $: to = "";
  $: amount = 0;

  let recipient = {};

  const createAccount = async function() {
    // Create account
    account = web3.eth.accounts.create();
    alert("new account created: " + JSON.stringify(account));

    // Generate a nonce to predict Safe address
    nonce = new Date().getTime();
    alert("nonce created: " + JSON.stringify(nonce));

    // Prepare Safe deployment and receive a predicted safeAddress
    safeAddress = await core.safe.prepareDeploy(account, { nonce });
    alert("your safeAddress created: " + JSON.stringify(safeAddress));
  };

  const deploySafe = async function() {
    //  Check if we have enough trust connections
    const { isTrusted } = await core.trust.isTrusted(
      current.account,
      current.safe
    );
    alert("n1ce, you are trusted: " + isTrusted + " <3");

    if (isTrusted) {
      const safeDeployed = await core.safe.deploy(
        current.account,
        current.safe
      );
      alert("safe deploy success: " + safeDeployed);
    }
  };

  const deployToken = async function() {
    const tokenDeployed = await core.token.deploy(
      current.account,
      current.safe
    );
    alert("token deploy done: " + tokenDeployed);
  };

  const getBalance = async function() {
    const balance = await core.token.getBalance(current.account, current.safe);
    alert("balance : " + balance);
  };

  const requestUBI = async function() {
    // Request my UBI
    const payout = await core.token.requestUBIPayout(
      current.account,
      current.safe
    );
    alert(payout);
  };

  const payMe = async function(from, to, amount) {
    const payment = await core.token.transfer(from.account, {
      from: from.safe.safeAddress,
      to: to.safe.safeAddress,
      value: new web3.utils.BN(web3.utils.toWei(amount, "ether"))
    });
    alert(payment);
  };

  const omoTrustYou = async function() {
    // .. give user the permission to send their Token to you
    const trusted = await core.trust.addConnection(omo3.account, {
      user: omo2.safe.safeAddress,
      canSendTo: omo3.safe.safeAddress,
      limitPercentage: 100
    });
    alert(JSON.stringify(trusted));
  };
</script>

<section class="mb-1 p-20">
  OMO1: {omo1.safe.safeAddress}
  <br />
  OMO2: {omo2.safe.safeAddress}
  <br />
  OMO3: {omo3.safe.safeAddress}
  <div
    class="text-center mb-1 p-2 bg-tertiary w-64 text-white hover:bg-secondary"
    on:click={createAccount}>
    create new account
  </div>

  <div
    class="text-center mb-1 p-2 bg-tertiary w-64 text-white hover:bg-secondary"
    on:click={omoTrustYou}>
    trust
  </div>
  <div
    class="text-center mb-1 p-2 bg-tertiary w-64 text-white hover:bg-secondary"
    on:click={payMe}>
    pay Ø 5
  </div>
  privateKey: {account.privateKey}
  <br />
  address: {account.address}
  <br />
  nonce: {nonce}
  <br />
  safeAddress: {safeAddress}
  <br />
  <div
    class="text-center mb-1 p-2 bg-tertiary w-64 text-white hover:bg-secondary"
    on:click={deploySafe}>
    deploy Safe
  </div>
  <div
    class="text-center mb-1 p-2 bg-tertiary w-64 text-white hover:bg-secondary"
    on:click={deployToken}>
    deploy Token
  </div>
  <div
    class="text-center mb-1 p-2 bg-tertiary w-64 text-white hover:bg-secondary"
    on:click={getBalance}>
    get balance
  </div>
  <div
    class="text-center mb-1 p-2 bg-tertiary w-64 text-white hover:bg-secondary"
    on:click={requestUBI}>
    request UBI
  </div>
  <div class="flex">
    <input
      class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
      border-gray-200 bg-white"
      placeholder="sender"
      bind:value={from} />
    <input
      class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
      border-gray-200 bg-white"
      placeholder="recipient"
      bind:value={to} />
    <input
      class="w-full p-3 border-t mr-0 border-b border-l text-gray-800
      border-gray-200 bg-white"
      placeholder="amount to send"
      bind:value={amount} />
    <button
      on:click={OmoPay}
      class="px-6 bg-green-400 text-gray-800 font-bold p-3 uppercase">
      Pay Now
    </button>
  </div>
</section>
