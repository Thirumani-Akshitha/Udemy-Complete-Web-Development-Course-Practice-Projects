function whosPaying(names) {
           
       var namesList = ["Angela", "Ben", "Jenny", "Michael", "Chloe"];
       var length = namesList.length;
       var rand = Math.floor(Math.random()*length);
    
       return namesList[rand] + " is going to buy lunch today!";
    
    }

whosPaying();