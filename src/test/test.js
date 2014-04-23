var a = [];

a.push("x");
a.push("y");
a.push(function(){
  return this[0];
});

console.log(a[2]());
