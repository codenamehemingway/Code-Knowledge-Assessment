// Text Elements
var timerEl = document.getElementById("timer-text");
var scoreEl = document.getElementById("score-text");
var messageEl = document.getElementById("answer-message");
var finalScoreEl = document.querySelector(".final-score-text");
var userName = document.getElementById("name-input");
var finalScore = document.getElementById("final-score-text");

// Button Elements
var startBtn = document.getElementById("start-btn");
var restartBtn = document.getElementById("restart-btn");
var highScoreBtnEl = document.querySelector(".high-score-btn");
var viewScoresBtn = document.getElementById("view-scores-btn");
var saveScoreBtnEl = document.getElementById("save-score-btn");
var clearScoresBtn = document.getElementById("clear-scores");
var choiceEl = document.getElementById("choice-buttons");

// Container Elements
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var headerEl = document.getElementById("header");
var saveScoreEl = document.getElementById("save-score-container");

//  High score variables
var highScoresList = document.getElementById("highScoreList");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class="high-score">${score.name}-${score.score}</li>`;
  })
  .join(" ");

// Javascript variables
// Questions courtesy of w3schools javascript quiz
var secondsLeft;
var questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: [
      { choice: "<js>", correct: false },
      { choice: "<javascript>", correct: false },
      { choice: "<script>", correct: true },
      { choice: "<scripted>", correct: false },
    ],
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choices: [
      { choice: "alertBox('Hello World');", correct: false },
      { choice: "msgBox('Hello World');", correct: false },
      { choice: "msg('Hello World');", correct: false },
      { choice: "alert('Hello World');", correct: true },
    ],
  },
  {
    question: "How do you create a function in JavaScript?",
    choices: [
      { choice: "function myFunction()", correct: true },
      { choice: "function = myFunction()", correct: false },
      { choice: "function => (myFunction)", correct: false },
      { choice: "function :: myFunction()", correct: false },
    ],
  },
  {
    question: "How do you call a function named 'myFunction'?",
    choices: [
      { choice: "call myFunction()", correct: false },
      { choice: "myFunction()", correct: true },
      { choice: "call function myFunction()", correct: false },
      { choice: "function => function()", correct: false },
    ],
  },
  {
    question: "How to write an IF statement in JavaScript?",
    choices: [
      { choice: "if i = 5 then", correct: false },
      { choice: "if (i == 5)", correct: true },
      { choice: "if i = 5", correct: false },
      { choice: "if i == 5 then", correct: false },
    ],
  },
  {
    question: "How does a FOR loop start?",
    choices: [
      { choice: "for i = 1 to 5", correct: false },
      { choice: "for (i = 0; i < = 5)", correct: false },
      { choice: "for (i <= 5; i++)", correct: false },
      { choice: "for (i = 0; i <= 5; i++)", correct: true },
    ],
  },
  {
    question: "How can you add a comment in a JavaScript?",
    choices: [
      { choice: "'This is a comment'", correct: false },
      { choice: "<!-- This is a comment -->", correct: false },
      { choice: "<!== This is a comment ==>", correct: false },
      { choice: "//This is a comment", correct: true },
    ],
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    choices: [
      { choice: "var colors = 'red','green','blue'", correct: false },
      {
        choice: " var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
        correct: false,
      },
      {
        choice: " var colors = (1:'red', 2:'green', 3:'blue')",
        correct: false,
      },
      { choice: "var colors = ['red', 'green', 'blue']", correct: true },
    ],
  },
];
var points = 0;
var maximumQuestions = questions.length;
var currentQuestionIndex;

// Event Listeners

// Starts game
startBtn.addEventListener("click", startGame);

// Opens scoreboard
viewScoresBtn.addEventListener("click", viewScores);

// Clears scoreboard
clearScoresBtn.addEventListener("click", function () {
  localStorage.clear();
});

// Stores username value
userName.addEventListener("keyup", function () {
  saveScoreBtnEl.disabled = !userName.value;
});

// Reloads game when button is clicked
restartBtn.addEventListener("click", function () {
  location.reload();
});

// Functions

// Starts the game
function startGame() {
  points = 0;
  secondsLeft = 75;
  currentQuestionIndex = 0;

  startBtn.classList.add("hide");
  viewScoresBtn.classList.add("hide");

  questionContainerEl.classList.remove("hide");
  headerEl.classList.remove("hide");
  saveScoreEl.classList.add("hide");

  getNextQuestion();
  setCountDown();
  // debugger;
}

// Updates the display of the game
function updateDisplay() {
  scoreEl.innerText = points;
  timerEl.innerText = secondsLeft;
}

// Sets countdown timer
function setCountDown() {
  var countDown = setInterval(() => {
    if (secondsLeft > 0) {
      secondsLeft--;
    } else if (secondsLeft <= 0) {
      timerEl.style.color = "red";
      gameFinished();
    }

    updateDisplay();
  }, 1000);
}

// Gets the next question
function getNextQuestion() {
  resetDisplay();
  showQuestion(questions[currentQuestionIndex]);
}

// Show the next question on screen
function showQuestion(x) {
  questionEl.innerText = x.question;
  x.choices.forEach((Element) => {
    var button = document.createElement("button");
    button.innerText = Element.choice;
    button.classList.add("choice-btn");

    if (Element.correct) {
      button.dataset.correct = Element.correct;
    }

    questionEl.appendChild(button);
    button.addEventListener("click", selectAnswer);
  });
}

// Removes previous question from screen
function resetDisplay() {
  while (choiceEl.firstChild) {
    choiceEl.removeChild(choiceEl.firstChild);
  }
  messageEl.textContent = " ";
}

// When the user selects a button...
function selectAnswer(e) {
  var selectedButton = e.target;
  var correct = selectedButton.dataset.correct;

  var correctMessage = "correct";
  var incorrectMessage = "incorrect";

  setClass(selectedButton, correct);

  Array.from(choiceEl.children).forEach((button) => {
    setClass(button, button.dataset.correct);
  });

  // If there are more questions remaining, getNextQuestion
  if (maximumQuestions > currentQuestionIndex + 1) {
    currentQuestionIndex++;
    setTimeout(getNextQuestion, 50);
  } else if (currentQuestionIndex < maximumQuestions) {
    setTimeout(gameFinished, 50);
  }

  // changing points
  if (selectedButton.dataset.correct) {
    points = points + 10;
    messageEl.textContent = correctMessage;
    updateDisplay();
  } else {
    points = points - 10;
    secondsLeft = secondsLeft - 10;
    messageEl.textContent = incorrectMessage;
    updateDisplay();
  }
}

// If correct, add correct class. Else, add incorrect class.
function setClass(element, correct) {
  clearClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("incorrect");
  }
}

// Remove classes
function clearClass(element) {
  element.classList.remove("correct");
  element.classList.remove("incorrect");
}

// If game is finished...
function gameFinished() {
  questionContainerEl.classList.add("hide");
  headerEl.classList.add("hide");
  restartBtn.classList.remove("hide");
  saveScoreEl.classList.remove("hide");

  finalScore.innerText = "YOUR FINAL SCORE IS " + points;
  localStorage.setItem("mostRecentScore", points);

  saveScoreBtnEl.addEventListener("click", saveScore);
}

// When user clicks save score
function saveScore(event) {
  event.preventDefault();

  var mostRecentScore = localStorage.getItem("mostRecentScore");
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  var score = {
    score: mostRecentScore,
    name: userName.value,
  };

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));

  location.reload();
}

// Displays Scoreboard
function viewScores() {
  var scoreContainer = document.getElementById("high-score-container");
  scoreContainer.classList.remove("hide");
  highScoreBtnEl.classList.add("hide");
  startBtn.classList.add("hide");
}
