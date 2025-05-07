var choices = ["rock","paper","scissors"];

var buttons = document.querySelectorAll("button");

const pScore = document.querySelectorAll("p")[0];
const cScore = document.querySelectorAll("p")[1];
const resultMessage = document.getElementById("resultMessage");

let pcount = 0;
let ccount = 0;

buttons.forEach((btn) => {
  btn.addEventListener("click",function(){
const computerChoice = choices[Math.floor(Math.random()*choices.length)];
const playerChoice = this.dataset.choice;

console.log("player",playerChoice);
console.log("computer" ,computerChoice);

verify(playerChoice, computerChoice);

pScore.textContent = pcount;
cScore.textContent = ccount;

  });
});

 
function verify(player,comp){

  if(player === comp){
    resultMessage.innerText = "It's a tie!";
  
  }
  else if(
    (player === "rock" && comp === "scissors") ||
    (player === "paper" && comp === "rock") ||
    (player === "scissors" && comp === "paper")
  ) {
    resultMessage.innerText = "You win!";

    pcount++;
  } else {
    resultMessage.innerText = "Computer wins!";
    ccount++;
  }
}






// Reset functionality
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", function () {
  pcount = 0;
  ccount = 0;
  pScore.textContent = 0;
  cScore.textContent = 0;
  resultMessage.innerText = "";
});
