function A(){
  return 1;
};
/*A.prototype = function(){
  return 2;
};*/
A.prototype = {
  y: 2
};

var x = new A();

console.log(x.y);
//console.log(x());
