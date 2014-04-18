
(function(){
  "use strict";
  
  /*var e = false;
  if (e){
    var j = 0;
  }
  
  var i = function(){};
  var a = [];
  a[j] = 3;
  console.log(a);
  return;*/
  
  var g = function(a, v){
    a[10] = v;
  };
  var c = function(){
    //return 10;
  };
  
  var i1 = 0;
  var i2 = 10;
  var y = [[[undefined], undefined, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]];
  
  function x(){
    var start = new Date().getTime();
    

    for (var i = 0; i < 100000000; ++i) {
    // do something
      //g(y, 3);
      //c();
      y[0][i2] = 3;
      //y[0][0];
    }

    var end = new Date().getTime();
    var time = end - start;
    console.log(time);
  };
  x();
  x();
  x();
  x();
  x();
  x();
  x();
  x();
  
})();
