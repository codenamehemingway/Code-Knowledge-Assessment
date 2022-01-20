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

// Starts game
startBtn.addEventListener("click", startGame);
