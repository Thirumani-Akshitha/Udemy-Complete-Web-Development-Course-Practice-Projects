var display = document.getElementById("display");
var buttons = document.querySelectorAll("button");

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    var text = this.getAttribute("data-value");
    clicked(text);
  });
}

document.addEventListener("keydown",function(event){
    clicked(event.key);
});

function clicked(operation) {

    if(operation === "Enter"){
        operation = "=";
    }
    else if (operation === "Backspace") {
        operation = "Back";
      }

  switch (operation) {
    case "AC":
      display.value = "";
      break;

    case "Back":
      display.value = display.value.slice(0, -1);
      break;

    case "=":
      try {
        display.value = eval(display.value);
      } catch {
        display.value = "Error";
      }
      break;

    default:
      display.value += operation;
      break;
  }
}
