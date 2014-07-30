


console.log(JSON.stringify(undefined));
console.log(JSON.stringify(null));
console.log(JSON.stringify(void 0));
console.log(JSON.stringify({}));
console.log(JSON.stringify([]));
console.log(JSON.stringify(""));
console.log(JSON.stringify(new Date()));

console.log(typeof new Date());


return;


var data = {
  a: function(){ var x = 1; },
  b: 1,
  c: undefined
}

data.d = data;

console.log(JSON.stringify(data));
return


console.log(new String("xxx"));
return;

var a = function(b){
  console.log(b);
  var b = 1;
  console.log(b);
};

a(2);