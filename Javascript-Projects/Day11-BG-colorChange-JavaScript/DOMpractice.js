var button = document.getElementById("btn");
var textColor = document.getElementById("textColor");

var colors = ["red", "blue", "green", "purple", "yellow", "pink", "orange", "teal"];

button.addEventListener("click", function(){
    randNum= Math.floor(Math.random()*colors.length);
    randColor = colors[randNum];
    document.body.style.backgroundColor = randColor;
    textColor.textContent=randColor;
} 
)