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
