<script>
  import {
    getSafeOwnerFromLocalStorage,
    getSafeFromLocalStorage,
    sendCircles
  } from "./../../omo-actions/Circles";

  export let data = {
    safeAddress: ""
  };

  Array.prototype.sum = function(prop) {
    var total = 0;
    for (var i = 0, _len = this.length; i < _len; i++) {
      total += parseInt(this[i][prop]);
    }
    return total;
  };

  function sumCircles(query) {
    var b = query.data.safes[0].balances;
    return b.sum("amount") / 1000000000000000000;
  }
</script>

<section class="flex justify-center flex-col text-center bg-primary">
  <div class="">
    <h1 class="text-blue-100 text-6xl">
      Ø{sumCircles(data.safeData).toFixed(2)}
    </h1>
    <span class="text-center text-blue-400">
      {data.safeData.data.safes[0].id}
    </span>
  </div>
</section>
