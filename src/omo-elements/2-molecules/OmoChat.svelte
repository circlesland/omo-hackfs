<script>
  var questionNum = 0; // keep count of question, used for IF condition.
  var question = "Welcome, what's your name?"; // first question
  var text = "";

  var output = question; // ouput first question

  function bot() {
    var input = text;

    if (questionNum == 0) {
      output = `"Hello ${input}, I am Mama Omo"`; // output response
      text = ""; // clear text box
      question = "What is your dream for the next year?"; // load next question
      setTimeout(timedQuestion, 2000); // output next question after 2sec delay
    } else if (questionNum == 1) {
      output = "Nice, I like it";
      text = ""; // clear text box
      question = "Why do you want to achieve this dream?";
      setTimeout(timedQuestion, 3000);
    }
  }

  function timedQuestion() {
    output = question;
  }

  var next = function() {
    bot(); // run bot function when enter key pressed
    questionNum++; // increase questionNum count by 1
  };
</script>

<style>
  #output,
  #container {
    display: flex;
    justify-content: center;
    @apply bg-secondary;
  }

  input {
    background-color: #eee;
    border: none;
    font-family: sans-serif;
    color: #000;
    padding: 8px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 24px;
  }
</style>

<h1 id="output" class="pt-48 text-white text-3xl text-center">{output}</h1>
<div id="container">

  <form onsubmit="event.preventDefault();" class="text-center">
    <input bind:value={text} type="text" class="rounded" />
    <br />
    <button
      on:click={next}
      type="submit"
      class="bg-primary rounded text-white font-bold text-xl w-32
      hover:bg-tertiary p-2 mt-2">
      send
    </button>
  </form>
</div>
