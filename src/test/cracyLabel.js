var i = 0; 
    for (i = 0; i < 10; i++)
    { 
      console.log("outer loop " + i);
       var k = 5;
       for (var j = 0; j < 10; j++){ // inner loop
         continue outer;
         console.log("inner loop " + j);
          if (j > 5) {
               break; // inner 
          }else{
               continue outer;  // it will go to next iteration of outer loop
          };
       }
    }

outer:
console.log("xxx");