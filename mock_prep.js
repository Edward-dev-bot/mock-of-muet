import * as physics from './physics-ques.js'
let question=null;
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
  question=physics;
  userAnswers= new Array(question.day1.length).fill(null);
})
 
//questions days
document.getElementById("1mcqs_items").addEventListener("click",()=>{
  
  ques=1;
})
document.getElementById("2mcqs_items").addEventListener("click",()=>{
  ques=2;
})

const qText = document.getElementById("question-text");
const optionsDiv = document.getElementById("options");

function loadQuestion() {
  
 if(ques===1){q=question.day1[currentQuestion];day=question.day1; }
if (ques===2) {q=question.day2[currentQuestion]}

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
  if (currentQuestion < 10 - 1) {
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


let timeLeft = 60 * 60; // 60 minutes in seconds
const timerEl = document.getElementById("timer");
timerEl.addEventListener("click",()=>{
  startTimer();
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
  loadQuestion();
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




