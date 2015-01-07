function dostuff(stdlib, foreign, buffer) {
  "use asm";
  var x = 1;
  x += 2;
  var b = 2;
  x += b;
};

var callit = function(){
  
  var heap = new ArrayBuffer(0x10000);
  
  dostuff(global, null, heap);
  
};

callit();

