<script>

    import {SubmitFlowStep} from "../../events/omo/shell/submitFlowStep";

    export let data = {
        processNode:null
    }

    function submit() {
        const submitEvent = new SubmitFlowStep(data.processNode.id);
        window.o.publishShellEventAsync(submitEvent);
    }
</script>
<div class="bg-white rounded-lg shadow-xl w-full">
  <div class="h-64 bg-blue-500 flex justify-center items-center rounded-t-lg">
    <div
      class="h-24 w-24 bg-white rounded-full flex justify-center items-center">
      <i class="material-icons text-blue-500">done</i>
    </div>
  </div>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
    class="fill-current">
    <path
      fill="#4299E1"
      fill-opacity="1"
      d="M0,64L80,85.3C160,107,320,149,480,154.7C640,160,800,128,960,112C1120,96,1280,
      96,1360,96L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,
      640,0,480,0C320,0,160,0,80,0L0,0Z" />
  </svg>
  <div class="p-8 -mt-12">
    <p class="font-bold text-center text-4xl text-gray-700">Well done</p>
    <p class="text-gray-600 text-center mt-5">You trusted successfully</p>
    <div class="flex justify-center mt-6">
      <button
        on:click={ () => submit()}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
        rounded">
        Run & Close
      </button>
    </div>
  </div>
</div>
