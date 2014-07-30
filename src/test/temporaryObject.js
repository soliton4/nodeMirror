var o = {
  a: 1
};

var x = ++(++(o.a));

console.log(x);
return;

var f = function(){
  return o;
};

++f().a;

var x = 1;

//(function(){}) = 1;
x = function(){}.z

//++x += 2;
console.log(x);


console.log(o.a);