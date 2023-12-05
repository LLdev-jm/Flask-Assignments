
$(document).ready(function () {
  const form = $("#game_form");
  $(form).submit(async function (e) {
    e.preventDefault();

    let userInput = $("#user_input").val();
    console.log("User Input:", userInput);

    
    console.log("Before Axios Request");
    const response = await axios.post("/check-word", { word: userInput });
    console.log("After Axios Request", response);

    if (response && response.data) {
      console.log("Successful response from server:", response.data.result);

      scoreConversion(response.data, userInput);
      await updateScoreBoard(totalScore);
    } else {
      console.error("Invalid response format:", response);
    }
    $("#user_input").val("");
  });
});

let totalScore = 0;
const highScore = document.getElementById("high_score");
const scoreBoard = document.getElementById("score_board");


async function updateScoreBoard(score) {
  console.log("Updating Score Board:", score);
  scoreBoard.textContent = `Score: ${score}`;

  const res = await axios.post("/post-score", { score: score });
  console.log("server response", res.data);
  highScore.textContent = `High Score: ${res.data && res.data.high_score}`;
}

let goodRes = document.getElementById("result_good");
let badRes = document.getElementById("result_bad");

function scoreConversion(data, userInput) {
  console.log("Data:", data);
  console.log("User Input:", userInput);

  if (data.result === "ok") {
    goodRes.innerText = "Greaaaat !";
    goodRes.style.backgroundColor = "rgb(57, 188, 72)";
    totalScore += userInput.length;
    updateScoreBoard(totalScore);
  } else if (data.result === "not-on-board") {
    badRes.innerHTML =
      "Sorry, the word is not on the board. Please try again.";
    badRes.style.backgroundColor = "rgb(233, 73, 73)";
  } else {
    badRes.innerHTML = "Invalid word. Please enter a valid word.";
    badRes.style.backgroundColor = "rgb(233, 73, 73)";
  }

  setTimeout(function () {
    goodRes.style.backgroundColor = "transparent";
    goodRes.innerHTML = "";
    badRes.style.backgroundColor = "transparent";
    badRes.innerHTML = "";
  }, 1000);
}


gameForm = document.getElementById("game_form")
startBtn = document.getElementById("start_button");
checkBtn = document.getElementById("check_button");
timerDisplay = document.getElementById("timer_p");
userInput = document.getElementById('user_input')

startBtn.addEventListener("click", function(){
  userInput.disabled = false;
  checkBtn.disabled = false;
  checkBtn.style.display = "inline"
  gameForm.style.display = "inline";
  startGame()
  userInput.focus();
});

let count = 60;
let timer;
userInput.disabled = true;
checkBtn.disabled = true;
gameForm.style.display = "none";
// checkBtn.style.display = "none";

function startTimer() {
  timer = setInterval(function () {
    count--;
    timerDisplay.textContent = count + '\n' + ' remaining';
    if (count <= 0) {
      endGame();
    }
  }, 1000);
}

function startGame() {
  startBtn.style.display = "none";
  startTimer();
}

function endGame() {
  userInput.disabled = true;
  checkBtn.disabled = true;
  gameForm.style.display = "none";
  // checkBtn.style.display = "none";


  clearInterval(timer);
  timerDisplay.textContent = "Times Up! ";

  // restartBtn.style.display= 'inline';
  // const currentScore = totalScore;
  // updateHighestScore(currentScore);
}