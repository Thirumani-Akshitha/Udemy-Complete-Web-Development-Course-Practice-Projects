var randomNumber1= Math.floor(Math.random()*6)+1;
console.log(randomNumber1);

var randomImgNumber1 = "dice"+randomNumber1+".png";
var randomLoadImg1 = "images/"+randomImgNumber1;

var randomNumber2= Math.floor(Math.random()*6)+1;
console.log(randomNumber2);

var randomImgNumber2 = "dice"+randomNumber2+".png";
var randomLoadImg2 = "images/"+randomImgNumber2;  

var img1 = document.querySelectorAll("img")[0];
img1.setAttribute("src", randomLoadImg1);

var img2 = document.querySelectorAll("img")[1];
img2.setAttribute("src", randomLoadImg2);

var changeText = document.firstElementChild.lastElementChild.firstElementChild.firstElementChild;

if(randomImgNumber1 < randomImgNumber2){
    changeText.innerHTML="Player 2 Wins 👑";
}
else if(randomImgNumber1 > randomImgNumber2){
    changeText.innerHTML="Player 1 Wins 👑";
}
else{
    changeText.innerHTML="Draw 🤝";
}
