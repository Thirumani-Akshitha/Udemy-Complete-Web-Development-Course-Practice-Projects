window.onload = function() {
 let input = prompt("Enter your Date of Birth (DD MM YYYY):");
 let [day, month, year] = input.split(" ");

 let now = new Date();
 let birthday = new Date(`${year}-${month}-${day}T00:00:00`);

 if (
   birthday.getMonth() < now.getMonth() ||
   (birthday.getMonth() === now.getMonth() && birthday.getDate() < now.getDate())
 ) {
   birthday.setFullYear(now.getFullYear() + 1);
 } else {
   birthday.setFullYear(now.getFullYear());
 }

 function updateCountdown() {
   let current = new Date();
   let totalSeconds = Math.floor((birthday - current) / 1000);

   const days = Math.floor(totalSeconds / 86400);
   const hours = Math.floor((totalSeconds % 86400) / 3600);
   const seconds = Math.floor(totalSeconds % 60);

   document.getElementById("days").value = days;
   document.getElementById("hours").value = hours;
   document.getElementById("seconds").value = seconds;
 }

 updateCountdown();
 setInterval(updateCountdown, 1000);
};