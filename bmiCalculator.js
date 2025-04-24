function bmiCalculator(weight, height) {
    var bmi = weight / (height * height);
    if (bmi < 18.5) {
        return "Your BMI is " + bmi.toFixed(1) + ", so you are underweight.";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return "Your BMI is " + bmi.toFixed(1) + ", so you have a normal weight.";
    } else {
        return "Your BMI is " + bmi.toFixed(1) + ", so you are overweight.";
    }
}

bmiCalculator(54,1.75);