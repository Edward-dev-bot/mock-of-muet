import * as physics from './physics-ques.js'
import * as maths from './math-ques.js'

let currentQuestion = 0;
let userAnswers=null;
let q=null;
let questions=null;
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

const phylist = document.getElementById("phy-list");
phylist.addEventListener("click", ()=>{  
  userAnswers= new Array(physics.day1.length).fill(null);
});
const mathlist = document.getElementById("maths-list");
mathlist.addEventListener("click", ()=>{
  userAnswers= new Array(maths.day1.length).fill(null);
});

document.getElementById("pmcqs1").addEventListener("click",()=>{
    questions=physics.day1; })
document.getElementById("pmcqs2").addEventListener("click",()=>{
    questions=physics.day2; })
document.getElementById("pmcqs3").addEventListener("click",()=>{
    questions=physics.day3; })
document.getElementById("pmcqs4").addEventListener("click",()=>{
    questions=physics.day4; })
document.getElementById("pmcqs5").addEventListener("click",()=>{
    questions=physics.day5; })
document.getElementById("pmcqs6").addEventListener("click",()=>{
    questions=physics.day6; })
document.getElementById("pmcqs7").addEventListener("click",()=>{
    questions=physics.day7; })
document.getElementById("pmcqs8").addEventListener("click",()=>{
    questions=physics.day8; })
document.getElementById("pmcqs9").addEventListener("click",()=>{
    questions=physics.day9; })
document.getElementById("pmcqs10").addEventListener("click",()=>{
    questions=physics.day10; })
document.getElementById("cmcqs1").addEventListener("click",()=>{
    questions=chemistry.day1; })
document.getElementById("cmcqs2").addEventListener("click",()=>{
    questions=chemistry.day2; })
document.getElementById("cmcqs3").addEventListener("click",()=>{
    questions=chemistry.day3; })
document.getElementById("cmcqs4").addEventListener("click",()=>{
    questions=chemistry.day4; })
document.getElementById("cmcqs5").addEventListener("click",()=>{
    questions=chemistry.day5; })
document.getElementById("pmcqs6").addEventListener("click",()=>{
    questions=chemistry.day6; })
document.getElementById("pmcqs7").addEventListener("click",()=>{
    questions=chemistry.day7; })
document.getElementById("pmcqs8").addEventListener("click",()=>{
    questions=chemistry.day8; })
document.getElementById("pmcqs9").addEventListener("click",()=>{
    questions=chemistry.day9; })
document.getElementById("pmcqs10").addEventListener("click",()=>{
    questions=chemistry.day10; })
    document.getElementById("mmcqs1").addEventListener("click",()=>{
    questions=maths.day1; })
document.getElementById("mmcqs2").addEventListener("click",()=>{
    questions=maths.day2; })
document.getElementById("mmcqs3").addEventListener("click",()=>{
    questions=maths.day3; })
document.getElementById("mmcqs4").addEventListener("click",()=>{
    questions=maths.day4; })
document.getElementById("mmcqs5").addEventListener("click",()=>{
    questions=maths.day5; })
document.getElementById("mmcqs6").addEventListener("click",()=>{
    questions=maths.day6; })
document.getElementById("mmcqs7").addEventListener("click",()=>{
    questions=maths.day7; })
document.getElementById("mmcqs8").addEventListener("click",()=>{
    questions=maths.day8; })
document.getElementById("mmcqs9").addEventListener("click",()=>{
    questions=maths.day9; })
document.getElementById("mmcqs10").addEventListener("click",()=>{
    questions=maths.day10; })


const qText = document.getElementById("question-text");
const optionsDiv = document.getElementById("options");

function loadQuestion() {
  
  q=questions[currentQuestion];

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
  if (currentQuestion < 1 - 1) {
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

  questions.forEach((q, index) => {
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
