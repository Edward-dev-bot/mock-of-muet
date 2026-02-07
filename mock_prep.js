import * as physics from './physics-ques.js'

let currentQuestion = 0;
let userAnswers=null;
let q=null;
let ques=null;
let day=null;
const qNumber = document.getElementById("q-number");
//list shows
const phy=document.getElementById("phy-list");
document.getElementById("phy").addEventListener("click", () => {
  phy.classList.toggle("show");

});

const math=document.getElementById("maths-list");
document.getElementById("maths").addEventListener("click", () => {
  math.classList.toggle("show");
});

const chem=document.getElementById("chem-list");
document.getElementById("chem").addEventListener("click", () => {
  chem.classList.toggle("show");
});

//question from files
const phylist = document.getElementById("phy-list");
phylist.addEventListener("click", ()=>{
  userAnswers= new Array(physics.day1.length).fill(null);
});
 
//questions days
document.getElementById("1mcqs_items").addEventListener("click",()=>{
  ques=1;
});
document.getElementById("2mcqs_items").addEventListener("click",()=>{
  ques=2;
});
document.getElementById("3mcqs_items").addEventListener("click",()=>{
  ques=3;
});
document.getElementById("4mcqs_items").addEventListener("click",()=>{
  ques=4;
});
document.getElementById("5mcqs_items").addEventListener("click",()=>{
  ques=5;
});
document.getElementById("6mcqs_items").addEventListener("click",()=>{
  ques=6;
});
document.getElementById("7mcqs_items").addEventListener("click",()=>{
  ques=7;
});
document.getElementById("8mcqs_items").addEventListener("click",()=>{
  ques=8;
});
document.getElementById("9mcqs_items").addEventListener("click",()=>{
  ques=9;
});
document.getElementById("10mcqs_items").addEventListener("click",()=>{
  ques=10;
});

const qText = document.getElementById("question-text");
const optionsDiv = document.getElementById("options");

function loadQuestion() {
  
if (ques===1) {q=physics.day1[currentQuestion] }
if (ques===2) {q=physics.day2[currentQuestion]}
if (ques===3) {q=physics.day3[currentQuestion]}
if (ques===4) {q=physics.day4[currentQuestion]}
if (ques===5) {q=physics.day5[currentQuestion]}
if (ques===6) {q=physics.day6[currentQuestion]}
if (ques===7) {q=physics.day7[currentQuestion]}
if (ques===8) {q=physics.day8[currentQuestion]}
if (ques===9) {q=physics.day9[currentQuestion]}
if (ques===10) {q=physics.day10[currentQuestion]}
  
  qNumber.textContent = `Question ${currentQuestion + 1}`;
  qText.textContent = q.question;

  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    const label = document.createElement("label");

    label.innerHTML = `<input type="radio" name="option" value="${index}">${opt}`;

    const input = label.querySelector("input");

    // restore previous answer
    if (userAnswers[currentQuestion] === index) {
      input.checked = true;
    }

    // save answer when clicked
    input.addEventListener("change", () => {
      userAnswers[currentQuestion] = index;
    });

    optionsDiv.appendChild(label);
    optionsDiv.appendChild(document.createElement("br"));
  });
}


const next=document.getElementById("next")
const start=document.getElementById("start")
const finish=document.getElementById("finish")
next.addEventListener("click", () => {
  if (currentQuestion < 100 - 1) {
    currentQuestion++;
    console.log(currentQuestion);
    loadQuestion();
  } else {
    start.style.display="none";
    finish.style.display="flex";
  }
});
const report=document.getElementById("resul");
report.addEventListener("click",() => {
  finishTest();
});

const show = document.getElementById("por");

let timeLeft = 60 * 60; // 60 minutes in seconds
const timerEl = document.getElementById("timer");
timerEl.addEventListener("click",()=>{
  startTimer();
  show.style.display="flex";
  loadQuestion();
})

function startTimer(){
  const interval = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    timerEl.textContent =`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(interval);
      finishTest();
    }
  }, 1000);
  
}

function calculateScore() {
  let score = 0;

  day.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });

  return score;
}
let resultData = null;
function finishTest() {
  const score = calculateScore();

  resultData = {
    score: score,
    total: 100,
    answers: userAnswers
  };

const scoreEl = document.getElementById("scoree");
const accEl = document.getElementById("accuracy");

scoreEl.textContent = `Score: ${resultData.score} / ${resultData.total}`;

const accuracy = ((resultData.score / resultData.total) * 100).toFixed(2);

accEl.textContent = `Accuracy: ${accuracy}%`;
  
}




